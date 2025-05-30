import { Component, ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

export interface EmployeeData {
  id: number;
  name: string;
  tel: string;
  email: string;
  select: string;
}

@Component({
  selector: 'app-employeeform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgIf,
  ],

  templateUrl: './employeeform.component.html',
  styleUrl: './employeeform.component.scss',
})
export class EmployeeformComponent {
  form: FormGroup;
  editId: number | null = null;
  isEditMode: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      select: new FormControl('', Validators.required),
      tel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = Number(id);
        console.log('Edit mode: Loading employee with id:', this.editId);
        this.loadEmployeeData(this.editId);
      } else {
        this.isEditMode = false;
        console.log('Add mode: No id provided');
      }
    });
  }

  loadEmployeeData(id: number) {
    const storedData = localStorage.getItem('employee');
    if (storedData) {
      try {
        const employees: EmployeeData[] = JSON.parse(storedData);
        const employee = employees.find((e) => e.id === id);
        if (employee) {
          this.form.patchValue(employee);
          console.log('Loaded employee data:', employee);
        } else {
          console.error('Employee not found with id:', id);
        }
      } catch (e) {
        console.error('Error parsing employee data:', e);
      }
    } else {
      console.warn('No employee data found in localStorage');
    }
  }
  get email() {
    return this.form.get('email');
  }

  errorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter an email';
    }
    if (this.email?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      let employees: EmployeeData[] = [];
      const storedData = localStorage.getItem('employee');
      if (storedData) {
        try {
          employees = JSON.parse(storedData);
          if (!Array.isArray(employees)) {
            employees = [employees];
          }
        } catch (e) {
          console.error('Error parsing stored employee data:', e);
          employees = [];
        }
      }

      if (this.isEditMode && this.editId !== null) {
        const index = employees.findIndex((e) => e.id === this.editId);
        if (index !== -1) {
          employees[index] = { id: this.editId, ...this.form.value };
          console.log(
            'Updated employee with id:',
            this.editId,
            this.form.value
          );
        } else {
          console.error('Employee not found with id:', this.editId);
          return;
        }
      } else {
        const maxId =
          employees.length > 0 ? Math.max(...employees.map((e) => e.id)) : 0;
        const newId = maxId + 1;
        employees.push({ id: newId, ...this.form.value });
        console.log('Added new employee with id:', newId, this.form.value);
      }

      localStorage.setItem('employee', JSON.stringify(employees));
      console.log('Stored employees:', employees);

      this.form.reset();
      this.router.navigate(['/Employee']);
    }
  }
}
