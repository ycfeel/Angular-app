import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {HeroService} from './hero.service';
import {Hero} from './hero';

@Component({
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero">
      <h3>{{hero.name}} details!</h3>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
      <button (click)="goBack()">Back</button>
      <!--<button (click)="sendToParent()">发送给父组件</button>-->
    </div>
  `,
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() outer = new EventEmitter<string>();

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    // 回退太多步会跑出我们的应用。 在真实的应用中，我们需要使用CanDeactivate守卫对此进行防范
    this.location.back();
  }

  sendToParent(): void {
    this.outer.emit('message from child');
  }
}
