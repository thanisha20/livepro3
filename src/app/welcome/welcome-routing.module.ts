import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ 
  path: '', component: WelcomeComponent,
  children: [
    {
      path:'', component:HomeComponent
    }
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
