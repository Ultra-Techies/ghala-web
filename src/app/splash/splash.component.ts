import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent implements OnInit {
  imageSrc = '../../assets/launcher_logo.png';
  color = 'black';
  value = 50;
  windowWidth!: string;
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loading = true;

    setTimeout(() => {
      this.windowWidth = '-' + window.innerWidth + 'px';
    }, 3000);
  }
}
