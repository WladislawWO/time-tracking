import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { getMonth, getDay, getDate, getYear } from './utilst';
import { FbResponce, Goals } from './interface';
import { ThemeService } from 'ng2-charts';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  loading = true;
  user: firebase.User;
  goalsTemplate = Object.entries({ english: 0, programming: 0, reading: 0 });
  goals = {
    programming: 0,
    reading: 0,
    english: 0,
    date: getDate(),
  };
  dailyChallenges = {
    math: false,
    rubiksCube: false,
    breathing: false,
    meditation: false,
  };
  dailyChallengesTemplate = Object.entries(this.dailyChallenges);
  totalAmount = 480;
  static;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  getData() {
    this.auth.getUserState().subscribe((user) => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.db
          .list(`Users/${user.uid}/time/${getYear()}/${getMonth()}/${getDay()}`)
          .valueChanges()
          .subscribe((res: Goals[]) => {
            if (res.length === 0) {
              this.db
                .list(`Users/${user.uid}/time/${getYear()}`)
                .update(getMonth(), {
                  [getDay()]: {
                    data: {
                      programming: 0,
                      reading: 0,
                      english: 0,
                      date: getDate(),
                      dailyChallenges: this.dailyChallenges,
                    },
                  },
                });
            } else {
              this.goalsTemplate = Object.entries(res[0]).filter(
                (g) => g[0] !== 'date' && g[0] !== 'dailyChallenges'
              );
              this.goals = res[0];
              let totalAmount = 0;
              Object.entries(res[0])
                .filter((g) => g[0] !== 'date' && g[0] !== 'dailyChallenges')
                .map((g) => (totalAmount += g[1]));
              this.totalAmount = totalAmount;
              this.dailyChallenges = res[0].dailyChallenges;
              this.dailyChallengesTemplate = Object.entries(
                res[0].dailyChallenges
              );
              this.loading = false;
            }
          });
      }
    });
  }

  getStatisticData(user) {
    return this.db
      .list(`Users/${user.uid}/time/${getYear()}/${getMonth()}`)
      .valueChanges();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  addTime(goal) {
    this.goals[goal] += 30;
    console.log(this.goals);
    return this.db
      .list(`Users/${this.user.uid}/time/${getYear()}`)
      .update(getMonth(), { [getDay()]: { data: this.goals } });
  }
  minusTime(goal) {
    this.goals[goal] -= 30;
    console.log(this.goals);
    return this.db
      .list(`Users/${this.user.uid}/time/${getYear()}`)
      .update(getMonth(), { [getDay()]: { data: this.goals } });
  }

  setChalleng(challenge) {
    this.dailyChallenges[challenge] = !this.dailyChallenges[challenge];
    this.db
      .list(
        `Users/${this.user.uid}/time/${getYear()}/${getMonth()}/${[getDay()]}`
      )
      .update('data', { dailyChallenges: this.dailyChallenges });
  }
}
