/** Types generated for queries found in "src/api/v1/address/address.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateStoreAddress' parameters type */
export interface ICreateStoreAddressParams {
  latitude?: number | null | void;
  longitude?: number | null | void;
  street?: string | null | void;
}

/** 'CreateStoreAddress' return type */
export interface ICreateStoreAddressResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'CreateStoreAddress' query type */
export interface ICreateStoreAddressQuery {
  params: ICreateStoreAddressParams;
  result: ICreateStoreAddressResult;
}

const createStoreAddressIR: any = {"usedParamSet":{"street":true,"longitude":true,"latitude":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":56}]},{"name":"longitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":81}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":92}]}],"statement":"INSERT INTO address (street, coordinates)\nVALUES (:street, ST_MakePoint(:longitude, :latitude))\nRETURNING \n    id, \n    street,\n    ST_X(coordinates::geometry) as \"longitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO address (street, coordinates)
 * VALUES (:street, ST_MakePoint(:longitude, :latitude))
 * RETURNING 
 *     id, 
 *     street,
 *     ST_X(coordinates::geometry) as "longitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * ```
 */
export const createStoreAddress = new PreparedQuery<ICreateStoreAddressParams,ICreateStoreAddressResult>(createStoreAddressIR);


/** 'CreateUserAddress' parameters type */
export interface ICreateUserAddressParams {
  latitude?: number | null | void;
  longitude?: number | null | void;
  street?: string | null | void;
  user_id?: string | null | void;
}

/** 'CreateUserAddress' return type */
export interface ICreateUserAddressResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'CreateUserAddress' query type */
export interface ICreateUserAddressQuery {
  params: ICreateUserAddressParams;
  result: ICreateUserAddressResult;
}

const createUserAddressIR: any = {"usedParamSet":{"street":true,"longitude":true,"latitude":true,"user_id":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":65}]},{"name":"longitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":81,"b":90}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":101}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":105,"b":112}]}],"statement":"INSERT INTO address (street, coordinates, user_id)\nVALUES (:street, ST_MakePoint(:longitude, :latitude), :user_id)\nRETURNING\n    id, \n    street,\n    ST_X(coordinates::geometry) as \"longitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO address (street, coordinates, user_id)
 * VALUES (:street, ST_MakePoint(:longitude, :latitude), :user_id)
 * RETURNING
 *     id, 
 *     street,
 *     ST_X(coordinates::geometry) as "longitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * ```
 */
export const createUserAddress = new PreparedQuery<ICreateUserAddressParams,ICreateUserAddressResult>(createUserAddressIR);


/** 'GetAddressById' parameters type */
export interface IGetAddressByIdParams {
  id?: string | null | void;
  user_id?: string | null | void;
}

/** 'GetAddressById' return type */
export interface IGetAddressByIdResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'GetAddressById' query type */
export interface IGetAddressByIdQuery {
  params: IGetAddressByIdParams;
  result: IGetAddressByIdResult;
}

const getAddressByIdIR: any = {"usedParamSet":{"id":true,"user_id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":186,"b":188}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":208,"b":215}]}],"statement":"SELECT \n    id, \n    street, \n    ST_X(coordinates::geometry) as \"longitude\",\n    ST_Y(coordinates::geometry) as \"latitude\", \n    created_at, \n    updated_at\nFROM address\nWHERE\n    id = :id\n    AND user_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     id, 
 *     street, 
 *     ST_X(coordinates::geometry) as "longitude",
 *     ST_Y(coordinates::geometry) as "latitude", 
 *     created_at, 
 *     updated_at
 * FROM address
 * WHERE
 *     id = :id
 *     AND user_id = :user_id
 * ```
 */
export const getAddressById = new PreparedQuery<IGetAddressByIdParams,IGetAddressByIdResult>(getAddressByIdIR);


/** 'GetAllUserAddresses' parameters type */
export interface IGetAllUserAddressesParams {
  user_id?: string | null | void;
}

/** 'GetAllUserAddresses' return type */
export interface IGetAllUserAddressesResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'GetAllUserAddresses' query type */
export interface IGetAllUserAddressesQuery {
  params: IGetAllUserAddressesParams;
  result: IGetAllUserAddressesResult;
}

const getAllUserAddressesIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":186,"b":193}]}],"statement":"SELECT \n    id, \n    street, \n    ST_X(coordinates::geometry) as \"longitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at, \n    updated_at\nFROM address\nWHERE user_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     id, 
 *     street, 
 *     ST_X(coordinates::geometry) as "longitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at, 
 *     updated_at
 * FROM address
 * WHERE user_id = :user_id
 * ```
 */
export const getAllUserAddresses = new PreparedQuery<IGetAllUserAddressesParams,IGetAllUserAddressesResult>(getAllUserAddressesIR);


/** 'UpdateUserAddressById' parameters type */
export interface IUpdateUserAddressByIdParams {
  id?: string | null | void;
  latitude?: number | null | void;
  longitude?: number | null | void;
  street?: string | null | void;
  user_id?: string | null | void;
}

/** 'UpdateUserAddressById' return type */
export interface IUpdateUserAddressByIdResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'UpdateUserAddressById' query type */
export interface IUpdateUserAddressByIdQuery {
  params: IUpdateUserAddressByIdParams;
  result: IUpdateUserAddressByIdResult;
}

const updateUserAddressByIdIR: any = {"usedParamSet":{"street":true,"longitude":true,"latitude":true,"id":true,"user_id":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":38}]},{"name":"longitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":81}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":92}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":110,"b":112}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":132,"b":139}]}],"statement":"UPDATE address\nSET\n    street = :street,\n    coordinates = ST_MakePoint(:longitude, :latitude)\nWHERE\n    id = :id\n    AND user_id = :user_id\nRETURNING\n    id, \n    street,\n    ST_X(coordinates::geometry) as \"longitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE address
 * SET
 *     street = :street,
 *     coordinates = ST_MakePoint(:longitude, :latitude)
 * WHERE
 *     id = :id
 *     AND user_id = :user_id
 * RETURNING
 *     id, 
 *     street,
 *     ST_X(coordinates::geometry) as "longitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * ```
 */
