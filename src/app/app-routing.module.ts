import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HeroComponent } from './components/hero/hero.component';
import { ResultsComponent } from './components/results/results.component';
import { CvTemplatesComponent } from './components/cv-templates/cv-templates.component';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'cv-templates', component: CvTemplatesComponent },
  { path: 'jobs', component: JobsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
