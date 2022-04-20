import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, takeWhile } from 'rxjs';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent implements OnInit, OnDestroy {
  imageSrc = '../../assets/launcher_logo.png';
  color = 'black';
  value = 50;
  windowWidth!: string;
  showSplash: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      // this.windowWidth = '-' + window.innerWidth + 'px';
      // this.router.navigateByUrl('/phone');
    }, 3000);
  }
  ngOnDestroy(): void {}
}
