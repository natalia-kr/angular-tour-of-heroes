import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirects a URL that fully matches the empty path to the route whose path is '/dashboard'
  { path: 'detail/:id', component: HeroDetailComponent } //the colon (:) character in the path indicates that :id is a placeholder for a specific hero id
];

@NgModule({ //initializes the router and starts it listening for browser location changes
  imports: [RouterModule.forRoot(routes)], //configures the router at the application's root level
  exports: [RouterModule]
})
export class AppRoutingModule { }