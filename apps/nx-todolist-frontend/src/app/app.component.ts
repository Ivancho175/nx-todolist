import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-todolist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nx-todolist-frontend';
  public displayMenu = false;

  constructor(private router: Router) {}

  public logout() {
    localStorage.removeItem('nx-todolist-token');
    this.displayMenu = false;
    this.router.navigate(['home']);
  }

  public toggleMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
