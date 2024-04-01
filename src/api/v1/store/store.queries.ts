/** Types generated for queries found in "src/api/v1/store/store.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CheckStoreByEmail' parameters type */
export interface ICheckStoreByEmailParams {
  email?: string | null | void;
}

/** 'CheckStoreByEmail' return type */
export interface ICheckStoreByEmailResult {
  exists: boolean | null;
}

/** 'CheckStoreByEmail' query type */
export interface ICheckStoreByEmailQuery {
  params: ICheckStoreByEmailParams;
  result: ICheckStoreByEmailResult;
}

const checkStoreByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":59}]}],"statement":"SELECT \n    EXISTS (SELECT 1 FROM store WHERE email = :email) AS \"exists\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     EXISTS (SELECT 1 FROM store WHERE email = :email) AS "exists"
 * ```
 */
export const checkStoreByEmail = new PreparedQuery<ICheckStoreByEmailParams,ICheckStoreByEmailResult>(checkStoreByEmailIR);


/** 'CreateStore' parameters type */
export interface ICreateStoreParams {
  store: {
    email: string | null | void,
    display_name: string | null | void,
    address_id: string | null | void,
    store_secret: string | null | void
  };
}

/** 'CreateStore' return type */
export interface ICreateStoreResult {
  address_id: string;
  created_at: Date;
  display_name: string;
  email: string;
  id: string;
  updated_at: Date;
}

/** 'CreateStore' query type */
export interface ICreateStoreQuery {
  params: ICreateStoreParams;
  result: ICreateStoreResult;
}

const createStoreIR: any = {"usedParamSet":{"store":true},"params":[{"name":"store","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"email","required":false},{"name":"display_name","required":false},{"name":"address_id","required":false},{"name":"store_secret","required":false}]},"locs":[{"a":73,"b":78}]}],"statement":"INSERT INTO store (email, display_name, address_id, store_secret)\nVALUES :store\nRETURNING id, email, display_name, address_id, created_at, updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO store (email, display_name, address_id, store_secret)
 * VALUES :store
 * RETURNING id, email, display_name, address_id, created_at, updated_at
 * ```
 */
export const createStore = new PreparedQuery<ICreateStoreParams,ICreateStoreResult>(createStoreIR);


