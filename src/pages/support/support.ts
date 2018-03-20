import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import {MapsPage} from "../maps/maps";
import { CallNumber } from '@ionic-native/call-number';


/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser,private callNumber: CallNumber) {
  }

  ionViewDidLoad() {

  }

  openCallNumber(){
    this.callNumber.callNumber("026898943", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }


  openWithInAppBrowser(){
    this.iab.create("http://www.codemobiles.com/biz/contact.html", "_blank", this.options);
  }

  openMaps(){
    this.navCtrl.push(MapsPage);
  }

}
