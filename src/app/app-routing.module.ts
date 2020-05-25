import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'coordinator',component:CoordinatorComponent},
  {path:'student',component:StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
