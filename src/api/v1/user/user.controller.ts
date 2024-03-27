import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { UserRegisterSchema } from "./user.schema";
import { buildResponse } from "@/utils/response";
import { checkUserByEmail, createUser } from "./user.queries";
import { hashPassword } from "@/services/crypto.service";

export default class UserController {
  static async registerUser(req: Request<ParamsDictionary, any, UserRegisterSchema>, res: Response) {
    try {
      const checkUser = await checkUserByEmail.run({ email: req.body.email }, pool);
      if (checkUser[0].exists) {
        return res.status(409).json(
          buildResponse(null, false, "User already exists")
        );
      }

      const hashedPassword = await hashPassword(req.body.password);

      const newUser = await createUser.run({
        user: {
          email: req.body.email,
          user_secret: hashedPassword,
          display_name: req.body.name,
          birth_date: req.body.birth_date,
        }
      }, pool);

      return res.status(201).json(
        buildResponse(newUser[0], true, "User successfully registered")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}