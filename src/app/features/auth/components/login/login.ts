import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private _FormBuilder = inject(FormBuilder);

  loginForm:FormGroup = this._FormBuilder.group({
      email:[null , [Validators.required , Validators.email]],
      password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    } )

}
