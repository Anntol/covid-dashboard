import {
  Component,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  Input,
  Inject,
  NgZone,
  PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { IHistData } from '../../../core/models/covid-base.models';

interface IData {
  date: Date,
  Value: any,
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnChanges, AfterViewInit, OnDestroy {
  selected = 'cases';
  country = 'all';
  isLoading = false;

  @Input() historicalData!: IHistData;

  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.historicalData) {
      if (changes[`historicalData`]) {
        this.isLoading = true;
        this.selected = this.historicalData.valueName;
        this.country = this.historicalData ? `${this.historicalData.country}` : 'ALL';
        this.ngAfterViewInit();
      }
    }
  }

  browserOnly(f:() => void) {
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

      const data: any[] = [];
      if (this.isLoading){
        console.log(this.historicalData.value);

        const temp = Object.keys(this.historicalData.value);
        temp.forEach(keyValue => {
          const day = keyValue.split('/');
          const dayDate = new Date(Number(day[2]), Number(day[0]) - 1, Number(day[1]));
          const valueDate = this.historicalData.value[keyValue];
          data.push({ date: dayDate, value: valueDate });
        });
      }
      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      chart.dateFormatter.dateFormat = "MM-dd";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      const { valueName } = this.historicalData;
      if (valueName === 'cases') {
        series.tooltipText = "Cases: [bold]{valueY}[/]";
        series.columns.template.fill = am4core.color("red");
      }
      if (valueName === 'deaths') {
        series.tooltipText = "Deaths: [bold]{valueY}[/]";
      }
      if (valueName === 'recovered') {
        series.tooltipText = "Recovered: [bold]{valueY}[/]";
        series.columns.template.fill = am4core.color("green");
      }

      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      scrollbarX.minHeight = 30;
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
