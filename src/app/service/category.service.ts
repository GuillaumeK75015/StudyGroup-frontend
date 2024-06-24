import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Category } from "../data/category";
import { Observable } from "rxjs";
import { environement } from "../../environements/environement";

@Injectable()
export class CategoryService {
    private categoriesURL = `${environement.apiUrl}v1/categories`

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesURL);
    }
}