export const updateUserAddressById = new PreparedQuery<IUpdateUserAddressByIdParams,IUpdateUserAddressByIdResult>(updateUserAddressByIdIR);


/** 'DeleteUserAddressById' parameters type */
export interface IDeleteUserAddressByIdParams {
  id?: string | null | void;
  user_id?: string | null | void;
}

/** 'DeleteUserAddressById' return type */
export interface IDeleteUserAddressByIdResult {
  id: string;
}

/** 'DeleteUserAddressById' query type */
export interface IDeleteUserAddressByIdQuery {
  params: IDeleteUserAddressByIdParams;
  result: IDeleteUserAddressByIdResult;
}

const deleteUserAddressByIdIR: any = {"usedParamSet":{"id":true,"user_id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":37}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":64}]}],"statement":"DELETE FROM address\nWHERE\n    id = :id\n    AND user_id = :user_id\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM address
 * WHERE
 *     id = :id
 *     AND user_id = :user_id
 * RETURNING id
 * ```
 */
export const deleteUserAddressById = new PreparedQuery<IDeleteUserAddressByIdParams,IDeleteUserAddressByIdResult>(deleteUserAddressByIdIR);


/** 'UpdateUserActiveAddress' parameters type */
export interface IUpdateUserActiveAddressParams {
  active_address_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'UpdateUserActiveAddress' return type */
export interface IUpdateUserActiveAddressResult {
  active_address_id: string | null;
}

/** 'UpdateUserActiveAddress' query type */
export interface IUpdateUserActiveAddressQuery {
  params: IUpdateUserActiveAddressParams;
  result: IUpdateUserActiveAddressResult;
}

const updateUserActiveAddressIR: any = {"usedParamSet":{"active_address_id":true,"user_id":true},"params":[{"name":"active_address_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":54},{"a":106,"b":123}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":143,"b":150}]}],"statement":"UPDATE users\nSET active_address_id = :active_address_id\nWHERE (\n    SELECT id FROM address\n    WHERE id = :active_address_id\n    AND user_id = :user_id\n) IS NOT NULL\nRETURNING active_address_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE users
 * SET active_address_id = :active_address_id
 * WHERE (
 *     SELECT id FROM address
 *     WHERE id = :active_address_id
 *     AND user_id = :user_id
 * ) IS NOT NULL
 * RETURNING active_address_id
 * ```
 */
export const updateUserActiveAddress = new PreparedQuery<IUpdateUserActiveAddressParams,IUpdateUserActiveAddressResult>(updateUserActiveAddressIR);


