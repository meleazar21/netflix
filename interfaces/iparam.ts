import { ParsedUrlQuery } from 'querystring';

export interface IParam extends ParsedUrlQuery {
    slug: string;
}
