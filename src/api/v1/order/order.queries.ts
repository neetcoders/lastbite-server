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


/** 'DecreaseOrderProductQuantity' parameters type */
export interface IDecreaseOrderProductQuantityParams {
  customer_id?: string | null | void;
  order_id?: string | null | void;
  product_id?: string | null | void;
}

/** 'DecreaseOrderProductQuantity' return type */
export interface IDecreaseOrderProductQuantityResult {
  id: string;
}

/** 'DecreaseOrderProductQuantity' query type */
export interface IDecreaseOrderProductQuantityQuery {
  params: IDecreaseOrderProductQuantityParams;
  result: IDecreaseOrderProductQuantityResult;
}

const decreaseOrderProductQuantityIR: any = {"usedParamSet":{"product_id":true,"order_id":true,"customer_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":95}]},{"name":"order_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":187,"b":195}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":227,"b":238}]}],"statement":"UPDATE order_product\nSET quantity = GREATEST(1, quantity - 1)\nWHERE\n    product_id = :product_id\n    AND order_id = (\n        SELECT id\n        FROM orders\n        WHERE\n            id = :order_id\n            AND customer_id = :customer_id\n    )\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE order_product
 * SET quantity = GREATEST(1, quantity - 1)
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
export const decreaseOrderProductQuantity = new PreparedQuery<IDecreaseOrderProductQuantityParams,IDecreaseOrderProductQuantityResult>(decreaseOrderProductQuantityIR);


/** 'ToggleOrderProductSelected' parameters type */
export interface IToggleOrderProductSelectedParams {
  customer_id?: string | null | void;
  order_id?: string | null | void;
  product_id?: string | null | void;
}

/** 'ToggleOrderProductSelected' return type */
export interface IToggleOrderProductSelectedResult {
  id: string;
}

/** 'ToggleOrderProductSelected' query type */
export interface IToggleOrderProductSelectedQuery {
  params: IToggleOrderProductSelectedParams;
  result: IToggleOrderProductSelectedResult;
}

const toggleOrderProductSelectedIR: any = {"usedParamSet":{"product_id":true,"order_id":true,"customer_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":82}]},{"name":"order_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":174,"b":182}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":214,"b":225}]}],"statement":"UPDATE order_product\nSET selected = NOT selected\nWHERE\n    product_id = :product_id\n    AND order_id = (\n        SELECT id\n        FROM orders\n        WHERE\n            id = :order_id\n            AND customer_id = :customer_id\n    )\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE order_product
 * SET selected = NOT selected
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
export const toggleOrderProductSelected = new PreparedQuery<IToggleOrderProductSelectedParams,IToggleOrderProductSelectedResult>(toggleOrderProductSelectedIR);


/** 'DeleteOrderProduct' parameters type */
export interface IDeleteOrderProductParams {
  customer_id?: string | null | void;
  product_id?: string | null | void;
}

/** 'DeleteOrderProduct' return type */
export interface IDeleteOrderProductResult {
  id: string;
}

/** 'DeleteOrderProduct' query type */
export interface IDeleteOrderProductQuery {
  params: IDeleteOrderProductParams;
  result: IDeleteOrderProductResult;
}

