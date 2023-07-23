import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '@nx-todolist/frontend/core.service';
import { Observable } from 'rxjs';
let darkMode = localStorage.getItem('darkMode');

@Component({
  selector: 'nx-todolist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'nx-todolist-frontend';
  public displayMenu = false;
  public hideHamburguer: Observable<boolean>;
  public darkMode = false;

  constructor(private router: Router, private coreService: CoreService) {
    this.hideHamburguer = this.coreService.IsLandingPage;
    if (darkMode === 'enabled') {
      this.enableDarkMode();
    }
  }

  public logout() {
    localStorage.removeItem('nx-todolist-token');
    this.displayMenu = false;
    this.router.navigate(['home']);
  }

  public toggleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  public toggleDarkMode() {
    this.darkMode = !this.darkMode;
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  private enableDarkMode() {
    localStorage.setItem('darkMode', 'enabled');
    document.body.classList.add('darkMode');
  }

  private disableDarkMode() {
    localStorage.setItem('darkMode', 'disabled');
    document.body.classList.remove('darkMode');
  }
}
