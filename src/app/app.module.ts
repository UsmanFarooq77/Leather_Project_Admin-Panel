import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgPipesModule } from 'ngx-pipes';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdminModule } from './admin/admin.module';
import { ComponentsModule } from './components/components.module';
import { AdminserviceService } from './services/adminservice.service';
import { AuthService } from './components/auth.service';
import { GuardsGuard } from './auth-guard/guards.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    BrowserAnimationsModule
  ],
  providers: [AdminserviceService, AuthService, GuardsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
