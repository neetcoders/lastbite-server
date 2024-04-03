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
  id: string;
}

/** 'CreateStore' query type */
export interface ICreateStoreQuery {
  params: ICreateStoreParams;
  result: ICreateStoreResult;
}

const createStoreIR: any = {"usedParamSet":{"store":true},"params":[{"name":"store","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"email","required":false},{"name":"display_name","required":false},{"name":"address_id","required":false},{"name":"store_secret","required":false}]},"locs":[{"a":73,"b":78}]}],"statement":"INSERT INTO store (email, display_name, address_id, store_secret)\nVALUES :store\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO store (email, display_name, address_id, store_secret)
 * VALUES :store
 * RETURNING id
 * ```
 */
export const createStore = new PreparedQuery<ICreateStoreParams,ICreateStoreResult>(createStoreIR);


/** 'GetStoreSecretByEmail' parameters type */
export interface IGetStoreSecretByEmailParams {
  email?: string | null | void;
}

/** 'GetStoreSecretByEmail' return type */
export interface IGetStoreSecretByEmailResult {
  id: string;
  store_secret: string;
}

/** 'GetStoreSecretByEmail' query type */
export interface IGetStoreSecretByEmailQuery {
  params: IGetStoreSecretByEmailParams;
  result: IGetStoreSecretByEmailResult;
}

const getStoreSecretByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":64}]}],"statement":"SELECT \n    id, \n    store_secret\nFROM store\nWHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     id, 
 *     store_secret
 * FROM store
 * WHERE email = :email
 * ```
 */
export const getStoreSecretByEmail = new PreparedQuery<IGetStoreSecretByEmailParams,IGetStoreSecretByEmailResult>(getStoreSecretByEmailIR);


/** 'GetStoreById' parameters type */
export interface IGetStoreByIdParams {
  id?: string | null | void;
}

/** 'GetStoreById' return type */
export interface IGetStoreByIdResult {
  address_created_at: Date;
  address_latitude: number | null;
  address_longitude: number | null;
  address_street: string;
  adress_updated_at: Date;
  bio: string | null;
  created_at: Date;
  display_name: string;
  email: string;
  store_secret: string;
  updated_at: Date;
}

/** 'GetStoreById' query type */
export interface IGetStoreByIdQuery {
  params: IGetStoreByIdParams;
  result: IGetStoreByIdResult;
}

const getStoreByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":408,"b":410}]}],"statement":"SELECT\n    s.email,\n    s.display_name,\n    s.bio,\n    s.store_secret,\n    a.street as \"address_street\",\n    ST_X(a.coordinates::GEOMETRY) as \"address_longitude\",\n    ST_Y(a.coordinates::GEOMETRY) as \"address_latitude\",\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"adress_updated_at\",\n    s.created_at,\n    s.updated_at\nFROM store s\nINNER JOIN address a ON a.id = s.address_id\nWHERE s.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.email,
 *     s.display_name,
 *     s.bio,
 *     s.store_secret,
 *     a.street as "address_street",
 *     ST_X(a.coordinates::GEOMETRY) as "address_longitude",
 *     ST_Y(a.coordinates::GEOMETRY) as "address_latitude",
 *     a.created_at as "address_created_at",
 *     a.updated_at as "adress_updated_at",
 *     s.created_at,
 *     s.updated_at
 * FROM store s
 * INNER JOIN address a ON a.id = s.address_id
 * WHERE s.id = :id
 * ```
 */
export const getStoreById = new PreparedQuery<IGetStoreByIdParams,IGetStoreByIdResult>(getStoreByIdIR);


