/** Types generated for queries found in "src/api/v1/upload/upload.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

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


