import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{
  hide: boolean = true;
  form = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router,  private toast: NgToastService) {}

  onSubmit(loginForm: NgForm) {
    this.authService.logIn(loginForm.value)
      .pipe(tap(
        (res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['navigate/home']);
          this.toast.success({detail:"SUCCESS",summary:"You're logged in",duration: 2500})
        },
        (error) => {
          this.toast.error({detail:"ERROR",summary:"Email or password incorrect.",duration: 2500})
        }
      )).subscribe();
  }
}
