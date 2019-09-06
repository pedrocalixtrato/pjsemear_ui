import { Observable, BehaviorSubject } from 'rxjs';

export interface ApiResponseSingle<T> {
    meta?: MetaError;
    content?: T;
}

export interface ApiResponseList<T> {
    meta?: MetaError;
    content?: Array<T>;
    totalElements?: number;
    totalPages?: number;
    last?: boolean;
    numberOfElements?: number;
    first?: boolean;
    size?: number;
    number?: number; // Zero-indexed
}

export interface MetaError {
    error: string;
    message: string;
}

export class ApiRequestQueries {
    sortField?: string;
    sortDirection?: SortDirection;
    pageSize?: number;
    currentPage?: number;
    crossfit?: boolean;

    constructor(params?) {
        if (params) {
            this.sortField = params.sortField;
            this.sortDirection = params.sortDirection;
            this.pageSize = params.pageSize;
            this.currentPage = params.currentPage;
            this.crossfit = params.crossfit;
        }
    }

    /**
     * Obtem um objeto no formato esperado por HttpClient options.params
     */
    getParamsObject(): ParamsObject {
        const result: any = {};
        if (this.pageSize !== undefined) {
            result.size = this.pageSize;
        }
        if (this.crossfit !== undefined) {
            result.corssfit = this.crossfit;
        }
        if (this.currentPage !== undefined) {
            result.page = this.currentPage;
        }
        if (this.sortField !== undefined && this.sortDirection !== undefined) {
            result.sort = `${this.sortField},${this.sortDirection}`;
        }
        return result;
    }
}

interface ParamsObject {
    [params: string]: string | Array<string>;
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}

export type DataStreamArray<T> = BehaviorSubject<Observable<Array<T>>>;
