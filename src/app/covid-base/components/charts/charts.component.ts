import {
  Component, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, Input, Inject, NgZone, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { IHistData } from '../../../core/models/covid-base.models';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnChanges, AfterViewInit, OnDestroy {
  selected = 'cases';

  country = 'all World';

  isLoading = false;

  @Input() historicalData!: IHistData;

  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.historicalData) {
      if (changes.historicalData) {
        this.isLoading = true;
        this.selected = this.historicalData.valueName;
        this.country = this.historicalData ? `${this.historicalData.country}` : 'all World';
        this.ngAfterViewInit();
      }
    }
  }

  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 20;

      const data: {date: Date; value: number}[] = [];
      if (this.isLoading) {
        const temp = Object.keys(this.historicalData.value);
        temp.forEach((keyValue) => {
          const day = keyValue.split('/');
          const dayDate = new Date(Number(day[2]), Number(day[0]) - 1, Number(day[1]));
          const valueDate = this.historicalData.value[keyValue];
          data.push({ date: dayDate, value: valueDate });
        });
      }
      chart.data = data;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      chart.dateFormatter.dateFormat = 'MM-dd';

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 35;
      valueAxis.rangeChangeDuration = 0;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      if (this.historicalData) {
        const { valueName } = this.historicalData;
        if (valueName === 'cases') {
          series.tooltipText = 'Cases: [bold]{valueY}[/]';
          series.columns.template.fill = am4core.color('red');
        }
        if (valueName === 'deaths') {
          series.tooltipText = 'Deaths: [bold]{valueY}[/]';
        }
        if (valueName === 'recovered') {
          series.tooltipText = 'Recovered: [bold]{valueY}[/]';
          series.columns.template.fill = am4core.color('green');
        }
      } else {
        series.columns.template.fill = am4core.color('yellow');
      }
      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      scrollbarX.minHeight = 30;
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy(): void {
    this.browserOnly(() => {
      if (this.chart) {
        this.isLoading = false;
        this.chart.dispose();
      }
    });
  }
}
