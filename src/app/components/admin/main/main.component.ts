import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { last } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  order : any[] = [];

  public barChartOption = {
    scaleShowVerticalLines : false,
    responsive: true,
  }

  //thang nhap vao bao nhieu cai
  //ban ra bao nhieu cai

  redultBarChart : any[] = [];

  public barChartLabel = ['Month 1','Month 2','Month 3','Month 4','Month 5','Month 6','Month 7',
  'Month 8','Month 9','Month 10','Month 11','Month 12'];

  public databarChar = [
    {
      data:[],
      label: 'Product'
    },
  ]
  public barChartLegend = true;
  public barChartType = 'bar'


  //for category

  public labels=[];
  public dataCate = [];
  public type = 'pie';


  constructor(
    private adminService : AdminService,
  ) { }

  ngOnInit() {
    this.loadStatistics();
    this.loadInStock();
  }

  loadStatistics(){
    this.adminService.getStatistics().then(data => {
      this.redultBarChart = data;
      let lastIndex = this.redultBarChart.length -1 ;
      console.log(lastIndex);
      let month = this.redultBarChart[lastIndex]['month'].substr(0,2);
      for (let i = 1; i <= 12; i++) {
        if( lastIndex >= 0 && i == this.redultBarChart[lastIndex]['month'].substr(0,2)){
          console.log('thang ' + i);
          this.databarChar[0]['data'].push(this.redultBarChart[lastIndex]['revenue']);
          lastIndex -= 1;
        }
        else{
          this.databarChar[0]['data'].push(0)
        }
      }
    })
    console.log(this.databarChar);
  }
  
  loadInStock(){
    this.adminService.getInStock().subscribe(data => {
      data.forEach(element => {
        this.labels.push(element.category);
        this.dataCate.push(element.quantity_in_stock);
      });
    })
  }

}
