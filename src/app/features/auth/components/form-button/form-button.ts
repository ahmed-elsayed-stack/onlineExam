import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      class="btn btn-primary w-100 py-2 rounded-md flex items-center justify-center gap-2"
    >
      <!-- النص -->
        {{ label }}

      <!-- لو في أي محتوى جاي من بره (icon مثلا) -->
      <ng-content></ng-content>

    </button>
  `,
})
export class FormButtonComponent {
  @Input() label = '';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() disabled = false;
}
