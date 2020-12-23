import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  err: string;

  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(90)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
    /* ^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$ */
  });

  constructor(public _AuthService: AuthService, public _Router: Router) { }

  ngOnInit(): void {
  }

  getFormData(formData): any {

    if (formData.valid){
      this._AuthService.signUp(formData.value).subscribe(data => {
        if (data.message === 'success'){
          this._Router.navigate(['/login']);
        }else{
          this.err = data.errors.email.message;
        }
      });
      // console.log(regFormData.value);
    }

  }
}
