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
import { PersonnelComponent } from './component/personnel/personnel.component';
import { DetailsComponent } from './component/details/details.component';
import { NoticeComponent } from './component/notice/notice.component';
import { AdmissionComponent } from './component/admission/admission.component';
import { AdministrationComponent } from './component/administration/administration.component';

const routes: Routes = [
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'academic', component: AcademicComponent},
  {path:'academic/hsc', component: HscComponent},
  {path:'academic/hsc-bm', component: HscBmComponent},
  {path:'academic/degree', component: DegreeComponent},
  {path:'academic/honours', component: HonoursComponent},
  {path:'academic/bba', component: BbaComponent},
  {path:'academic/agriculture', component: AgricultureComponent},
  {path:'academic/open-uiversity', component: OpenUniversityComponent},
  {path:'academic/co-curricular', component: CoCurricularComponent},
  {path:'personnel', component: PersonnelComponent},
  {path:'faqs', component: FaqsComponent},
  {path:'contact_us', component: ContactUsComponent},
  {path:'notice_board', component: NoticeComponent},
  {path:'index', component: IndexComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'admission', component: AdmissionComponent},
  {path: 'administration', component: AdministrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor() {}
}

