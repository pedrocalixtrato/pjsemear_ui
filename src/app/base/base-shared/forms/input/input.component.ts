import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'sma-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input('type') type = 'text';
  @Input('label') label: string;
  @Input('placeholder') placeholder: string;
  @Input('control') control: FormControl;
  @Input('required') required = false;
  @Input('mensagem') mensagem: string;
  @Input('showErrorOverride') showErrorOverride = false;
  @Input('smaFormGroup') smaFormGroup: FormGroup;
  @Input('name') name: string;
  @Input('validators') validators: ValidatorFn[] = [];

  constructor() { }

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl(null, this.validators);
      this.smaFormGroup.addControl(this.name, this.control);
    }
  }

  get showError() {
    if (this.showErrorOverride) {
      return true;
    } else if (this.control) {
      return !this.control.valid && this.control.touched;
    } else {
      return false;
    }
  }

}
