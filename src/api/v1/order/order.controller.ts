import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response, query } from "express";

import pool from "@/database/pool";
import { buildResponse } from "@/utils/response";
import { AddToCartSchema, DecreaseProductQtySchema, GetProductQtySchema, IncreaseProductQtySchema, convertToGetOrderSchema, convertToGetUserCartSchema } from "./order.schema";
import { getOrderInCartId, createNewOrder, getOrderProductId, createOrderProduct, increaseOrderProductQuantity, getOrderById, getUserCartByUser, decreaseOrderProductQuantity } from "./order.queries";
import { getMinimumProduct } from "../product/product.queries";

export default class UserController {
  static async addToCart(req: Request<ParamsDictionary, any, AddToCartSchema>, res: Response) {
    try {
      const product = await getMinimumProduct.run({ id: req.body.product_id }, pool);

      if (!product || product.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product not found")
        );
      }

      if (product[0].stock <= 0) {
        return res.status(400).json(
          buildResponse(null, false, "Product is sold out")
        );
      }
      
      await pool.query("BEGIN");

      const order = await getOrderInCartId.run({ user_id: req.body.payload.sub, store_id: product[0].store_id }, pool);
      let orderID;
      if (!order || order.length === 0) {
        const newOrder = await createNewOrder.run({ store_id: product[0].store_id, customer_id: req.body.payload.sub }, pool);
        orderID = newOrder[0].id;
      }
      else {
        orderID = order[0].id;
      }

      const orderProduct = await getOrderProductId.run({
        order_id: orderID, 
        product_id: req.body.product_id, 
        user_id: req.body.payload.sub,
      }, pool);

      let orderProductID;
      if (!orderProduct || orderProduct.length === 0 ) {
        const newOrderProduct = await createOrderProduct.run({ order_id: orderID, product_id: req.body.product_id }, pool);
        orderProductID = newOrderProduct[0].id;
      }
      else {
        orderProductID = orderProduct[0].id;
        if (orderProduct[0].quantity >= product[0].stock) {
          await pool.query("ROLLBACK")
          return res.status(400).json(
            buildResponse(null, false, "Stock is not sufficient")
          );
        }
        else {
          await increaseOrderProductQuantity.run({
            product_id: req.body.product_id,
            customer_id: req.body.payload.sub,
            order_id: orderID,
          }, pool);
        }
      }

      const newOrderProduct = await getOrderById.run({ id: orderID }, pool);
      await pool.query("COMMIT");

      res.status(200).json(
        buildResponse(convertToGetOrderSchema(newOrderProduct), true, "Product added sucessfully")
      );

    }
    catch (err) {
      await pool.query("ROLLBACK");
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async getUserCart(req: Request, res: Response) {
    try {
      const userCart = await getUserCartByUser.run({ user_id: req.body.payload.sub }, pool);
      return res.status(200).json(
        buildResponse(convertToGetUserCartSchema(userCart), true, "User cart fetched successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async increaseProductQty(req: Request<ParamsDictionary, any, IncreaseProductQtySchema>, res: Response) {
    try {
      const product = await getMinimumProduct.run({ id: req.body.product_id }, pool);

      if (!product || product.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product not found")
        );
      }

      if (product[0].stock <= 0) {
        return res.status(400).json(
          buildResponse(null, false, "Product is sold out")
        );
      }

      const order = await getOrderInCartId.run({ user_id: req.body.payload.sub, store_id: product[0].store_id }, pool);
      if (!order || order.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product is not in cart yet")
        ) 
      }

      const orderProduct = await getOrderProductId.run({
        order_id: order[0].id, 
        product_id: req.body.product_id, 
        user_id: req.body.payload.sub,
      }, pool);

      if (!orderProduct || orderProduct.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product is not in cart yet")
        );
      }

      
      if (orderProduct[0].quantity >= product[0].stock) {
        return res.status(400).json(
          buildResponse(null, false, "Stock is not sufficient")
        );
      }
      else {
        await increaseOrderProductQuantity.run({
          product_id: req.body.product_id,
          customer_id: req.body.payload.sub,
          order_id: order[0].id,
        }, pool);
      }
      

      const updatedOrder = await getOrderById.run({ id: order[0].id }, pool);

      res.status(200).json(
        buildResponse(convertToGetOrderSchema(updatedOrder), true, "Quantity increased successfully")
      );

    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async decreaseProductQty(req: Request<ParamsDictionary, any, DecreaseProductQtySchema>, res: Response) {
    try {
      const product = await getMinimumProduct.run({ id: req.body.product_id }, pool);

      if (!product || product.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product not found")
        );
      }

      if (product[0].stock <= 0) {
        return res.status(400).json(
          buildResponse(null, false, "Product is sold out")
        );
      }

      const order = await getOrderInCartId.run({ user_id: req.body.payload.sub, store_id: product[0].store_id }, pool);
      if (!order || order.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product is not in cart yet")
        ) 
      }

      const orderProduct = await getOrderProductId.run({
        order_id: order[0].id, 
        product_id: req.body.product_id, 
        user_id: req.body.payload.sub,
      }, pool);

      if (!orderProduct || orderProduct.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product is not in cart yet")
        );
      }

      
      if (orderProduct[0].quantity <= 1) {
        return res.status(400).json(
          buildResponse(null, false, "Quantity must at least be 1")
        );
      }
      else {
        await decreaseOrderProductQuantity.run({
          product_id: req.body.product_id,
          customer_id: req.body.payload.sub,
          order_id: order[0].id,
        }, pool);
      }
      

      const updatedOrder = await getOrderById.run({ id: order[0].id }, pool);

      res.status(200).json(
        buildResponse(convertToGetOrderSchema(updatedOrder), true, "Quantity increased successfully")
      );

    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async getProductQty(req: Request<ParamsDictionary, any, GetProductQtySchema>, res: Response) {
    try {
      const product = await getMinimumProduct.run({ id: req.params.product_id }, pool);

      if (!product || product.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product not found")
        );
      }

      if (product[0].stock <= 0) {
        return res.status(400).json(
          buildResponse(null, false, "Product is sold out")
        );
      }

      const order = await getOrderInCartId.run({ user_id: req.body.payload.sub, store_id: product[0].store_id }, pool);
      if (!order || order.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product is not in cart yet")
        ) 
      }

      const orderProduct = await getOrderProductId.run({
        order_id: order[0].id, 
        product_id: req.params.product_id, 
        user_id: req.body.payload.sub,
      }, pool);

      if (!orderProduct || orderProduct.length === 0) {
        return res.status(404).json(
          buildResponse(null, false, "Product is not in cart yet")
        );
      }

      res.status(200).json(
        buildResponse({ quantity: orderProduct[0].quantity }, true, "Quantity fetched successfully")
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