/** Types generated for queries found in "src/api/v1/category/category.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetCategoryIdBySlug' parameters type */
export interface IGetCategoryIdBySlugParams {
  slug?: string | null | void;
}

/** 'GetCategoryIdBySlug' return type */
export interface IGetCategoryIdBySlugResult {
  id: string;
}

/** 'GetCategoryIdBySlug' query type */
export interface IGetCategoryIdBySlugQuery {
  params: IGetCategoryIdBySlugParams;
  result: IGetCategoryIdBySlugResult;
}

const getCategoryIdBySlugIR: any = {"usedParamSet":{"slug":true},"params":[{"name":"slug","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":41}]}],"statement":"SELECT id\nFROM category\nWHERE slug = :slug"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id
 * FROM category
 * WHERE slug = :slug
 * ```
 */
export const getCategoryIdBySlug = new PreparedQuery<IGetCategoryIdBySlugParams,IGetCategoryIdBySlugResult>(getCategoryIdBySlugIR);


