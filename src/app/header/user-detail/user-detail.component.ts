import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/login/login.service';
import { User } from '../../security/login/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styles: ['./user-detail.components.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this.loginService.user;
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  login(): void {
    this.loginService.handleLogin();
  }

  logout(): void {
    this.loginService.logout();
  }
}
