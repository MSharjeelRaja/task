    import { Component, OnInit } from '@angular/core';
    import { MatTableModule } from '@angular/material/table';
    import { MatButtonModule } from '@angular/material/button';
    import { RouterLink, Router } from '@angular/router';

    export interface employerData {
    id: number;
    name: string;
    tel: string;
    email: string;
    select: string;
    }

    @Component({
    selector: 'app-employer',
    imports: [MatTableModule, MatButtonModule, RouterLink],
    templateUrl: './employer.component.html',
    styleUrl: './employer.component.scss',
    })
    export class EmployerComponent {
    displayedColumns: string[] = ['name', 'tel', 'email', 'select', 'Actions'];
    dataSource: employerData[] = [];

    constructor(private router: Router) {}

    ngOnInit() {
        this.loademployerData();
    }

    loademployerData() {
        const employerData = localStorage.getItem('employer');

        if (employerData) {

            const parsedData = JSON.parse(employerData);
            console.log('data  ' + employerData);
            this.dataSource =  parsedData;

        }
    }

    editemployer(id: number) {
        this.router.navigate([`Employerform/${id}`]);
    }

    deleteemployer(employer: employerData) {
        this.dataSource = this.dataSource.filter((e) => e !== employer);

        localStorage.setItem('employer', JSON.stringify(this.dataSource));
    }
    }
