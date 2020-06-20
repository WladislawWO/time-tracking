import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const firebaseConfig = {
  apiKey: 'AIzaSyCTHr5TSo7ZndmnFc53yMNeOadM0SAjrck',
  authDomain: 'time-tracking-b5631.firebaseapp.com',
  databaseURL: 'https://time-tracking-b5631.firebaseio.com',
  projectId: 'time-tracking-b5631',
  storageBucket: 'time-tracking-b5631.appspot.com',
  messagingSenderId: '960974699243',
  appId: '1:960974699243:web:238813fa195fec5706dcae',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    StatisticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ChartsModule,
    NgbModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
