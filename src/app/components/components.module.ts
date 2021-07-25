import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';
import {NgxPaginationModule} from 'ngx-pagination'
import {NgPipesModule} from 'ngx-pipes';
import { LoginComponent } from './login/login.component';
import { AdminModule } from '../admin/admin.module';
import { LoaderComponent } from './loader/loader.component';
import { ResultNotFoundComponent } from './result-not-found/result-not-found.component';
@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgPipesModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:
    [LoginComponent,
    LoaderComponent,
    ResultNotFoundComponent],
  declarations: 
    [LoginComponent, LoaderComponent, ResultNotFoundComponent]
})
export class ComponentsModule { }
