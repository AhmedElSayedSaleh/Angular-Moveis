import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err: string;

  loginForm = new FormGroup({
    email: new FormControl('podya@podya', [Validators.required, Validators.email]),
    password: new FormControl('PodyaPodya', [Validators.required,
    Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
    /* ^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$ */
  });

  constructor(public _AuthService: AuthService, public _Router: Router) { }

  ngOnInit(): void {
  }

  getFormData(formData): any {
    this._AuthService.logIn(formData.value).subscribe(data => {
      if (data.message === 'success') {
        // console.log(data);
        this._AuthService.saveUserData(data.user, data.token);
        this._Router.navigate(['/home']);
      } else {
        this.err = data.message;
      }
    });

  }

}
