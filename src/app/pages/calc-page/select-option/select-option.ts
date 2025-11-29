import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-select-option',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './select-option.html',
  styleUrl: './select-option.scss'
})
export class SelectOption {
  @Input() option!: string[];
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() selectName!: string;

}
