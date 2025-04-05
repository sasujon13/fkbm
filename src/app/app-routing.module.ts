import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { Router } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { AcademicComponent } from './component/academic/academic.component';
import { HscComponent } from './component/academic/hsc/hsc.component';
import { HscBmComponent } from './component/academic/hsc-bm/hsc-bm.component';
import { DegreeComponent } from './component/academic/degree/degree.component';
import { HonoursComponent } from './component/academic/honours/honours.component';
import { BbaComponent } from './component/academic/bba/bba.component';
import { AgricultureComponent } from './component/academic/agriculture/agriculture.component';
import { OpenUniversityComponent } from './component/academic/open-university/open-university.component';
import { CoCurricularComponent } from './component/academic/co-curricular/co-curricular.component';
import { StaffComponent } from './component/academic/staff/staff.component';
import { TeachersComponent } from './component/academic/teachers/teachers.component';
import { DetailsComponent } from './component/details/details.component';
import { AdmissionComponent } from './component/admission/admission.component';
import { AdministrationComponent } from './component/administration/administration.component';

const routes: Routes = [
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'academic', component: IndexComponent},
  {path:'academic/hsc', component: HscComponent},
  {path:'academic/hsc-bm', component: HscBmComponent},
  {path:'academic/degree', component: DegreeComponent},
  {path:'academic/honours', component: HonoursComponent},
  {path:'academic/bba', component: BbaComponent},
  {path:'academic/agriculture', component: AgricultureComponent},
  {path:'academic/open-uiversity', component: OpenUniversityComponent},
  {path:'academic/co-curricular', component: CoCurricularComponent},
  {path:'academic/teachers', component: TeachersComponent},
  {path:'academic/staff', component: StaffComponent},
  {path:'faqs', component: IndexComponent},
  {path:'about-us', component: IndexComponent},
  {path:'contact-us', component: IndexComponent},
  {path:'choice', component: IndexComponent},
  {path:'cart', component: IndexComponent},
  {path:'index', component: IndexComponent},
  {path:'auth/login', redirectTo:'login',pathMatch:'full'},
  {path:'login/auth', redirectTo:'auth',pathMatch:'full'},
  {path: 'details', component: IndexComponent},
  { path: 'admission', component: AdmissionComponent },
  { path: 'administration', component: AdministrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor() {}
}

