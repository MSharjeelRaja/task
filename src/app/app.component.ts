import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    NgIf,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showFiller = false;
  loader = false;
  title = 'hi';
  srcopen: string = '/assets/icons8-menu-50.png';
  srcclose: string = '/assets/icons8-close-50.png';
  togglebtn = false;

  constructor(private router: Router) {}
  toggle() {
    this.togglebtn = !this.togglebtn;
  }
  showLoader(opt: string) {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      if (opt == 'employee') this.router.navigate(['Employee']);
      else this.router.navigate(['Employer']);
    }, 1000);
  }
}
