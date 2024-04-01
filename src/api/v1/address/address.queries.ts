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


