import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  lat:number
  lon:number
  total:string

  constructor(public geolocation:Geolocation) {
    this.getGeolocation()
  }

  ngOnInit() {
  }

  getGeolocation(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data:Geoposition) => {
      this.lat = data.coords.latitude;
      this.lon = data.coords.longitude;
    });
    // this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
    //   this.lat = geoposition.coords.latitude;
    //   this.lon = geoposition.coords.longitude;
    // });
  }

  calculateDistance(lon1, lon2, lat1, lat2){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis);
}
}