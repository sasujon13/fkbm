import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexComponent } from './component/index/index.component';
import { AcademicComponent } from './component/academic/academic.component';
import { NoticeComponent } from './component/notice/notice.component';
import { AdmissionComponent } from './component/admission/admission.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { DeptComponent } from './component/academic/honours/dept/dept.component';
import { BanglaComponent } from './component/academic/honours/dept/bangla/bangla.component';
import { EnglishComponent } from './component/academic/honours/dept/english/english.component';
import { IctComponent } from './component/academic/honours/dept/ict/ict.component';
import { PhysicsComponent } from './component/academic/honours/dept/physics/physics.component';
import { ChemistryComponent } from './component/academic/honours/dept/chemistry/chemistry.component';
import { MathComponent } from './component/academic/honours/dept/math/math.component';
import { BiologyComponent } from './component/academic/honours/dept/biology/biology.component';
import { StatisticsComponent } from './component/academic/honours/dept/statistics/statistics.component';
import { FinanceComponent } from './component/academic/honours/dept/finance/finance.component';
import { ManagementComponent } from './component/academic/honours/dept/management/management.component';
import { AccountingComponent } from './component/academic/honours/dept/accounting/accounting.component';
import { SociologyComponent } from './component/academic/honours/dept/sociology/sociology.component';
import { HistoryComponent } from './component/academic/honours/dept/history/history.component';
import { EconomicsComponent } from './component/academic/honours/dept/economics/economics.component';
import { HscBmComponent } from './component/academic/hsc-bm/hsc-bm.component';
import { CoCurricularComponent } from './component/academic/co-curricular/co-curricular.component';
import { DetailsComponent } from './component/details/details.component';
import { SafeUrlPipe } from './component/header/safe-url.pipe';
import { RoutineComponent } from './component/academic/routine/routine.component';
import { PersonnelComponent } from './component/personnel/personnel.component';
import { DjangoComponent } from './component/django/django.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe,
    AppComponent,
    HeaderComponent,
    IctComponent,
    ContactUsComponent,
    FaqsComponent,
    FilterPipe,
    IndexComponent,
    AcademicComponent,
    NoticeComponent,
    AdmissionComponent,
    AdministrationComponent,
    DeptComponent,
    BanglaComponent,
    EnglishComponent,
    IctComponent,
    PhysicsComponent,
    ChemistryComponent,
    MathComponent,
    BiologyComponent,
    StatisticsComponent,
    FinanceComponent,
    ManagementComponent,
    AccountingComponent,
    SociologyComponent,
    HistoryComponent,
    EconomicsComponent,
    MathComponent,
    FinanceComponent,
    HscBmComponent,
    CoCurricularComponent,
    DetailsComponent,
    RoutineComponent,
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
  ],
  providers: [MatSnackBar,],
  bootstrap: [AppComponent],
})
export class AppModule { }
