import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Authentication } from '../../../../../../projects/auth/src/lib/authentication';
import { FormButtonComponent } from '../../components/form-button/form-button';
import { InputErrorComponent } from '../../components/input-error/input-error';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, RouterLink, FormButtonComponent, InputErrorComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private _FormBuilder = inject(FormBuilder);
  private _Authentication = inject(Authentication);
  private _Router = inject(Router);

  registerForm:FormGroup = this._FormBuilder.group({
      username:[null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
      firstName:[null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
      lastName:[null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
      email:[null , [Validators.required , Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword:[null , ],
      phone: [null, [ Validators.required, Validators.pattern(/^\d+$/),Validators.maxLength(11)]],
    } , {validators:this.confirmPassword})


  confirmPassword(g:AbstractControl){
        if(g.get('password')?.value === g.get('rePassword')?.value){
          return null
        }else{
          return {mismatch:true}
        }
    }

      registerSubmit(){
        if(this.registerForm.valid){
         this._Authentication.register(this.registerForm.value).subscribe(res=>{
        console.log(res)

          if( res.message == "success"){

              setTimeout(() => {
                this._Router.navigate(['/login'])
              }, 2000);

            }

      })
        }else{
           this.registerForm.setErrors({mismatch:true});
           this.registerForm.markAllAsTouched();
        }


    }


}
