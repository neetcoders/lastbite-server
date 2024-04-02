/** Types generated for queries found in "src/api/v1/address/address.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateStoreAddress' parameters type */
export interface ICreateStoreAddressParams {
  address: {
    street: string | null | void,
    longitude: number | null | void,
    latitude: number | null | void
  };
}

/** 'CreateStoreAddress' return type */
export interface ICreateStoreAddressResult {
  created_at: Date;
  id: string;
  latitude: number;
  longitude: number;
  street: string;
  updated_at: Date;
}

/** 'CreateStoreAddress' query type */
export interface ICreateStoreAddressQuery {
  params: ICreateStoreAddressParams;
  result: ICreateStoreAddressResult;
}

const createStoreAddressIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"street","required":false},{"name":"longitude","required":false},{"name":"latitude","required":false}]},"locs":[{"a":57,"b":64}]}],"statement":"INSERT INTO address (street, longitude, latitude)\nVALUES :address\nRETURNING id, street, longitude, latitude, created_at, updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO address (street, longitude, latitude)
 * VALUES :address
 * RETURNING id, street, longitude, latitude, created_at, updated_at
 * ```
 */
export const createStoreAddress = new PreparedQuery<ICreateStoreAddressParams,ICreateStoreAddressResult>(createStoreAddressIR);


/** 'CreateUserAddress' parameters type */
export interface ICreateUserAddressParams {
  address: {
    street: string | null | void,
    longitude: number | null | void,
    latitude: number | null | void,
    user_id: string | null | void
  };
}

/** 'CreateUserAddress' return type */
export interface ICreateUserAddressResult {
  created_at: Date;
  id: string;
  latitude: number;
  longitude: number;
  street: string;
  updated_at: Date;
  user_id: string | null;
}

/** 'CreateUserAddress' query type */
export interface ICreateUserAddressQuery {
  params: ICreateUserAddressParams;
  result: ICreateUserAddressResult;
}

const createUserAddressIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"street","required":false},{"name":"longitude","required":false},{"name":"latitude","required":false},{"name":"user_id","required":false}]},"locs":[{"a":66,"b":73}]}],"statement":"INSERT INTO address (street, longitude, latitude, user_id)\nVALUES :address\nRETURNING id, street, longitude, latitude, user_id, created_at, updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO address (street, longitude, latitude, user_id)
 * VALUES :address
 * RETURNING id, street, longitude, latitude, user_id, created_at, updated_at
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
  latitude: number;
  longitude: number;
  street: string;
  updated_at: Date;
  user_id: string | null;
}

/** 'GetAddressById' query type */
export interface IGetAddressByIdQuery {
  params: IGetAddressByIdParams;
  result: IGetAddressByIdResult;
}

const getAddressByIdIR: any = {"usedParamSet":{"id":true,"user_id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":102}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":122,"b":129}]}],"statement":"SELECT id, street, longitude, latitude, user_id, created_at, updated_at\nFROM address\nWHERE\n    id = :id\n    AND user_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, street, longitude, latitude, user_id, created_at, updated_at
 * FROM address
 * WHERE
 *     id = :id
 *     AND user_id = :user_id
 * ```
 */
export const getAddressById = new PreparedQuery<IGetAddressByIdParams,IGetAddressByIdResult>(getAddressByIdIR);


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
  latitude: number;
  longitude: number;
  street: string;
  updated_at: Date;
  user_id: string | null;
}

/** 'UpdateUserAddressById' query type */
export interface IUpdateUserAddressByIdQuery {
  params: IUpdateUserAddressByIdParams;
  result: IUpdateUserAddressByIdResult;
}

const updateUserAddressByIdIR: any = {"usedParamSet":{"street":true,"longitude":true,"latitude":true,"id":true,"user_id":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":38}]},{"name":"longitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":66}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":92}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":109,"b":111}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":131,"b":138}]}],"statement":"UPDATE address\nSET\n    street = :street,\n    longitude = :longitude,\n    latitude = :latitude\nWHERE\n    id = :id\n    AND user_id = :user_id\nRETURNING id, street, longitude, latitude, user_id, created_at, updated_at"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE address
 * SET
 *     street = :street,
 *     longitude = :longitude,
 *     latitude = :latitude
 * WHERE
 *     id = :id
 *     AND user_id = :user_id
 * RETURNING id, street, longitude, latitude, user_id, created_at, updated_at
 * ```
 */
export const updateUserAddressById = new PreparedQuery<IUpdateUserAddressByIdParams,IUpdateUserAddressByIdResult>(updateUserAddressByIdIR);


