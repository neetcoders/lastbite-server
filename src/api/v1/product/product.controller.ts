import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";

import pool from "@/database/pool";
import { CreateProductSchema, UpdateProductSchema } from "./product.schema";
import { buildResponse } from "@/utils/response";
import { createStoreAddress } from "../address/address.queries";
import { getCategoryIdBySlug } from "../category/category.queries";
import { createProduct, getProductById, getProductOwnerById, updateProductDetails } from "./product.queries";

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


  static async getProduct(req: Request, res: Response) {
    try {
      const product = await getProductById.run({ id: req.params.product_id }, pool);

      if (!product || product.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product does not exist")
        );
      }

      return res.status(200).json(
        buildResponse({
          id: product[0].id,
          display_name: product[0].display_name,
          description: product[0].description,
          price_before: product[0].price_before,
          price_after: product[0].price_after,
          expiration_date: product[0].expiration_date,
          stock: product[0].expiration_date,
          store: {
            id: product[0].store_id,
            display_name: product[0].store_display_name,
            address: {
              street: product[0].address_street,
              longitude: product[0].address_longitude,
              latitude: product[0].address_latitude,
              created_at: product[0].address_created_at,
              updated_at: product[0].address_updated_at,
            },
            created_at: product[0].store_created_at,
            updated_at: product[0].store_updated_at,
          },
          category: {
            slug: product[0].category_slug,
            display_name: product[0].category_display_name,
          },
          created_at: product[0].created_at,
          updated_at: product[0].updated_at
        }, true, "Product fetched successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  // IMPORTANT: This does NOT modify stock (as it is considered hot column)
  static async updateProduct(req: Request<ParamsDictionary, any, UpdateProductSchema>, res: Response) {
    try {
      const storeID = await getProductOwnerById.run({ id: req.params.product_id }, pool);
      if (!storeID || storeID.length !== 1 || storeID[0].store_id !== req.body.payload.sub) {
        return res.status(403).json(
          buildResponse(null, false, "Access denied")
        );
      }

      const category = await getCategoryIdBySlug.run({ slug: req.body.category_slug }, pool);

      if (!category || category.length === 0) {
        return res.status(400).json(
          buildResponse(null, false, "Invalid category")
        );
      }

      pool.query("BEGIN");

      const updatedProduct = await updateProductDetails.run({
        id: req.params.product_id,
        display_name: req.body.display_name,
        description: req.body?.description,
        price_before: req.body.price_before,
        price_after: req.body.price_after,
        expiration_date: req.body.expiration_date,
        category_id: category[0].id
      }, pool);

      const newProduct = await getProductById.run({ id: updatedProduct[0].id }, pool);

      if (!newProduct || newProduct.length === 0) {
        return res.status(400).json(
          buildResponse(null, false, "Error while updating product")
        );
      }

      pool.query("COMMIT");

      return res.status(200).json(
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
        }, true, "Product updated successfully")
      );
    }
    catch (err) {
      console.error(err);
      pool.query("ROLLBACK");
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}