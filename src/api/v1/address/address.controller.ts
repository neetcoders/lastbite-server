import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { CreateUserAddressSchema, DeleteUserAddressSchema, GetUserAddressSchema, UpdateUserAddressSchema, UserSetActiveAddressSchema as SetUserActiveAddressSchema, convertToGetAddressResponse, convertToGetAllAddressesResponse } from "./address.schema";
import { buildResponse } from "@/utils/response";
import { createUserAddress, deleteUserAddressById, getAddressById, getAllUserAddresses, updateUserActiveAddress, updateUserAddressById } from "./address.queries";

export default class AddressController {
  static async createUserAddress(req: Request<ParamsDictionary, any, CreateUserAddressSchema>, res: Response) {
    try {
      const newAddress = await createUserAddress.run({
        street: req.body.street,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        user_id: req.body.payload.sub,
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


  static async getAllUserAddress(req: Request<ParamsDictionary, any, GetUserAddressSchema>, res: Response) {
    try {
      const address = await getAllUserAddresses.run({ user_id: req.body.payload.sub }, pool);
      
      return res.status(200).json(
        buildResponse(convertToGetAllAddressesResponse(address), true, "Address fetched successfully")
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


  static async deleteUserAddress(req: Request<ParamsDictionary, any, DeleteUserAddressSchema>, res: Response) {
    try {
      const deletedAddress = await deleteUserAddressById.run({ id: req.params.address_id, user_id: req.body.payload.sub }, pool);

      if (!deletedAddress || deletedAddress.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Address not found")
        );
      }

      return res.status(200).json(
        buildResponse(null, true, "Address deleted successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }

  
  static async setActiveAddress(req: Request<ParamsDictionary, any, SetUserActiveAddressSchema>, res: Response) {
    try {
      const updatedUser = await updateUserActiveAddress.run({ 
        active_address_id: req.body.active_address_id,
        user_id: req.body.payload.sub,
      }, pool);

      if (!updatedUser || updatedUser.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Address not found")
        );
      }

      const updatedAddress = await getAddressById.run({ 
        id: updatedUser[0].active_address_id,
        user_id: req.body.payload.sub 
      }, pool);

      return res.status(200).json(
        buildResponse(convertToGetAddressResponse(updatedAddress[0]), true, "Active address updated successfully")
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