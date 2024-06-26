/** Types generated for queries found in "src/api/v1/user/user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'CheckUserByEmail' parameters type */
export interface ICheckUserByEmailParams {
  email?: string | null | void;
}

/** 'CheckUserByEmail' return type */
export interface ICheckUserByEmailResult {
  exists: boolean | null;
}

/** 'CheckUserByEmail' query type */
export interface ICheckUserByEmailQuery {
  params: ICheckUserByEmailParams;
  result: ICheckUserByEmailResult;
}

const checkUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":59}]}],"statement":"SELECT \n    EXISTS (SELECT 1 FROM users WHERE email = :email) AS \"exists\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     EXISTS (SELECT 1 FROM users WHERE email = :email) AS "exists"
 * ```
 */
export const checkUserByEmail = new PreparedQuery<ICheckUserByEmailParams,ICheckUserByEmailResult>(checkUserByEmailIR);


/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  user: {
    email: string | null | void,
    display_name: string | null | void,
    birth_date: DateOrString | null | void,
    user_secret: string | null | void
  };
}

/** 'CreateUser' return type */
export interface ICreateUserResult {
  id: string;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"user":true},"params":[{"name":"user","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"email","required":false},{"name":"display_name","required":false},{"name":"birth_date","required":false},{"name":"user_secret","required":false}]},"locs":[{"a":72,"b":76}]}],"statement":"INSERT INTO users (email, display_name, birth_date, user_secret)\nVALUES :user\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (email, display_name, birth_date, user_secret)
 * VALUES :user
 * RETURNING id
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'GetUserSecretByEmail' parameters type */
export interface IGetUserSecretByEmailParams {
  email?: string | null | void;
}

/** 'GetUserSecretByEmail' return type */
export interface IGetUserSecretByEmailResult {
  id: string;
  user_secret: string;
}

/** 'GetUserSecretByEmail' query type */
export interface IGetUserSecretByEmailQuery {
  params: IGetUserSecretByEmailParams;
  result: IGetUserSecretByEmailResult;
}

const getUserSecretByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":61}]}],"statement":"SELECT\n    id,\n    user_secret\nFROM users\nWHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     id,
 *     user_secret
 * FROM users
 * WHERE email = :email
 * ```
 */
export const getUserSecretByEmail = new PreparedQuery<IGetUserSecretByEmailParams,IGetUserSecretByEmailResult>(getUserSecretByEmailIR);


/** 'GetUserById' parameters type */
export interface IGetUserByIdParams {
  id?: string | null | void;
}

/** 'GetUserById' return type */
export interface IGetUserByIdResult {
  birth_date: Date;
  created_at: Date;
  display_name: string;
  email: string;
  updated_at: Date;
}

/** 'GetUserById' query type */
export interface IGetUserByIdQuery {
  params: IGetUserByIdParams;
  result: IGetUserByIdResult;
}

const getUserByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":105,"b":107}]}],"statement":"SELECT\n    email,\n    display_name,\n    birth_date,\n    created_at,\n    updated_at\nFROM users\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     email,
 *     display_name,
 *     birth_date,
 *     created_at,
 *     updated_at
 * FROM users
 * WHERE id = :id
 * ```
 */
export const getUserById = new PreparedQuery<IGetUserByIdParams,IGetUserByIdResult>(getUserByIdIR);


/** 'GetUserWithAddress' parameters type */
export interface IGetUserWithAddressParams {
  id?: string | null | void;
}

/** 'GetUserWithAddress' return type */
export interface IGetUserWithAddressResult {
  address_coordinates: unknown;
  address_created_at: Date;
  address_id: string;
  address_street: string;
  address_updated_at: Date;
  birth_date: Date;
  created_at: Date;
  display_name: string;
  email: string;
  updated_at: Date;
}

/** 'GetUserWithAddress' query type */
export interface IGetUserWithAddressQuery {
  params: IGetUserWithAddressParams;
  result: IGetUserWithAddressResult;
}

const getUserWithAddressIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":357,"b":359}]}],"statement":"SELECT\n    u.email,\n    u.display_name,\n    u.birth_date,\n    a.id as \"address_id\",\n    a.street as \"address_street\",\n    a.coordinates as \"address_coordinates\",\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"address_updated_at\",\n    u.created_at,\n    u.updated_at\nFROM users u\nLEFT JOIN address a ON a.id = u.active_address_id\nWHERE u.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     u.email,
 *     u.display_name,
 *     u.birth_date,
 *     a.id as "address_id",
 *     a.street as "address_street",
 *     a.coordinates as "address_coordinates",
 *     a.created_at as "address_created_at",
 *     a.updated_at as "address_updated_at",
 *     u.created_at,
 *     u.updated_at
 * FROM users u
 * LEFT JOIN address a ON a.id = u.active_address_id
 * WHERE u.id = :id
 * ```
 */
export const getUserWithAddress = new PreparedQuery<IGetUserWithAddressParams,IGetUserWithAddressResult>(getUserWithAddressIR);


