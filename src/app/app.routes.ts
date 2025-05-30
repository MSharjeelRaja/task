import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployerComponent } from './employer/employer.component';
import { EmployeeformComponent } from './employeeform/employeeform.component';
import { EmployerformComponent } from './employerform/employerform.component';

export const routes: Routes = [


  { path: '', redirectTo: '/Employee', pathMatch: 'full' },
{path: 'Employee', component:EmployeeComponent},
{path: 'Employeeform/:id', component:EmployeeformComponent},
{path: 'Employer', component:EmployerComponent},
{path: 'Employerform/:id', component:EmployerformComponent},
{path: 'EmployerForm', component:EmployerformComponent},
{path: 'EmployeeForm', component:EmployeeformComponent},
];
