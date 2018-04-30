import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationsService } from '../../shared/messages/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  navigateTo: string;

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService, 
              private notifier: NotificationsService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [
        Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
    this.navigateTo = this.route.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(user => {
            console.log(user);
            this.notifier.notify("Bem-vindo, " + user.name);
        }, error => {
          this.notifier.notify(error.error.message);
        }, () => {
          this.router.navigate([atob(this.navigateTo)]);
        });
  }
}
