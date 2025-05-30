import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';

export interface EmployeeData {
  id: number;
  name: string;
  tel: string;
  email: string;
  select: string;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'tel', 'email', 'select', 'Actions'];
  dataSource: EmployeeData[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    const employeeData = localStorage.getItem('employee');

    if (employeeData) {
      const parsedData = JSON.parse(employeeData);
      console.log('data  ' + employeeData);
      this.dataSource = parsedData;
    }
  }

  editEmployee(id: number) {
    this.router.navigate([`/Employeeform/${id}`]);
  }

  deleteEmployee(employee: EmployeeData) {
    this.dataSource = this.dataSource.filter((e) => e !== employee);

    localStorage.setItem('employee', JSON.stringify(this.dataSource));
  }
}
