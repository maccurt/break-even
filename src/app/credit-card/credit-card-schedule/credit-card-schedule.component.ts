import { IconService } from 'src/app/icon/icon.service';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { HelpService } from './../../help/help.service';
import { CreditCardChartService } from './../credit-card-chart.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/schedule.class';
import * as Highcharts from 'highcharts';
import { PaymentType } from '../credit-card-calculator/payment-type.enum';

@Component({
  selector: 'app-credit-card-schedule',
  templateUrl: './credit-card-schedule.component.html',
  styleUrls: ['./credit-card-schedule.component.scss']
})
export class CreditCardScheduleComponent implements OnInit, OnChanges {  
  paymentTypeIcon!:IconDefinition;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  @Input() schedule!: Schedule;

  constructor(private creditCartChartService: CreditCardChartService,
    public help: HelpService, public icons: IconService) {
      
  }
  
  ngOnInit(): void {
      if (this.schedule.paymentType === PaymentType.MinimumPaymentOnly){
        this.paymentTypeIcon = this.icons.minimumPaymentType;
      }
      else{
        this.paymentTypeIcon = this.icons.smile;
      }
  }

  ngOnChanges(): void {
    this.chartOptions = this.creditCartChartService.interestPieChart(this.schedule);
  }
}
