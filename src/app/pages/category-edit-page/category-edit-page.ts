import { Component, computed, inject, signal } from '@angular/core';
import { CategoriesStore } from '../../store/categories-store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { FormHelper } from '../../helpers/form-helper';

@Component({
  selector: 'app-category-edit-page',
  imports: [ReactiveFormsModule],
  templateUrl: './category-edit-page.html',
  styleUrl: './category-edit-page.scss',
})
export class CategoryEditPage {
  categoriesStore = inject(CategoriesStore);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private readonly id = this.route.snapshot.paramMap.get('id');
  private initialValue = this.categoriesStore.categoryById(this.id ?? '');

  categoryFormGroup = this.formBuilder.group({
    id: [this.initialValue?.id],
    description: [this.initialValue?.description ?? '', Validators.required],
  });
  isFormSubmitted = signal<boolean>(false);
  isAddMode = computed<boolean>(() => !this.id);
  headingPrefix = computed<string>(() => this.isAddMode() ? 'Add' : 'Edit');

  handleSubmit(): void {
      this.isFormSubmitted.set(true);
      console.log(this.categoryFormGroup.valid, this.categoryFormGroup.getRawValue());
      if (this.categoryFormGroup.valid) {       
        const formValues = this.categoryFormGroup.getRawValue();
        const category: Category = {
          id: formValues.id ?? '',
          description: formValues.description ?? ''
        }
        if (!category.id) {
          this.categoriesStore.addCategory(category);
        } else {
          this.categoriesStore.updateCategory(category);   
        }
        this.router.navigate(['/categories']);
      }
    }
  
    handleCancel(): void {
      this.router.navigate(['/categories']);
    }
  
    handleDelete(): void {
      if (confirm("Are you sure you want to remove this category?")) {
        this.categoriesStore.removeCategory(this.categoryFormGroup.get('id')?.value ?? '');
        this.router.navigate(['/categories']);
      }
    }

    hasError(controlName: string): boolean {
      return FormHelper.hasError(controlName, this.categoryFormGroup, this.isFormSubmitted());
    }
}
