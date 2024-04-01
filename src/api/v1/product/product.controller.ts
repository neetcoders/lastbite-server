import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { CreateProductSchema } from "./product.schema";
import { buildResponse } from "@/utils/response";
import { createStoreAddress } from "../address/address.queries";
import { getCategoryIdBySlug } from "../category/category.queries";
import { createProduct, getProductById } from "./product.queries";

export default class UserController {
  static async createProduct(req: Request<ParamsDictionary, any, CreateProductSchema>, res: Response) {
    try {
      const category = await getCategoryIdBySlug.run({ slug: req.body.category_slug }, pool);

      if (!category || category.length === 0) {
        return res.status(400).json(
          buildResponse(null, false, "Invalid category")
        );
      }

      const createdProduct = await createProduct.run({
        product: {
          display_name: req.body.display_name,
          description: req.body?.description,
          price_before: req.body.price_before,
          price_after: req.body.price_after,
          expiration_date: req.body.expiration_date,
          stock: req.body.stock,
          store_id: req.body.payload.sub,
          category_id: category[0].id
        }
      }, pool);

      const newProduct = await getProductById.run({ id: createdProduct[0].id }, pool);

      if (!newProduct || newProduct.length === 0) {
        return res.status(400).json(
          buildResponse(null, false, "Error while creating product")
        );
      }

      return res.status(201).json(
        buildResponse({
          id: newProduct[0].id,
          display_name: newProduct[0].display_name,
          description: newProduct[0].description,
          price_before: newProduct[0].price_before,
          price_after: newProduct[0].price_after,
          expiration_date: newProduct[0].expiration_date,
          stock: newProduct[0].expiration_date,
          store: {
            id: newProduct[0].store_id,
            display_name: newProduct[0].store_display_name,
            address: {
              street: newProduct[0].address_street,
              longitude: newProduct[0].address_longitude,
              latitude: newProduct[0].address_latitude,
              created_at: newProduct[0].address_created_at,
              updated_at: newProduct[0].address_updated_at,
            },
            created_at: newProduct[0].store_created_at,
            updated_at: newProduct[0].store_updated_at,
          },
          category: {
            slug: newProduct[0].category_slug,
            display_name: newProduct[0].category_display_name,
          },
          created_at: newProduct[0].created_at,
          updated_at: newProduct[0].updated_at
        }, true, "Product created successfully")
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