import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { CreateUserAddressSchema } from "./address.schema";
import { buildResponse } from "@/utils/response";
import { createUserAddress } from "../address/address.queries";

export default class AddressController {
  static async createUserAddress(req: Request<ParamsDictionary, any, CreateUserAddressSchema>, res: Response) {
    try {
      const newAddress = await createUserAddress.run({
        address: {
          street: req.body.street,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          user_id: req.body.payload.sub,
        }
      }, pool);

      return res.status(201).json(
        buildResponse({
          id: newAddress[0].id,
          street: newAddress[0].street,
          longitude: newAddress[0].longitude,
          latitude: newAddress[0].latitude,
          created_at: newAddress[0].created_at,
          updated_at: newAddress[0].updated_at,
        }, true, "Address created successfully")
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