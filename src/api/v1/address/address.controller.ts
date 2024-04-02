import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response, query } from "express";

import pool from "@/database/pool";
import { CreateUserAddressSchema, GetUserAddressSchema, UpdateUserAddressSchema, convertToGetAddressResponse } from "./address.schema";
import { buildResponse } from "@/utils/response";
import { createUserAddress, getAddressById, updateUserAddressById } from "../address/address.queries";

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
        buildResponse(convertToGetAddressResponse(newAddress[0]), true, "Address created successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async getUserAddress(req: Request<ParamsDictionary, any, GetUserAddressSchema>, res: Response) {
    try {
      const address = await getAddressById.run({ id: req.params.address_id, user_id: req.body.payload.sub }, pool);

      if (!address || address.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Address not found")
        );
      }

      return res.status(200).json(
        buildResponse(convertToGetAddressResponse(address[0]), true, "Address fetched successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async updateUserAddress(req: Request<ParamsDictionary, any, UpdateUserAddressSchema>, res: Response) {
    try {
      const newAddress = await updateUserAddressById.run({
        id: req.params.address_id, 
        street: req.body.street,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        user_id: req.body.payload.sub,
      }, pool);

      if (!newAddress || newAddress.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Address not found")
        );
      }

      return res.status(200).json(
        buildResponse(convertToGetAddressResponse(newAddress[0]), true, "Address updated successfully")
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