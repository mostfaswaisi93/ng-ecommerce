import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<Category[]>{

  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoryService.getCategories();
  }
}
