import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  @Input() inputCategories: Category[]; // input variable
  constructor(private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService) {
    if (this.route.snapshot.data.categories) {
      this.categories = this.route.snapshot.data.categories;
    }
  }

  ngOnInit(): void {
  }

  viewCategoryDetails(category: Category): any {
    this.router.navigate(['/categories', category.id], {
      queryParams: {
        Name: category.name
      }
    });
  }

}
