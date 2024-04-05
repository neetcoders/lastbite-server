import { IGetOrderByIdResult } from "./order.queries";

export type AddToCartSchema = {
  product_id: string;
  payload: {
    sub: string;
  }
}

export function convertToGetOrderSchema(order: IGetOrderByIdResult[]) {
  return {
    id: order[0].id,
    status: order[0].status,
    store: {
      id: order[0].store_id,
      display_name: order[0].store_display_name,
    },
    products: order.map(o => ({
      id: o.product_id,
      selected: o.order_product_selected,
      quantity: o.order_product_quantity,
      display_name: o.product_display_name,
      price_before: o.product_price_before,
      price_after: o.product_price_after,
      stock: o.product_stock,
    })),
    total_price: order[0].status === "in-cart-unselected" 
      ? 0 
      : order.filter(o => o.order_product_selected)
        .map(o => o.product_price_after * o.order_product_quantity)
        .reduce((prev, curr) => prev + curr),
  }
}