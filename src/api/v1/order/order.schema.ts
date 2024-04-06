import { IGetOrderByIdResult, IGetOrderProductQuantityResult, IGetUserCartByUserResult } from "./order.queries";

export type AddToCartSchema = {
  product_id: string;
  payload: {
    sub: string;
  }
}

export type GetOrderDetailsSchema = {
  payload: {
    sub: string;
  }
}

export type GetProductQtySchema = {
  payload: {
    sub: string;
  }
}

export type IncreaseProductQtySchema = {
  product_id: string;
  payload: {
    sub: string;
  }
}

export type DecreaseProductQtySchema = {
  product_id: string;
  payload: {
    sub: string;
  }
}

export type ToggleStoreSelectedSchema = {
  store_id: string;
  payload: {
    sub: string;
  }
}

export type ToggleProductSelectedSchema = {
  product_id: string;
  payload: {
    sub: string;
  }
}

export type DeleteOrderFromStore = {
  payload: {
    sub: string;
  }
}

export type DeleteOrderFromProduct = {
  payload: {
    sub: string;
  }
}


export function convertToGetProductQtySchema(product: IGetOrderProductQuantityResult) {
  return {
    id: product.id,
    selected: product.selected,
    display_name: product.display_name,
    price_before: product.price_before,
    price_after: product.price_after,
    stock: product.stock,
    quantity: product.quantity,
    total_price: product.price_after * product.quantity,
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
    user: {
      email: order[0].user_email,
      display_name: order[0].user_display_name,
      address: {
        street: order[0].address_street,
        longitude: order[0].address_longitude,
        latitude: order[0].address_latitude,
      },
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
        .reduce((prev, curr) => prev + curr, 0),
  }
}


export function convertToGetUserCartSchema(cart: IGetUserCartByUserResult[]) {
  const order: Record<string, any> = {};

  cart.forEach(item => {
    if (!order[item.id]) {
      order[item.id] = {};
    }
    order[item.id]["id"] = item.id;
    order[item.id]["status"] = item.status;
    order[item.id]["store"] = {
      id: item.store_id,
      display_name: item.store_display_name,
    }
    if (!order[item.id]["products"]) {
      order[item.id]["products"] = [];
    }
    order[item.id]["products"].push({
      id: item.product_id,
      selected: item.order_product_selected,
      quantity: item.order_product_quantity,
      display_name: item.product_display_name,
      price_before: item.product_price_before,
      price_after: item.product_price_after,
      stock: item.product_stock,
    });

    if (!order[item.id]["total_price"]) {
      order[item.id]["total_price"] = 0;
    }
    order[item.id]["total_price"] += 
      item.status === "in-cart-unselected"
      ? 0
      : item.order_product_selected
        ? (item.order_product_quantity * item.product_price_after)
        : 0;
  });
  
  const orders = Object.values(order);
  return {
    orders,
    total_price: orders.map(o => o.total_price).reduce((prev, next) => prev + next, 0),
  } 
}