import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Authentication } from '../../../../../../projects/auth/src/lib/authentication';
import { CommonModule, NgClass } from '@angular/common';
import { FormButtonComponent } from '../../components/form-button/form-button';
import { InputErrorComponent } from '../../components/input-error/input-error';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, FormButtonComponent, InputErrorComponent, NgClass, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  private _FormBuilder = inject(FormBuilder);
  private _Authentication = inject(Authentication);
  private _Router = inject(Router);

  step:number = 1;

  verifyEmail:FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required , Validators.email]]
  })

  verifyCode:FormGroup = this._FormBuilder.group({
    resetCode:[null, [Validators.required , Validators.pattern( /^[0-9]{6}$/ )]]
  })

  resetPassword:FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required , Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],


  })

   verifyEmailSubmit():void{

      let emailValue = this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue);

      this._Authentication.forgotPassword(this.verifyEmail.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message == "success"){
            this.step = 2;
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

     verifyCodeSubmit():void{
      this._Authentication.verifyResetcode(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status == "Success"){
            this.step = 3;
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }


     resetPasswordSubmit():void{
      this._Authentication.resetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res);

          if(res.message === "success"){
          localStorage.setItem('userToken' , res.token);
          this._Authentication.saveUserData();
          this._Router.navigate(['/blank'])

          }

        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

}
