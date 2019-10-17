import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.scss']
})
export class BaseAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
}

  public reload(){
    this.sleep().then(data => {
      window.location.reload();
    });
  }
}
