import { UpdateuserComponent } from './user/updateuser/updateuser.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { ListuserComponent } from './user/listuser/listuser.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'home',component:HomeComponent},
{path:'user',component:UserComponent,
children:[
  {path:'',component:ListuserComponent},
  {path:'createuser',component:CreateuserComponent},
  {path:'listuser',component:ListuserComponent},
  {path:'updateuser',component:UpdateuserComponent}
]},
{path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
