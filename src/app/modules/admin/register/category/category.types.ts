export interface Category {
    id: string,
    name: string,
    type: string,
    total: number,
    values: {name: string, value: number}[],
}

export interface CategoryTable extends Page<Category> {}


export interface CategoryPageFilter {
    id?: string;
    name?: string;
    type?: string;
    offset?: string;
    size?: string;
    field?: string;
    direction?: Direction;
}


export interface Direction {"asc": "desc"}; 

export interface Page<T>{
    content: T[],

    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    first: boolean,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    empty: boolean
}
