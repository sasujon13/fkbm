import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { IndexComponent } from './component/index/index.component';
import { AcademicComponent } from './component/academic/academic.component';
import { PersonnelComponent } from './component/personnel/personnel.component';
import { DetailsComponent } from './component/details/details.component';
import { NoticeComponent } from './component/notice/notice.component';
import { AdmissionComponent } from './component/admission/admission.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { DjangoComponent } from './component/django/django.component';

const routes: Routes = [
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'academic', component: AcademicComponent},
  {path:'personnel', component: PersonnelComponent},
  {path:'faqs', component: FaqsComponent},
  {path:'contact_us', component: ContactUsComponent},
  {path:'notice_board', component: NoticeComponent},
  {path:'index', component: IndexComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'admission', component: AdmissionComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: 'admin', component: DjangoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor() {}
}

