import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, Validators } from '@angular/forms';
import { Help } from 'src/app/help/Help';
import { FormInput, FormInputType } from '../form-input';
import { FormGroupTypeInputOptions, FormInputService } from '../form-input.service';
import { FormInputOptions } from './FormInputOptions';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})

export class FormInputComponent implements OnInit {
  typeInputOptions!: FormGroupTypeInputOptions;
  @Input() name!: string;
  control!: FormInput;
  @Input() onBlur!: any; //TODO why is this any, fix it
  @Input() text = '';
  @Input() hint?: string;
  @Input() showErrors = false;
  @Input() help!: Help;
  @Input() options!: FormInputOptions;

  inputId = '';
  constructor(private controlContainer: FormGroupDirective, private formInputService: FormInputService) {
  }

  //TODO why is this any fix it
  modelChange = (value: any) => {

    // This prevented a nasty but that is you tried to type over the max (9999)
    // it would not re-set the contorl value and the control would remain
    // set to the previous value. This is due to the numeric directiv
    const numericValue = this.control.valueNumeric();
    if (value !== '' && numericValue !== 0 && numericValue !== parseFloat(value)) {
      this.control.setValue(value);
    }
  };

  ngOnInit(): void {

    if (!this.help) {
      //This means you have not put a help attribute on the form-input, DO SO!!
      // eslint-disable-next-line no-console      
      console.log('WARNING:******', this.name, ':has no help (icons, tooltip,etc).');
    }

    this.control = this.controlContainer.control.controls[this.name] as FormInput;
    if (this.control) {
      this.typeInputOptions = this.formInputService.getFormGroupTypeInputOptions(this.control.type)!;
    }
    else {
      this.typeInputOptions = this.formInputService.getFormGroupTypeInputOptions(FormInputType.None)!;
      this.control = new FormInput();
    }

    if (this.control.isAddValidators) {

      if (this.typeInputOptions.min > 0) {
        this.control.setValidators([Validators.min(this.typeInputOptions.min),
        Validators.max(this.typeInputOptions.max), Validators.required]);
      }
      else {
        this.control.setValidators([Validators.min(this.typeInputOptions.min), Validators.max(this.typeInputOptions.max)]);
      }
    }

    this.control.updateValueAndValidity();

    if (this.control.type !== FormInputType.None) {
      this.setFromType();
    }
  }

  setFromType = () => {

    this.options = ({} as any);
    this.options.min = this.typeInputOptions.min;
    this.options.max = this.typeInputOptions.max;
    this.inputId = this.typeInputOptions.name;
    this.options.showLabel = this.typeInputOptions.showLabel;
    this.options.labelText = this.typeInputOptions.text;
    this.options.labelId = this.typeInputOptions.name + '-label';
    this.options.labelFor = this.typeInputOptions.name;
    this.options.labelTitle = this.typeInputOptions.title;
    this.options.inputFormControlName = this.typeInputOptions.name;

    this.options.placeholder = this.typeInputOptions.placeholder ?
      this.typeInputOptions.placeholder : this.typeInputOptions.text;

    this.options.errorMessage = this.typeInputOptions.min.toString() + ' to ' + this.typeInputOptions.max.toString();
    // Can you derive this
    if (this.typeInputOptions.decimals > 0) {

      this.options.maxlength = this.typeInputOptions.max.toString().length + this.typeInputOptions.decimals + 1;
    }
    else {
      this.options.maxlength = this.typeInputOptions.max.toString().length;
    }

    this.options.decimals = this.typeInputOptions.decimals;
  };

  blurHandler = () => {
    if (this.onBlur) {
      this.onBlur();
    }
  };

  isInvalid = (): boolean => {
    return (this.control.touched && this.control.invalid) || (this.control.invalid && this.showErrors);
  };

  errrorMessageToDisplay = (): string => {
    return this.control.errorMessage === '' ? this.options.errorMessage :
      this.control.errorMessage;
  };
}
