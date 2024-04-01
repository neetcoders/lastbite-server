import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { StoreRegisterSchema } from "./store.schema";
import { buildResponse } from "@/utils/response";
import { createStoreAddress } from "../address/address.queries";
import { checkStoreByEmail, createStore } from "./store.queries";
import { hashPassword } from "@/services/crypto.service";

export default class UserController {
  static async registerStore(req: Request<ParamsDictionary, any, StoreRegisterSchema>, res: Response) {
    try {
      const checkStore = await checkStoreByEmail.run({ email: req.body.email }, pool);
      if (checkStore[0].exists) {
        return res.status(409).json(
          buildResponse(null, false, "Store already exists")
        );
      }

      pool.query("BEGIN");

      const newAddress = await createStoreAddress.run({
        address: {
          street: req.body.address.street,
          longitude: req.body.address.longitude,
          latitude: req.body.address.latitude,
        }
      }, pool);

      const hashedPassword = await hashPassword(req.body.password);

      const newStore = await createStore.run({
        store: {
          email: req.body.email,
          store_secret: hashedPassword,
          display_name: req.body.name,
          address_id: newAddress[0].id,
        }
      }, pool);

      return res.status(201).json(
        buildResponse({
          email: newStore[0].email,
          display_name: newStore[0].display_name,
          address: {
            street: newAddress[0].street,
            longitude: newAddress[0].longitude,
            latitude: newAddress[0].latitude,
            created_at: newAddress[0].created_at,
            updated_at: newAddress[0].updated_at,
          },
          created_at: newStore[0].created_at,
          updated_at: newStore[0].created_at,
        }, true, "Store registered successfully")
      );
    }
    catch (err) {
      pool.query("ROLLBACK");
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}