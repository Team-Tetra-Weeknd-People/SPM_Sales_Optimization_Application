import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor() {
    // Check if a variable exists in sessionStorage
    this.isLoggedIn = sessionStorage.getItem('userID') !== null;
  }

  ngOnInit(): void {}
}
