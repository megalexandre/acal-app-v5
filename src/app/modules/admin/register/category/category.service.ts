import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CategoryCreate, CategoryPageFilter, CategoryTable } from './category.types';

@Injectable()
export class CategoryService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){
    }

    public paginate(filter: CategoryPageFilter): Observable<CategoryTable>{
 
        const params = this.convertToHttpParams(filter);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._httpClient.get<CategoryTable>(`${environment.baseurl}/category/paginate`, { headers, params }  ).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );

    }

    public create(categoryCreate: CategoryCreate): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
        return this._httpClient.post<CategoryCreate>(
          `${environment.baseurl}/category`,
          categoryCreate,
          { headers }
        );
      }

    private convertToHttpParams(filter: CategoryPageFilter): HttpParams {
        let params = new HttpParams();
        for (const key in filter) {
            if (filter.hasOwnProperty(key) && filter[key] !== undefined) {
                params = params.append(key, filter[key]);
            }
        }
        return params;
    }

    
}
