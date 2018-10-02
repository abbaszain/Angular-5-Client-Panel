import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AddClientComponent } from '../components/add-client/add-client.component';
import { EditClientComponent } from '../components/edit-client/edit-client.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ClientdetailsComponent } from '../components/clientdetails/clientdetails.component';
import { AuthGuard } from '../guards/auth.guard';
import { SettingsGuard } from '../guards/settings.guard';

const routes: Routes=[
  {path: '', redirectTo:'dashboard', pathMatch:'full' },
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component: RegisterComponent, canActivate:[SettingsGuard]},
  {path:'clients/add', component: AddClientComponent, canActivate: [AuthGuard]},
  {path:'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  {path:'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientdetailsComponent, canActivate: [AuthGuard]},
  {path:'**', component: NotFoundComponent}
]
@NgModule({
  exports:[
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard,SettingsGuard]
})
export class AppRoutingModule { }
