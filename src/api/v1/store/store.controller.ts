import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { StoreLoginSchema, StoreRegisterSchema, convertToGetStoreResponse } from "./store.schema";
import { buildResponse } from "@/utils/response";
import { createStoreAddress } from "../address/address.queries";
import { checkStoreByEmail, createStore, getStoreById, getStoreSecretByEmail } from "./store.queries";
import { hashPassword, verifyPassword } from "@/services/crypto.service";
import { issueAuthToken } from "@/services/jwt.service";

export default class StoreController {
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
        street: req.body.address.street,
        longitude: req.body.address.longitude,
        latitude: req.body.address.latitude,
      }, pool);

      const hashedPassword = await hashPassword(req.body.password);

      const newStore = await createStore.run({
        store: {
          email: req.body.email,
          store_secret: hashedPassword,
          display_name: req.body.display_name,
          address_id: newAddress[0].id,
        }
      }, pool);

      const fullStore = await getStoreById.run({ id: newStore[0].id }, pool);

      pool.query("COMMIT");

      return res.status(201).json(
        buildResponse(convertToGetStoreResponse(fullStore[0]), true, "Store registered successfully")
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


  static async loginStore(req: Request<ParamsDictionary, any, StoreLoginSchema>, res: Response) {
    try {
      const requestedStore = await getStoreSecretByEmail.run({ email: req.body.email }, pool);
      
      if (!requestedStore || requestedStore.length === 0) {
        return res.status(401).json(
          buildResponse(null, false, "Email or password does not match")
        );
      }

      const hashedPassword = requestedStore[0].store_secret;
      const verified = await verifyPassword(hashedPassword, req.body.password);
      if (!verified) {
        return res.status(401).json(
          buildResponse(null, false, "Email or password does not match")
        );
      }

      const fullStore = await getStoreById.run({ id: requestedStore[0].id }, pool);
      const token = issueAuthToken(requestedStore[0].id);

      return res.status(200).json(
        buildResponse({
          store: convertToGetStoreResponse(fullStore[0]),
          authorization: token,
        }, true, "Store successfully logged in")
      )
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async getCurrentStore(req: Request, res: Response) {
    try {
      const currentStore = await getStoreById.run({ id: req.body.payload.sub }, pool);
      if (!currentStore || currentStore.length === 0) {
        return res.status(401).json(
          buildResponse(null, false, "Store is not logged in")
        );
      }

      return res.status(200).json(
        buildResponse(convertToGetStoreResponse(currentStore[0]), true, "Current store fetched successfully"),
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