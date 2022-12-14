import { HelpService } from './../../help/help.service';
import { CreditCardChartService } from './../credit-card-chart.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/schedule.type';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-credit-card-schedule',
  templateUrl: './credit-card-schedule.component.html',
  styleUrls: ['./credit-card-schedule.component.scss']
})
export class CreditCardScheduleComponent implements OnChanges {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  @Input() schedule!: Schedule;

  constructor(private creditCartChartService: CreditCardChartService, public help: HelpService) { }

  ngOnChanges(): void {
    this.chartOptions = this.creditCartChartService.interestPieChart(this.schedule);
  }
}
