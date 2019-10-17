import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add-admin',
  templateUrl: './product-add-admin.component.html',
  styleUrls: ['./product-add-admin.component.scss']
})
export class ProductAddAdminComponent implements OnInit {

  constructor() { }
  cities = [
    {
        id: 1,
        name: 'Vilnius',
        avatar: 'https://img-corp.net/assets/img/IMG_logo_big_blue.png'
    },
    { id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Pavilnys',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Siauliai',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
];

selectedCity = this.cities[0].name;
  ngOnInit() {
  }

}