const deleteOrderProductIR: any = {"usedParamSet":{"product_id":true,"customer_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":49,"b":59},{"a":327,"b":337}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":171}]}],"statement":"DELETE FROM order_product\nWHERE\n    product_id = :product_id\n    AND order_id = (\n        SELECT id\n        FROM orders\n        WHERE\n            customer_id = :customer_id\n            AND status IN ('in-cart-selected', 'in-cart-unselected')\n            AND store_id = (\n                SELECT store_id FROM product WHERE id = :product_id\n            )\n    )\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM order_product
 * WHERE
 *     product_id = :product_id
 *     AND order_id = (
 *         SELECT id
 *         FROM orders
 *         WHERE
 *             customer_id = :customer_id
 *             AND status IN ('in-cart-selected', 'in-cart-unselected')
 *             AND store_id = (
 *                 SELECT store_id FROM product WHERE id = :product_id
 *             )
 *     )
 * RETURNING id
 * ```
 */
export const deleteOrderProduct = new PreparedQuery<IDeleteOrderProductParams,IDeleteOrderProductResult>(deleteOrderProductIR);


/** 'DeleteEmptyOrder' parameters type */
export type IDeleteEmptyOrderParams = void;

/** 'DeleteEmptyOrder' return type */
export type IDeleteEmptyOrderResult = void;

/** 'DeleteEmptyOrder' query type */
export interface IDeleteEmptyOrderQuery {
  params: IDeleteEmptyOrderParams;
  result: IDeleteEmptyOrderResult;
}

const deleteEmptyOrderIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM orders o\nWHERE NOT EXISTS (\n    SELECT 1 FROM order_product op WHERE op.order_id = o.id\n)"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM orders o
 * WHERE NOT EXISTS (
 *     SELECT 1 FROM order_product op WHERE op.order_id = o.id
 * )
 * ```
 */
export const deleteEmptyOrder = new PreparedQuery<IDeleteEmptyOrderParams,IDeleteEmptyOrderResult>(deleteEmptyOrderIR);


/** 'ToggleOrderStoreSelected' parameters type */
export interface IToggleOrderStoreSelectedParams {
  store_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'ToggleOrderStoreSelected' return type */
export interface IToggleOrderStoreSelectedResult {
  id: string;
}

/** 'ToggleOrderStoreSelected' query type */
export interface IToggleOrderStoreSelectedQuery {
  params: IToggleOrderStoreSelectedParams;
  result: IToggleOrderStoreSelectedResult;
}

const toggleOrderStoreSelectedIR: any = {"usedParamSet":{"store_id":true,"user_id":true},"params":[{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":231,"b":239}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":263,"b":270}]}],"statement":"UPDATE orders\nSET status = (\n    CASE\n        WHEN status = 'in-cart-selected' THEN 'in-cart-unselected'::ORDER_STATUS\n        WHEN status = 'in-cart-unselected' THEN 'in-cart-selected'::ORDER_STATUS\n    END\n)\nWHERE\n    store_id = :store_id\n    AND customer_id = :user_id\n    AND status IN ('in-cart-selected', 'in-cart-unselected')\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE orders
 * SET status = (
 *     CASE
 *         WHEN status = 'in-cart-selected' THEN 'in-cart-unselected'::ORDER_STATUS
 *         WHEN status = 'in-cart-unselected' THEN 'in-cart-selected'::ORDER_STATUS
 *     END
 * )
 * WHERE
 *     store_id = :store_id
 *     AND customer_id = :user_id
 *     AND status IN ('in-cart-selected', 'in-cart-unselected')
 * RETURNING id
 * ```
 */
export const toggleOrderStoreSelected = new PreparedQuery<IToggleOrderStoreSelectedParams,IToggleOrderStoreSelectedResult>(toggleOrderStoreSelectedIR);


/** 'DeleteOrderStore' parameters type */
export interface IDeleteOrderStoreParams {
  store_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'DeleteOrderStore' return type */
export interface IDeleteOrderStoreResult {
  id: string;
}

/** 'DeleteOrderStore' query type */
export interface IDeleteOrderStoreQuery {
  params: IDeleteOrderStoreParams;
  result: IDeleteOrderStoreResult;
}

const deleteOrderStoreIR: any = {"usedParamSet":{"store_id":true,"user_id":true},"params":[{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":48}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":79}]}],"statement":"DELETE FROM orders\nWHERE\n    store_id = :store_id\n    AND customer_id = :user_id\n    AND status IN ('in-cart-selected', 'in-cart-unselected')\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM orders
 * WHERE
 *     store_id = :store_id
 *     AND customer_id = :user_id
 *     AND status IN ('in-cart-selected', 'in-cart-unselected')
 * RETURNING id
 * ```
 */
export const deleteOrderStore = new PreparedQuery<IDeleteOrderStoreParams,IDeleteOrderStoreResult>(deleteOrderStoreIR);


/** 'GetOrderProductQuantity' parameters type */
export interface IGetOrderProductQuantityParams {
  product_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'GetOrderProductQuantity' return type */
export interface IGetOrderProductQuantityResult {
  display_name: string;
  id: string;
  price_after: number;
  price_before: number;
  quantity: number;
  selected: boolean;
  stock: number;
}

/** 'GetOrderProductQuantity' query type */
export interface IGetOrderProductQuantityQuery {
  params: IGetOrderProductQuantityParams;
  result: IGetOrderProductQuantityResult;
}

const getOrderProductQuantityIR: any = {"usedParamSet":{"product_id":true,"user_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":248,"b":258}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":284,"b":291}]}],"statement":"SELECT\n    p.id,\n    op.selected,\n    p.display_name,\n    p.price_before,\n    p.price_after,\n    p.stock,\n    op.quantity\nFROM product p\nINNER JOIN order_product op ON op.product_id = p.id\nINNER JOIN orders o ON op.order_id = o.id\nWHERE\n    p.id = :product_id\n    AND o.customer_id = :user_id\n    AND status IN ('in-cart-selected', 'in-cart-unselected')"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     op.selected,
 *     p.display_name,
 *     p.price_before,
 *     p.price_after,
 *     p.stock,
 *     op.quantity
 * FROM product p
 * INNER JOIN order_product op ON op.product_id = p.id
 * INNER JOIN orders o ON op.order_id = o.id
 * WHERE
 *     p.id = :product_id
 *     AND o.customer_id = :user_id
 *     AND status IN ('in-cart-selected', 'in-cart-unselected')
 * ```
 */
export const getOrderProductQuantity = new PreparedQuery<IGetOrderProductQuantityParams,IGetOrderProductQuantityResult>(getOrderProductQuantityIR);


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

