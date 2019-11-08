import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public barChartOption = {
    scaleShowVerticalLines : false,
    responsive: true,
  }

  //thang nhap vao bao nhieu cai
  //ban ra bao nhieu cai
  public barChartLabel = ['2001','2002','2003','2004','2005','2006','2007'];

  public data = [
    {
      data:[
        64,55,59,87,98,12,23
      ],
      label: 'Series A'
    },
    {
      data:[
        46,56,95,22,13,11,8
      ],
      label: 'Series B'
    }
  ]
  public barChartLegend = true;
  public barChartType = 'bar'


  //for category

  public labels=['01','02','03','04'];
  public dataCate = [120,150,180,190];
  public type = 'pie';


  constructor() { }

  ngOnInit() {
  }

}
