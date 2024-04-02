import { CdkScrollable } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../category.service';
import { CategoryCreate, CategoryType } from '../category.types';

const imports = [
    CdkScrollable,
    CommonModule,
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRippleModule,
    MatTableModule,
    MatSelectModule,
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TextFieldModule,
];


@Component({
    selector        : 'category-add',
    templateUrl     : './category-add.component.html',
    standalone      : true,
    styleUrls       : ['./category-add.component.scss'], 
    imports         : [ ...imports ],
    providers       : [ CategoryService ]
})
export class CategoryAddComponent {

    form: FormGroup;
    sending: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        
        ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            type: [null, [Validators.required]],
            waterValue: [null, [Validators.required]],
            categoryValue: [null, [Validators.required]],
        });
    }

    onSubmit() {
        
        if (this.form.invalid && !this.sending) {
            return;
        }

        this.sending = true;
        this._categoryService.create({
            name: this.name,
            type: this.type,
            values: [
                {name: "Water",     value: this.waterValue},
                {name: "partnership",  value: this.categoryValue}
            ]
        }).subscribe({
            
            next: () => { 
                this._router.navigate(['../list'], { relativeTo: this._activatedRoute }); 
            },
            
            error: (error: any) => { 
                console.log(error.error.message);
            },

            complete: () => {
                this.sending = false;
            },

        })

    }

    get name(): string {
        return this.form.get('name').value;
    }

    get type(): CategoryType {
        return this.form.get('type').value;
    }

    get waterValue(): number {
        return  this.form.get('waterValue').value;
    }

    get  categoryValue(): number {
        return this.form.get('categoryValue').value;
    }

}