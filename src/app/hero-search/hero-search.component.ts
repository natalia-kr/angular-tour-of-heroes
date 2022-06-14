import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>; //$ is a convention that indicates heroes$ is an Observable, not an array
  private searchTerms = new Subject<string>(); //A Subject is both a source of observable values and an Observable

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term); //next(value) method is called only from a Subject type 
  }

  ngOnInit(): void { //pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchHeroes() --> HTTP requests
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switchMap preserves the original request order while returning only the observable from the most recent HTTP method call. Also flattens the Observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}