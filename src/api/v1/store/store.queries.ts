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


/** 'GetStoreByEmailWithSecret' parameters type */
export interface IGetStoreByEmailWithSecretParams {
  email?: string | null | void;
}

/** 'GetStoreByEmailWithSecret' return type */
export interface IGetStoreByEmailWithSecretResult {
  address_created_at: Date;
  adress_updated_at: Date;
  bio: string | null;
  coordinates: unknown;
  created_at: Date;
  display_name: string;
  email: string;
  id: string;
  store_secret: string;
  street: string;
  updated_at: Date;
}

/** 'GetStoreByEmailWithSecret' query type */
export interface IGetStoreByEmailWithSecretQuery {
  params: IGetStoreByEmailWithSecretParams;
  result: IGetStoreByEmailWithSecretResult;
}

const getStoreByEmailWithSecretIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":304,"b":309}]}],"statement":"SELECT\n    s.id,\n    s.email,\n    s.display_name,\n    s.bio,\n    s.store_secret,\n    a.street,\n    a.coordinates,\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"adress_updated_at\",\n    s.created_at,\n    s.updated_at\nFROM store s\nINNER JOIN address a ON a.id = s.address_id \nWHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.id,
 *     s.email,
 *     s.display_name,
 *     s.bio,
 *     s.store_secret,
 *     a.street,
 *     a.coordinates,
 *     a.created_at as "address_created_at",
 *     a.updated_at as "adress_updated_at",
 *     s.created_at,
 *     s.updated_at
 * FROM store s
 * INNER JOIN address a ON a.id = s.address_id 
 * WHERE email = :email
 * ```
 */
export const getStoreByEmailWithSecret = new PreparedQuery<IGetStoreByEmailWithSecretParams,IGetStoreByEmailWithSecretResult>(getStoreByEmailWithSecretIR);


/** 'GetStoreById' parameters type */
export interface IGetStoreByIdParams {
  id?: string | null | void;
}

/** 'GetStoreById' return type */
export interface IGetStoreByIdResult {
  address_created_at: Date;
  adress_updated_at: Date;
  bio: string | null;
  coordinates: unknown;
  created_at: Date;
  display_name: string;
  email: string;
  store_secret: string;
  street: string;
  updated_at: Date;
}

/** 'GetStoreById' query type */
export interface IGetStoreByIdQuery {
  params: IGetStoreByIdParams;
  result: IGetStoreByIdResult;
}

const getStoreByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":292,"b":294}]}],"statement":"SELECT\n    s.email,\n    s.display_name,\n    s.bio,\n    s.store_secret,\n    a.street,\n    a.coordinates,\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"adress_updated_at\",\n    s.created_at,\n    s.updated_at\nFROM store s\nINNER JOIN address a ON a.id = s.address_id\nWHERE s.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.email,
 *     s.display_name,
 *     s.bio,
 *     s.store_secret,
 *     a.street,
 *     a.coordinates,
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


