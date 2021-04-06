import { Component, OnInit, NgModule } from '@angular/core';
import { ZingchartAngularModule } from 'zingchart-angular';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit {

  config:zingchart.graphset = {
    type: 'hbar',
    series: [{
      values: [3,6,4,6,4,6,4,6, 12]
    }],
  };

  constructor() { }

  ngOnInit(): void {
  }

}
