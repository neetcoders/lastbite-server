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
  birth_date: Date;
  created_at: Date;
  display_name: string;
  email: string;
  id: string;
  updated_at: Date;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"user":true},"params":[{"name":"user","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"email","required":false},{"name":"display_name","required":false},{"name":"birth_date","required":false},{"name":"user_secret","required":false}]},"locs":[{"a":72,"b":76}]}],"statement":"INSERT INTO users (email, display_name, birth_date, user_secret)\nVALUES :user\nRETURNING id, email, display_name, birth_date, created_at, updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (email, display_name, birth_date, user_secret)
 * VALUES :user
 * RETURNING id, email, display_name, birth_date, created_at, updated_at
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


