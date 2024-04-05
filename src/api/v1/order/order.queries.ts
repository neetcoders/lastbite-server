/** Types generated for queries found in "src/api/v1/order/order.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type order_status = 'cancelled' | 'done' | 'in-cart-selected' | 'in-cart-unselected' | 'processed' | 'ready' | 'rejected' | 'waiting';

/** 'GetOrderInCartId' parameters type */
export interface IGetOrderInCartIdParams {
  store_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'GetOrderInCartId' return type */
export interface IGetOrderInCartIdResult {
  id: string;
}

/** 'GetOrderInCartId' query type */
export interface IGetOrderInCartIdQuery {
  params: IGetOrderInCartIdParams;
  result: IGetOrderInCartIdResult;
}

const getOrderInCartIdIR: any = {"usedParamSet":{"user_id":true,"store_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":55}]},{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":84}]}],"statement":"SELECT id\nFROM orders \nWHERE \n    customer_id = :user_id\n    AND store_id = :store_id\n    AND status IN ('in-cart-selected', 'in-cart-unselected')"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id
 * FROM orders 
 * WHERE 
 *     customer_id = :user_id
 *     AND store_id = :store_id
 *     AND status IN ('in-cart-selected', 'in-cart-unselected')
 * ```
 */
export const getOrderInCartId = new PreparedQuery<IGetOrderInCartIdParams,IGetOrderInCartIdResult>(getOrderInCartIdIR);


/** 'CreateNewOrder' parameters type */
export interface ICreateNewOrderParams {
  customer_id?: string | null | void;
  store_id?: string | null | void;
}

/** 'CreateNewOrder' return type */
export interface ICreateNewOrderResult {
  id: string;
}

/** 'CreateNewOrder' query type */
export interface ICreateNewOrderQuery {
  params: ICreateNewOrderParams;
  result: ICreateNewOrderResult;
}

const createNewOrderIR: any = {"usedParamSet":{"customer_id":true,"store_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":62}]},{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":65,"b":73}]}],"statement":"INSERT INTO orders (customer_id, store_id)\nVALUES (:customer_id, :store_id)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO orders (customer_id, store_id)
 * VALUES (:customer_id, :store_id)
 * RETURNING id
 * ```
 */
export const createNewOrder = new PreparedQuery<ICreateNewOrderParams,ICreateNewOrderResult>(createNewOrderIR);


/** 'CreateOrderProduct' parameters type */
export interface ICreateOrderProductParams {
  order_id?: string | null | void;
  product_id?: string | null | void;
}

/** 'CreateOrderProduct' return type */
export interface ICreateOrderProductResult {
  id: string;
}

/** 'CreateOrderProduct' query type */
export interface ICreateOrderProductQuery {
  params: ICreateOrderProductParams;
  result: ICreateOrderProductResult;
}

const createOrderProductIR: any = {"usedParamSet":{"order_id":true,"product_id":true},"params":[{"name":"order_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":75}]},{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":78,"b":88}]}],"statement":"INSERT INTO order_product (order_id, product_id, quantity)\nVALUES (:order_id, :product_id, 1)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO order_product (order_id, product_id, quantity)
 * VALUES (:order_id, :product_id, 1)
 * RETURNING id
 * ```
 */
export const createOrderProduct = new PreparedQuery<ICreateOrderProductParams,ICreateOrderProductResult>(createOrderProductIR);


/** 'GetOrderProductId' parameters type */
export interface IGetOrderProductIdParams {
  order_id?: string | null | void;
  product_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'GetOrderProductId' return type */
export interface IGetOrderProductIdResult {
  customer_id: string;
  id: string;
  quantity: number;
}

/** 'GetOrderProductId' query type */
export interface IGetOrderProductIdQuery {
  params: IGetOrderProductIdParams;
  result: IGetOrderProductIdResult;
}

const getOrderProductIdIR: any = {"usedParamSet":{"order_id":true,"product_id":true,"user_id":true},"params":[{"name":"order_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":140,"b":148}]},{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":171,"b":181}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":207,"b":214}]}],"statement":"SELECT \n    op.id, \n    op.quantity,\n    o.customer_id\nFROM order_product op\nINNER JOIN orders o ON op.order_id = o.id\nWHERE\n    order_id = :order_id\n    AND product_id = :product_id\n    AND o.customer_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     op.id, 
 *     op.quantity,
 *     o.customer_id
 * FROM order_product op
 * INNER JOIN orders o ON op.order_id = o.id
 * WHERE
 *     order_id = :order_id
 *     AND product_id = :product_id
 *     AND o.customer_id = :user_id
 * ```
 */
export const getOrderProductId = new PreparedQuery<IGetOrderProductIdParams,IGetOrderProductIdResult>(getOrderProductIdIR);


/** 'IncreaseOrderProductQuantity' parameters type */
export interface IIncreaseOrderProductQuantityParams {
  customer_id?: string | null | void;
  order_id?: string | null | void;
  product_id?: string | null | void;
}

/** 'IncreaseOrderProductQuantity' return type */
export interface IIncreaseOrderProductQuantityResult {
  id: string;
}

/** 'IncreaseOrderProductQuantity' query type */
export interface IIncreaseOrderProductQuantityQuery {
  params: IIncreaseOrderProductQuantityParams;
  result: IIncreaseOrderProductQuantityResult;
}

const increaseOrderProductQuantityIR: any = {"usedParamSet":{"product_id":true,"order_id":true,"customer_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":82}]},{"name":"order_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":175,"b":183}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":215,"b":226}]}],"statement":"UPDATE order_product\nSET quantity = quantity + 1\nWHERE\n    product_id = :product_id\n    AND order_id = (\n        SELECT id\n        FROM orders\n        WHERE \n            id = :order_id\n            AND customer_id = :customer_id\n    )\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE order_product
 * SET quantity = quantity + 1
 * WHERE
 *     product_id = :product_id
 *     AND order_id = (
 *         SELECT id
 *         FROM orders
 *         WHERE 
 *             id = :order_id
 *             AND customer_id = :customer_id
 *     )
 * RETURNING id
 * ```
 */
export const increaseOrderProductQuantity = new PreparedQuery<IIncreaseOrderProductQuantityParams,IIncreaseOrderProductQuantityResult>(increaseOrderProductQuantityIR);


/** 'GetOrderById' parameters type */
export interface IGetOrderByIdParams {
  id?: string | null | void;
}

/** 'GetOrderById' return type */
export interface IGetOrderByIdResult {
  created_at: Date;
  id: string;
  order_product_id: string;
  order_product_quantity: number;
  order_product_selected: boolean;
  product_display_name: string;
  product_id: string;
  product_price_after: number;
  product_price_before: number;
  product_stock: number;
  status: order_status;
  store_display_name: string;
  store_id: string;
  updated_at: Date;
}

/** 'GetOrderById' query type */
export interface IGetOrderByIdQuery {
  params: IGetOrderByIdParams;
  result: IGetOrderByIdResult;
}

const getOrderByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":618,"b":620}]}],"statement":"SELECT\n    o.id,\n    o.status,\n    s.id AS \"store_id\",\n    s.display_name AS \"store_display_name\",\n    p.id AS \"product_id\",\n    op.id AS \"order_product_id\",\n    op.selected AS \"order_product_selected\",\n    op.quantity AS \"order_product_quantity\",\n    p.display_name AS \"product_display_name\",\n    p.price_before AS \"product_price_before\",\n    p.price_after AS \"product_price_after\",\n    p.stock AS \"product_stock\",\n    o.created_at,\n    o.updated_at\nFROM orders o\nINNER JOIN order_product op ON o.id = op.order_id\nINNER JOIN store s ON s.id = o.store_id\nINNER JOIN product p ON p.id = op.product_id\nWHERE \n    o.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     o.id,
 *     o.status,
 *     s.id AS "store_id",
 *     s.display_name AS "store_display_name",
 *     p.id AS "product_id",
 *     op.id AS "order_product_id",
 *     op.selected AS "order_product_selected",
 *     op.quantity AS "order_product_quantity",
 *     p.display_name AS "product_display_name",
 *     p.price_before AS "product_price_before",
 *     p.price_after AS "product_price_after",
 *     p.stock AS "product_stock",
 *     o.created_at,
 *     o.updated_at
 * FROM orders o
 * INNER JOIN order_product op ON o.id = op.order_id
 * INNER JOIN store s ON s.id = o.store_id
 * INNER JOIN product p ON p.id = op.product_id
 * WHERE 
 *     o.id = :id
 * ```
 */
export const getOrderById = new PreparedQuery<IGetOrderByIdParams,IGetOrderByIdResult>(getOrderByIdIR);


/** 'GetUserCartByUser' parameters type */
export interface IGetUserCartByUserParams {
  user_id?: string | null | void;
}

/** 'GetUserCartByUser' return type */
export interface IGetUserCartByUserResult {
  created_at: Date;
  id: string;
  order_product_id: string;
  order_product_quantity: number;
  order_product_selected: boolean;
  product_display_name: string;
  product_id: string;
  product_price_after: number;
  product_price_before: number;
  product_stock: number;
  status: order_status;
  store_display_name: string;
  store_id: string;
  updated_at: Date;
}

/** 'GetUserCartByUser' query type */
export interface IGetUserCartByUserQuery {
  params: IGetUserCartByUserParams;
  result: IGetUserCartByUserResult;
}

const getUserCartByUserIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":627,"b":634}]}],"statement":"SELECT\n    o.id,\n    o.status,\n    s.id AS \"store_id\",\n    s.display_name AS \"store_display_name\",\n    p.id AS \"product_id\",\n    op.id AS \"order_product_id\",\n    op.selected AS \"order_product_selected\",\n    op.quantity AS \"order_product_quantity\",\n    p.display_name AS \"product_display_name\",\n    p.price_before AS \"product_price_before\",\n    p.price_after AS \"product_price_after\",\n    p.stock AS \"product_stock\",\n    o.created_at,\n    o.updated_at\nFROM orders o\nINNER JOIN order_product op ON o.id = op.order_id\nINNER JOIN store s ON s.id = o.store_id\nINNER JOIN product p ON p.id = op.product_id\nWHERE \n    o.customer_id = :user_id\n    AND o.status IN ('in-cart-selected', 'in-cart-unselected')"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     o.id,
 *     o.status,
 *     s.id AS "store_id",
 *     s.display_name AS "store_display_name",
 *     p.id AS "product_id",
 *     op.id AS "order_product_id",
 *     op.selected AS "order_product_selected",
 *     op.quantity AS "order_product_quantity",
 *     p.display_name AS "product_display_name",
 *     p.price_before AS "product_price_before",
 *     p.price_after AS "product_price_after",
 *     p.stock AS "product_stock",
 *     o.created_at,
 *     o.updated_at
 * FROM orders o
 * INNER JOIN order_product op ON o.id = op.order_id
 * INNER JOIN store s ON s.id = o.store_id
 * INNER JOIN product p ON p.id = op.product_id
 * WHERE 
 *     o.customer_id = :user_id
 *     AND o.status IN ('in-cart-selected', 'in-cart-unselected')
 * ```
 */
export const getUserCartByUser = new PreparedQuery<IGetUserCartByUserParams,IGetUserCartByUserResult>(getUserCartByUserIR);


