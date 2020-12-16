import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScGvcVIuXS0cYSoQBSis1maQ0sjovq4tDRVlSzqammRfHMtAw/viewform');
  }

}
