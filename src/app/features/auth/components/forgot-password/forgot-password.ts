import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  private _FormBuilder = inject(FormBuilder);
  private _Auth = inject(Auth);

  step:number = 1;

  verifyEmail:FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required , Validators.email]]
  })

  verifyCode:FormGroup = this._FormBuilder.group({
    resetCode:[null, [Validators.required , Validators.pattern( /^[0-9]{6}$/ )]]
  })

  resetPassword:FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required , Validators.email]],
    newPassword:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],

  })

   verifyEmailSubmit():void{

      let emailValue = this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue);

      this._Auth.setEmailVerify(this.verifyEmail.value).subscribe({
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
      this._Auth.setCodeVerify(this.verifyCode.value).subscribe({
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
      this._Auth.setResetPass(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res);

          if(res.message === "success"){
          localStorage.setItem('userToken' , res.token);
          this._Auth.saveUserData();
          // this._Router.navigate(['/home'])

          }

        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

}
