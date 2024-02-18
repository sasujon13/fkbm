import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { OrderComponent } from './component/order/order.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoiceComponent } from './component/choice/choice.component';
import { AuthComponent } from './component/auth/auth.component';
import { LoginComponent } from './component/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminComponent } from './component/admin/admin.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MyorderComponent } from './component/myorder/myorder.component';
import { PasswordComponent } from './component/password/password.component';
import { IndexComponent } from './component/index/index.component';
import { AcademicComponent } from './component/academic/academic.component';
import { ResultComponent } from './component/result/result.component';
import { NoticeComponent } from './component/notice/notice.component';
import { AwardComponent } from './component/award/award.component';
import { AdmissionComponent } from './component/admission/admission.component';
import { CampusComponent } from './component/campus/campus.component';
import { DownloadComponent } from './component/download/download.component';
import { TeachersComponent } from './component/academic/teachers/teachers.component';
import { StaffComponent } from './component/academic/staff/staff.component';
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
import { AdministrativeComponent } from './component/campus/administrative/administrative.component';
import { ArtsComponent } from './component/campus/arts/arts.component';
import { ArahimComponent } from './component/campus/arahim/arahim.component';
import { BbaComponent } from './component/campus/bba/bba.component';
import { ScienceComponent } from './component/campus/science/science.component';
import { HallRoomComponent } from './component/campus/hall-room/hall-room.component';
import { MujibCornerComponent } from './component/campus/mujib-corner/mujib-corner.component';
import { LibraryComponent } from './component/campus/library/library.component';
import { GardensComponent } from './component/campus/gardens/gardens.component';
import { OthersComponent } from './component/campus/others/others.component';
import { HscComponent } from './component/admission/hsc/hsc.component';
import { HscBMComponent } from './component/admission/hsc-bm/hsc-bm.component';
import { DegreeComponent } from './component/admission/degree/degree.component';
import { HonoursComponent } from './component/admission/honours/honours.component';
import { AgricultureComponent } from './component/admission/agriculture/agriculture.component';
import { OpenUniversityComponent } from './component/admission/open-university/open-university.component';
import { HscBmComponent } from './component/academic/hsc-bm/hsc-bm.component';
import { CoCurricularComponent } from './component/academic/co-curricular/co-curricular.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ContactUsComponent,
    AboutUsComponent,
    FaqsComponent,
    OrderComponent,
    ProductsComponent,
    ChoiceComponent,
    FilterPipe,
    AuthComponent,
    LoginComponent,
    AdminComponent,
    ProfileComponent,
    MyorderComponent,
    PasswordComponent,
    IndexComponent,
    AcademicComponent,
    ResultComponent,
    NoticeComponent,
    AwardComponent,
    AdmissionComponent,
    CampusComponent,
    DownloadComponent,
    TeachersComponent,
    StaffComponent,
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
    AdministrativeComponent,
    ArtsComponent,
    ArahimComponent,
    BbaComponent,
    ScienceComponent,
    HallRoomComponent,
    MujibCornerComponent,
    LibraryComponent,
    GardensComponent,
    OthersComponent,
    HscComponent,
    HscBMComponent,
    DegreeComponent,
    HonoursComponent,
    AgricultureComponent,
    OpenUniversityComponent,
    HscBmComponent,
    CoCurricularComponent,
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
