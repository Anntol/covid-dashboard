import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
  Inject,
  NgZone,
  PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { ICountrData } from 'src/app/core/models/covid-base.models';

interface IMapElement {
  name: string;
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
export class MapComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() countryData!: ICountrData[];

  inputData: IMapElement[] = [];

  private mChart!: am4maps.MapChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.countryData) {
      if (changes[`countryData`]) {
        // console.log(this.countryData);
        this.ngAfterViewInit();
      }
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
      am4core.useTheme(am4themes_dark);
      am4core.useTheme(am4themes_animated);
      am4core.disposeAllCharts();

      const activeColor = am4core.color('#ff8726');
      const confirmedColor = am4core.color('#d21a1a');
      const recoveredColor = am4core.color('#0a710f');
      const deathsColor = am4core.color('#ffffff');

      const colors = { default: activeColor, cases: confirmedColor, recovered: recoveredColor, deaths: deathsColor };

      const mChart = am4core.create('mapdiv', am4maps.MapChart);
      mChart.marginTop = 50;

      mChart.height = am4core.percent(97);
      mChart.zoomControl = new am4maps.ZoomControl();
      mChart.zoomControl.align = 'right';
      mChart.zoomControl.marginRight = 5;
      mChart.zoomControl.marginTop = 5;
      mChart.zoomControl.valign = 'bottom';

      mChart.zoomEasing = am4core.ease.sinOut;

      mChart.geodata = am4geodata_worldLow;

      mChart.projection = new am4maps.projections.Mercator();

      const polygonSeries = mChart.series.push(new am4maps.MapPolygonSeries());

      polygonSeries.exclude = ['AQ'];
      polygonSeries.useGeodata = true;

      const polygonTemplate = polygonSeries.mapPolygons.template;
      // polygonTemplate.tooltipText = '{name} {value}';
      polygonTemplate.fill = am4core.color('#8f606e');
      polygonTemplate.polygon.fillOpacity = 0.6;
      // polygonTemplate.fill = mChart.colors.getIndex(0);

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = mChart.colors.getIndex(0);
      // hs.properties.fill = am4core.color('#367B25');

      const imageSeries = mChart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = 'long';
      imageSeries.mapImages.template.propertyFields.latitude = 'lat';
      imageSeries.mapImages.template.tooltipText = '{name} [bold]{value}';

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

    const data: Partial<IMapElement[]> = [];
    this.countryData?.forEach(item => {
      const country = item.country;
      const value = item.value;
      const { lat } = item.countryInfo;
      const { long } = item.countryInfo;
      const valueName =  item.valueName;
      type keys = 'cases'|'deaths'|'recovered';
      let color = 'default';
      if (valueName === 'cases') {
        color =  String(colors['cases' as keys]);
      }
      if (valueName === 'deaths') {
        color =  String(colors['deaths' as keys]);
      }
      if (valueName === 'recovered') {
        color = String(colors['recovered' as keys]);
      }
      data.push({name: country, value: value, lat: lat, long: long, color: color });
    })
    imageSeries.data = data;
    polygonSeries.data = data;
    })
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.mChart) {
        this.mChart.dispose();
      }
    });
  }

}
