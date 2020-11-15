import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: []
})
export class AuthModule  {

}