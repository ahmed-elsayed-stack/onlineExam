import { HttpErrorResponse } from '@angular/common/http';
import { Authentication } from './../../../../../../projects/auth/src/lib/authentication';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private _FormBuilder = inject(FormBuilder);
  private _Authentication = inject(Authentication);
  private _Router = inject(Router);

  loginForm:FormGroup = this._FormBuilder.group({
      email:[null , [Validators.required , Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    } )

    loginSubmit(){
      if(this.loginForm.valid){
         this._Authentication.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);

            if( res.message == "success"){

              setTimeout(() => {
                this._Router.navigate(['/blank']);
              }, 3000);

            }
        },
      })
      }else{
        this.loginForm.setErrors({mismatch:true});
        this.loginForm.markAllAsTouched();
      }

    }

}
