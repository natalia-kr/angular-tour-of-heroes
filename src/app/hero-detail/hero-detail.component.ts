import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    this.route.paramMap.pipe( //when the id in the url changes, the Observable of paramMap emits a new item...
      map(m => m.get('id')),
      tap(id => console.log('The id of the hero: ', id)),
      switchMap(id => this.heroService.getHero(Number(id)))
    ).subscribe(hero => this.hero = hero);
    // const id = Number(this.route.snapshot.paramMap.get('id')); //route.snapshot is a static image of the route information shortly after the component was created
    // this.heroService.getHero(id)
    //   .subscribe(hero => this.hero = hero);
  }
  
  public navigateToOther(): void {
    this.router.navigate(['/detail/15']);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
          this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
  }
}
