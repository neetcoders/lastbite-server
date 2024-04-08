/** Types generated for queries found in "src/api/v1/upload/upload.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetStoreUploadOwner' parameters type */
export interface IGetStoreUploadOwnerParams {
  id?: string | null | void;
}

/** 'GetStoreUploadOwner' return type */
export interface IGetStoreUploadOwnerResult {
  store_id: string | null;
}

/** 'GetStoreUploadOwner' query type */
export interface IGetStoreUploadOwnerQuery {
  params: IGetStoreUploadOwnerParams;
  result: IGetStoreUploadOwnerResult;
}

const getStoreUploadOwnerIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":41}]}],"statement":"SELECT store_id FROM upload\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT store_id FROM upload
 * WHERE id = :id
 * ```
 */
export const getStoreUploadOwner = new PreparedQuery<IGetStoreUploadOwnerParams,IGetStoreUploadOwnerResult>(getStoreUploadOwnerIR);


/** 'CreateStoreUpload' parameters type */
export interface ICreateStoreUploadParams {
  upload: {
    id: string | null | void,
    ext: string | null | void,
    store_id: string | null | void
  };
}

/** 'CreateStoreUpload' return type */
export interface ICreateStoreUploadResult {
  id: string;
}

/** 'CreateStoreUpload' query type */
export interface ICreateStoreUploadQuery {
  params: ICreateStoreUploadParams;
  result: ICreateStoreUploadResult;
}

const createStoreUploadIR: any = {"usedParamSet":{"upload":true},"params":[{"name":"upload","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"id","required":false},{"name":"ext","required":false},{"name":"store_id","required":false}]},"locs":[{"a":46,"b":52}]}],"statement":"INSERT INTO upload (id, ext, store_id)\nVALUES :upload\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO upload (id, ext, store_id)
 * VALUES :upload
 * RETURNING id
 * ```
 */
export const createStoreUpload = new PreparedQuery<ICreateStoreUploadParams,ICreateStoreUploadResult>(createStoreUploadIR);


/** 'RemoveStoreUpload' parameters type */
export interface IRemoveStoreUploadParams {
  id?: string | null | void;
  store_id?: string | null | void;
}

/** 'RemoveStoreUpload' return type */
export interface IRemoveStoreUploadResult {
  ext: string;
  id: string;
}

/** 'RemoveStoreUpload' query type */
export interface IRemoveStoreUploadQuery {
  params: IRemoveStoreUploadParams;
  result: IRemoveStoreUploadResult;
}

const removeStoreUploadIR: any = {"usedParamSet":{"id":true,"store_id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":37}]},{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":58,"b":66}]}],"statement":"DELETE FROM upload\nWHERE \n    id = :id\n    AND store_id = :store_id\n    AND store_id IS NOT NULL\nRETURNING id, ext"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM upload
 * WHERE 
 *     id = :id
 *     AND store_id = :store_id
 *     AND store_id IS NOT NULL
 * RETURNING id, ext
 * ```
 */
export const removeStoreUpload = new PreparedQuery<IRemoveStoreUploadParams,IRemoveStoreUploadResult>(removeStoreUploadIR);


