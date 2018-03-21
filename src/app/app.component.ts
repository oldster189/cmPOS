import {ListsPage} from './../pages/lists/lists';
import {TransactionPage} from './../pages/transaction/transaction';
import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {ReportPage} from '../pages/report/report';
import {SupportPage} from "../pages/support/support";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage, icon: 'md-home'},
      {title: 'Lists', component: ListsPage, icon: 'md-list'},
      {title: 'Transaction', component: TransactionPage, icon: 'md-git-compare'},
      {title: 'Report', component: ReportPage, icon: 'md-document'},
      {title: 'Support', component: SupportPage, icon: 'ios-help-buoy'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.component);
  }
}

