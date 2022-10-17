import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
// import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts'; //TODO is this blowing up the package check
import { Chart } from 'highcharts';

export class PieChartData {
  name!: string;
  color!: string;
  y!: number;
  sliced?: boolean;
};

//TODO combine this chart service into the chart module
//remove this chart service
@Injectable({
  providedIn: 'root'
})
export class ChartServiceDeprecated {

  constructor(private currency: CurrencyPipe) { }

  // TODO make this more generic for any use not use principal + interest
  getPrincipalInterestChart = (principal: number, interest: number) => {
    const original =
      '<div class="chart-label-container"><span class="chart-label">Total Interest:</span><span class="chart-value">' +
      this.currency.transform(interest) + '</span></div>';

    const originalChartData: any[] = [
      { name: 'Interest', color: 'red', y: interest },
      { name: 'Principal', color: 'green', y: principal }
    ];

    return this.getPieChart('', originalChartData);
  };

  getBarChart = (title: string, data: any[], xAxisCategories: any[] = []): Chart => {

    // see https://stackoverflow.com/questions/42866870/highcharts-progress-bar-chart/42871005#42871005
    Highcharts.setOptions({ lang: { thousandsSep: ',' } });

    const chartLocal = new Chart({
      tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
      chart: {
        type: 'bar',
        borderColor: 'red'

      },
      title: {
        text: title.length > 0 ? title : undefined, // If you want the title text you need to set this
        style: { fontWeight: 'bold' }
      },
      xAxis: {
        categories: xAxisCategories,
        labels: {
          useHTML: true,
          align: 'left',
          x: 0,
          y: -25, /* to be adjusted according to number of bars*/
          style: {
            width: 350
            // fontWeight: 'bold',
            // fontSize: '14px',
            // color: 'black'
          }
        }
      },
      yAxis: {
        title: undefined
        // stackLabels:{
        //   align:"center"
        // }

      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false // This removed the legend
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,  // I don't think this is currently show, you turned off labels below
            format: '${point.y:,.2f}',
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
              color: 'black'
            }
          },  // This is how you put 2 decimal points
        }
      },
      series: [
        {
          type: 'bar' as any,
          name: '',
          data,
          dataLabels: {
            enabled: false // This will turn of the labels
          }
        }
      ]
    });

    return chartLocal;
  };

  getPieChart = (title: string, data: PieChartData[]): Chart => {

    let dataSanitized = data.filter((d) => {
      return d.y > 0;
    });

    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    const chartLocal = new Chart({

      tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
      chart: {
        type: 'pie'
      },
      title: {
        text: title,
        style: { fontWeight: 'bold' }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          // innerSize:90,  //This will make it an donut
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: false,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'

          }
        }
      },
      series: [
        {
          type: 'pie' as any,
          name: '',
          data: dataSanitized
        }
      ]
    });

    return chartLocal;
  };
}