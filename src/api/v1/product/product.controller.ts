import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response, query } from "express";

import pool from "@/database/pool";
import { CreateProductSchema, UpdateProductSchema, UpdateStockSchema, convertToGetProductResponse } from "./product.schema";
import { buildResponse } from "@/utils/response";
import { getCategoryIdBySlug } from "../category/category.queries";
import { createProduct, deleteProductById, getProductById, getProductOwnerById, updateProductDetails, updateProductStock } from "./product.queries";

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
        buildResponse(convertToGetProductResponse(newProduct[0]), true, "Product created successfully")
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
        buildResponse(convertToGetProductResponse(product[0]), true, "Product fetched successfully")
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

      const updatedProduct = await updateProductDetails.run({
        id: req.params.product_id,
        display_name: req.body.display_name,
        description: req.body?.description,
        price_before: req.body.price_before,
        price_after: req.body.price_after,
        expiration_date: req.body.expiration_date,
        category_id: category[0].id,
        store_id: req.body.payload.sub,
      }, pool);

      const newProduct = await getProductById.run({ id: updatedProduct[0].id }, pool);

      if (!newProduct || newProduct.length === 0) {
        return res.status(400).json(
          buildResponse(null, false, "Error while updating product")
        );
      }

      return res.status(200).json(
        buildResponse(convertToGetProductResponse(newProduct[0]), true, "Product updated successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async updateStock(req: Request<ParamsDictionary, any, UpdateStockSchema>, res: Response) {
    try {
      const storeID = await getProductOwnerById.run({ id: req.params.product_id }, pool);
      if (!storeID || storeID.length !== 1 || storeID[0].store_id !== req.body.payload.sub) {
        return res.status(403).json(
          buildResponse(null, false, "Access denied")
        );
      }

      const updatedProduct = await updateProductStock.run({
        id: req.params.product_id,
        store_id: req.body.payload.sub,
        stock: req.body.stock,
      }, pool);

      const newProduct = await getProductById.run({ id: updatedProduct[0].id }, pool);

      if (!newProduct || newProduct.length === 0) {
        return res.status(400).json(
          buildResponse(null, false, "Error while updating stock")
        );
      }

      return res.status(200).json(
        buildResponse(convertToGetProductResponse(newProduct[0]), true, "Stock updated successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async deleteProduct(req: Request, res: Response) {
    try {
      const storeID = await getProductOwnerById.run({ id: req.params.product_id }, pool);
      if (!storeID || storeID.length !== 1 || storeID[0].store_id !== req.body.payload.sub) {
        return res.status(403).json(
          buildResponse(null, false, "Access denied")
        );
      }

      await deleteProductById.run({ id: req.params.product_id, store_id: req.body.payload.sub }, pool);

      return res.status(200).json(
        buildResponse(null, true, "Product deleted successfully")
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