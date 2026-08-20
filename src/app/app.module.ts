import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FilterPipe } from './shared/filter.pipe';
import { OrderByPipe } from './shared/orderBy.pipe';
import { hDirective } from './shared/hfilter.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexComponent } from './component/index/index.component';
import { AcademicComponent } from './component/academic/academic.component';
import { NoticeComponent } from './component/notice/notice.component';
import { AdmissionComponent } from './component/admission/admission.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { DetailsComponent } from './component/details/details.component';
import { SafeUrlPipe } from './component/header/safe-url.pipe';
import { PersonnelComponent } from './component/personnel/personnel.component';
import { DjangoComponent } from './component/django/django.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    OrderByPipe,
    AppComponent,
    SafeUrlPipe,
    AppComponent,
    HeaderComponent,
    ContactUsComponent,
    FaqsComponent,
    FilterPipe,
    hDirective,
    IndexComponent,
    AcademicComponent,
    NoticeComponent,
    AdmissionComponent,
    AdministrationComponent,
    DetailsComponent,
    PersonnelComponent,
    DjangoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports: [
    hDirective
  ],
  providers: [MatSnackBar,],
  bootstrap: [AppComponent],
})
export class AppModule { }

