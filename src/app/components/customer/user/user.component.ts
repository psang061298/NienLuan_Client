import { Component, OnInit, ElementRef, ViewChild, NgZone, OnChanges } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Marker } from '@agm/core/services/google-maps-types';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit , OnChanges {

  @ViewChild('agmSearch' , {static : true}) public addr : ElementRef;

  public place1 : google.maps.places.PlaceResult;
  lat = 0;
  lng = 0;
  constructor(
    private ngZone : NgZone
  ) { }

  ngOnInit() {
    this.address();
  }

  address(){
    let autoaddress = new google.maps.places.Autocomplete(this.addr.nativeElement,{types :["address"]});
    autoaddress.addListener("place_changed",()=>{
      this.ngZone.run(()=>{
        this.place1 = autoaddress.getPlace();
        try{
          this.lat = this.place1.geometry.location.lat();
          this.lng = this.place1.geometry.location.lng();
        }
        catch(Ex){
          this.lat = 0;
          this.lng = 0;
        }
      })
    });
}

ngOnChanges(): void {
  // this.address();
}

}
