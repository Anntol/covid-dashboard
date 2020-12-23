import { Component, OnChanges, SimpleChanges, AfterViewInit, Input, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { ICovid19, IHistorical } from '../../../core/models/covid-base.models';

interface IData {
  date: Date,
  Value: any,
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnChanges, AfterViewInit {
  @Input() chartsData!: IHistorical;
  dataCharts!: IData[];

  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartsData) {
      if (changes['cases']) {
        const { cases } = this.chartsData;
      }
      // this.dataCharts = cases.call();
      // console.log(this.dataCharts);
    }

  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 20;

      let data: any[] = [];
      console.log(this.chartsData);
      // const days = Object.keys(this.Historical.cases);
      // days.forEach(item => {
      //   const day =item.split('/');
      //   const dayDate = new Date(Number(day[2]), Number(day[0]) - 1, Number(day[1]));
      //   const valueDate = '';
      //   data.push({ date: dayDate, value: valueDate});
      // });

      chart.data = data;
      console.log(data);

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


}
