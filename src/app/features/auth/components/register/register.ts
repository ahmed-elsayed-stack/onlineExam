import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private _FormBuilder = inject(FormBuilder);

  registerForm:FormGroup = this._FormBuilder.group({
      username:[null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
      firstName:[null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
      lastName:[null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
      email:[null , [Validators.required , Validators.email]],
      password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
      rePassword:[null , ],
      phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
    } , {validators:this.confirmPassword})


  confirmPassword(g:AbstractControl){
        if(g.get('password')?.value === g.get('rePassword')?.value){
          return null
        }else{
          return {mismatch:true}
        }
    }


}
