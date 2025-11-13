import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgIf } from '@angular/common'; // لازم تضيفه هنا

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [NgIf], // لازم تضيف NgIf عشان *ngIf يشتغل في standalone component
  template: `
    <div *ngIf="control && (control.dirty || control.touched) && control.errors" class="text-danger text-sm mt-1">
      <div *ngIf="control.hasError('required')">{{ label }} is required</div>
      <div *ngIf="control.hasError('email')">Enter a valid {{ label }}</div>
      <div *ngIf="control.hasError('minlength')">
        {{ label }} should be at least {{ control.getError('minlength')?.requiredLength }} chars
      </div>
      <div *ngIf="control.hasError('maxlength')">
        {{ label }} should be at most {{ control.getError('maxlength')?.requiredLength }} chars
      </div>
      <div *ngIf="control.hasError('pattern')">Enter a valid {{ label }}</div>
      <div *ngIf="control.hasError('mismatch')">{{ label }} does not match</div>
    </div>
  `
})
export class InputErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() label: string = '';
}
