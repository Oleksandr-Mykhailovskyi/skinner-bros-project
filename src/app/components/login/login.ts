import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  template: `
    <h2>Вход</h2>
    <form (ngSubmit)="login()">
      <input type="text" [(ngModel)]="identifier" name="identifier" placeholder="Email или Username" required/>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Пароль" required/>
      <button type="submit">Войти</button>
    </form>
  `
})
export class LoginComponent {
  identifier = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.identifier, this.password).subscribe({
      next: () => this.router.navigate(['/template']),
      error: (err) => alert('Ошибка: ' + err.error?.error?.message)
    });
  }
}
