import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Inject,
  NgZone,
  PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { ICountries } from 'src/app/core/models/covid-base.models';
interface IMapElement {
  country: string;
  value: number;
  lat: number;
  long: number;
  color: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() countryData!: ICountries[];
  dataSource!: BehaviorSubject<ICountries[]>;
  inputData: IMapElement[] = [];

  private chart!: am4maps.MapChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new BehaviorSubject(this.countryData);
    const data: IMapElement[] = [];
    this.countryData?.forEach(item => {
      const country = item.country;
      const { totalCases } = item;
      const value = totalCases;
      const { lat } = item.countryInfo;
      const { long } = item.countryInfo;
      const color = 'colors.confirmed';
      data.push({country: country, value: value, lat: lat, long: long, color: color })
    })
    console.log(data);
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
      am4core.useTheme(am4themes_dark);
      am4core.useTheme(am4themes_animated);

      const activeColor = am4core.color('#ff8726');
      const confirmedColor = am4core.color('#d21a1a');
      const recoveredColor = am4core.color('#45d21a');
      const deathsColor = am4core.color('#1c5fe5');
      const textColor = am4core.color('#ffffff');

      const colors = { active: activeColor, confirmed: confirmedColor, recovered: recoveredColor, deaths: deathsColor };

      const chart = am4core.create('chartdiv', am4maps.MapChart);
      chart.marginTop = 50;

      chart.height = am4core.percent(97);
      chart.zoomControl = new am4maps.ZoomControl();
      chart.zoomControl.align = 'right';
      chart.zoomControl.marginRight = 5;
      chart.zoomControl.marginTop = 5;
      chart.zoomControl.valign = 'bottom';

      chart.zoomEasing = am4core.ease.sinOut;

      chart.geodata = am4geodata_worldLow;

      chart.projection = new am4maps.projections.Mercator();

      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      polygonSeries.exclude = ['AQ'];
      polygonSeries.useGeodata = true;

      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#8f606e');
      polygonTemplate.polygon.fillOpacity = 0.6;
      // polygonTemplate.fill = chart.colors.getIndex(0);

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = chart.colors.getIndex(0);
      // hs.properties.fill = am4core.color('#367B25');

      const imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = 'long';
      imageSeries.mapImages.template.propertyFields.latitude = 'lat';
      imageSeries.mapImages.template.tooltipText = '{country}: {value}';
      imageSeries.mapImages.template.propertyFields.url = 'url';

      const circle = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle.radius = 3;
      circle.propertyFields.fill = 'color';

      const circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle2.radius = 3;
      circle2.propertyFields.fill = 'color';


      circle2.events.on('inited', function(event){
        animateBullet(event.target);
    })

    function animateBullet(circle: any) {
      const animation = circle.animate([{ property: 'scale', from: 1, to: 3 }, { property: 'opacity', from: 1, to: 0 }], 1000, am4core.ease.circleOut);
      animation.events.on('animationended', function(event: any){
        animateBullet(event.target.object);
      })
  }

    const colorSet = new am4core.ColorSet();

    imageSeries.data = this.inputData;
    console.log(imageSeries.data);

    imageSeries.data = [
      {
      country: 'Belarus',
      value: 179196,
      lat: 53,
      long: 28,
      color: `${colors.confirmed}`,
      }
    ]

    })

  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
