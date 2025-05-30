import { Component } from '@angular/core';
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

export interface EmployerData {
  id: number;
  name: string;
  tel: string;
  email: string;
  select: string;
}

@Component({
  selector: 'app-employerform',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './employerform.component.html',
  styleUrl: './employerform.component.scss',
})
export class EmployerformComponent {
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

        this.loadEmployerData(this.editId);
      } else {
        this.isEditMode = false;
        console.log('No id');
      }
    });
  }

  loadEmployerData(id: number) {
    const storedData = localStorage.getItem('employer');
    if (storedData) {
      const employers: EmployerData[] = JSON.parse(storedData);
      const employee = employers.find((e) => e.id === id);
      if (employee) {
        this.form.patchValue(employee);
      }
    } else {
      console.warn('No employee');
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
      let employers: EmployerData[] = [];
      const storedData = localStorage.getItem('employer');
      if (storedData) {
        try {
          employers = JSON.parse(storedData);
          if (!Array.isArray(employers)) {
            employers = [employers];
          }
        } catch (e) {
          console.error('Error parsing stored employee data:', e);
          employers = [];
        }
      }

      if (this.isEditMode && this.editId !== null) {
        const index = employers.findIndex((e) => e.id === this.editId);
        if (index !== -1) {
          employers[index] = { id: this.editId, ...this.form.value };
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
          employers.length > 0 ? Math.max(...employers.map((e) => e.id)) : 0;
        const newId = maxId + 1;
        employers.push({ id: newId, ...this.form.value });
        console.log('Added new employee with id:', newId, this.form.value);
      }

      localStorage.setItem('employer', JSON.stringify(employers));
      console.log('Stored employers:', employers);

      this.form.reset();
      this.router.navigate(['/Employer']);
    }
  }
}
