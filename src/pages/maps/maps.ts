import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Location } from './../../models/location';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: GoogleMap;

  options: GeolocationOptions;
  currentPos: Geoposition;


  locationIsSet = false;

  location: Location = {
    lat: 13.6954098,
    lng: 100.5127382
  }

  typeMap = "roadmap";

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.getUserPosition();
  }

  getUserPosition(){
    this.options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(this.options)
      .then((pos: Geoposition) => {
        this.currentPos = pos;
        this.location.lat = pos.coords.latitude;
        this.location.lng = pos.coords.longitude;
        this.locationIsSet = true;
        console.log("posisiton: => " + pos.coords.latitude + ", " + pos.coords.longitude);
      }, (err: PositionError) => {
        console.log("error : " + err.message);
      });
  }


}
