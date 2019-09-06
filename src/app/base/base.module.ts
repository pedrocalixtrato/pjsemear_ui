import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseSharedModule} from './base-shared/base-shared.module.';
import {InputComponent} from './base-shared/forms/input/input.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    InputComponent],
  exports: [
    InputComponent
  ],
  imports: [
    CommonModule,
    BaseSharedModule,
    ReactiveFormsModule,
  ],
})
export class BaseModule { }
