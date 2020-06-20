import { UserDataService } from './../user-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;

  constructor(public user: UserDataService) {}

  ngOnInit() {
    this.user.getData();
  }

  register() {
    this.user.register();
  }
  logout() {
    this.user.logout();
  }
  login() {
    this.user.login();
  }
  addTime(goal) {
    this.loading = true;
    this.user.addTime(goal).then((res) => (this.loading = false));
  }
  setChalleng(e) {
    this.user.setChalleng(e);
  }
  minusTime(e) {
    this.user.minusTime(e);
  }
}
