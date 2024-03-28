import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { UserLoginSchema, UserRegisterSchema } from "./user.schema";
import { buildResponse } from "@/utils/response";
import { checkUserByEmail, createUser, getUserByEmailWithSecret } from "./user.queries";
import { hashPassword, verifyPassword } from "@/services/crypto.service";
import { issueAuthToken } from "@/services/jwt.service";

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
        buildResponse(newUser[0], true, "User registered successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async loginUser(req: Request<ParamsDictionary, any, UserLoginSchema>, res: Response) {
    try {
      const requestedUser = await getUserByEmailWithSecret.run({ email: req.body.email }, pool);
      
      if (!requestedUser || requestedUser.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Email or password does not match")
        );
      }

      const hashedPassword = requestedUser[0].user_secret;
      const verified = await verifyPassword(hashedPassword, req.body.password);
      if (!verified) {
        return res.status(404).json(
          buildResponse(null, false, "Email or password does not match")
        );
      }

      const token = issueAuthToken(requestedUser[0].id);

      return res.status(200).json(
        buildResponse({
          user: {
            email: requestedUser[0].email,
            name: requestedUser[0].display_name,
            birth_date: requestedUser[0].birth_date,
            created_at: requestedUser[0].created_at,
            updated_at: requestedUser[0].updated_at,
          },
          authorization: token,
        }, true, "User successfully logged in")
      )
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}