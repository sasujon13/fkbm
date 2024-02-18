import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { OrderComponent } from './component/order/order.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { ChoiceComponent } from './component/choice/choice.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './service/authgard.service';
import { Router } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { AdminComponent } from './component/admin/admin.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MyorderComponent } from './component/myorder/myorder.component';
import { PasswordComponent } from './component/password/password.component';
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
  {path:'academic/teachers', component: TeachersComponent},
  {path:'academic/staff', component: StaffComponent},
  {path:'faqs', component: FaqsComponent},
  {path:'about-us', component: AboutUsComponent},
  {path:'contact-us', component: ContactUsComponent},
  {path:'choice', component: ChoiceComponent},
  {path:'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path:'cart', component: CartComponent},
  {path:'index', component: IndexComponent},
  {path:'login', component: LoginComponent},
  {path:'auth', component: AuthComponent},
  {path:'auth/login', redirectTo:'login',pathMatch:'full'},
  {path:'login/auth', redirectTo:'auth',pathMatch:'full'},
  {path: 'admin', component: AdminComponent},
  {path: 'myorder', component: MyorderComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'password', component: PasswordComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor() {}
}

