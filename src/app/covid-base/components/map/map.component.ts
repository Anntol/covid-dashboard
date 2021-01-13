import {
 Component, Input, OnChanges, AfterViewInit, OnDestroy, SimpleChanges, Inject, NgZone, PLATFORM_ID
} from '@angular/core';
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
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() countryData!: ICountrData[];

  inputData: IMapElement[] = [];

  private mChart!: am4maps.MapChart;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.countryData) {
      if (changes.countryData) {
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
      am4core.useTheme(am4themes_dark);
      am4core.useTheme(am4themes_animated);
      am4core.disposeAllCharts();

      const activeColor = am4core.color('#ff8726');
      const confirmedColor = am4core.color('#d21a1a');
      const recoveredColor = am4core.color('#0a710f');
      const deathsColor = am4core.color('#ffffff');

      const colors = {
        default: activeColor,
        cases: confirmedColor,
        recovered: recoveredColor,
        deaths: deathsColor,
      };

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
      polygonTemplate.fill = am4core.color('#8f606e');
      polygonTemplate.polygon.fillOpacity = 0.6;

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = mChart.colors.getIndex(0);

      const imageSeries = mChart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = 'long';
      imageSeries.mapImages.template.propertyFields.latitude = 'lat';
      imageSeries.mapImages.template.tooltipText = '{name} [bold]{value}';

      const circle: am4core.Circle = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle.radius = 3;
      circle.propertyFields.fill = 'color';

      const circle2: am4core.Circle = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle2.radius = 3;
      circle2.propertyFields.fill = 'color';

      function animateBullet(animatedCircle: am4core.Circle): void {
        const animation: am4core.Animation = animatedCircle.animate(
          [
            { property: 'scale', from: 1, to: 3 },
            { property: 'opacity', from: 1, to: 0 },
          ],
          1000,
          am4core.ease.circleOut,
        );
        animation.events.on('animationended', (event): void => {
          animateBullet(event.target.object as am4core.Circle);
        });
      }

      circle2.events.on('inited', (event): void => {
        animateBullet(event.target);
      });

      const data: Partial<IMapElement[]> = [];
      this.countryData?.forEach((item) => {
        const { country } = item;
        const { value } = item;
        const { lat } = item.countryInfo;
        const { long } = item.countryInfo;
        const { valueName } = item;
        type Keys = 'cases' | 'deaths' | 'recovered';
        let color = 'default';
        if (valueName === 'cases') {
          color = String(colors['cases' as Keys]);
        }

        if (valueName === 'deaths') {
          color = String(colors['deaths' as Keys]);
        }

        if (valueName === 'recovered') {
          color = String(colors['recovered' as Keys]);
        }

        data.push({
          name: country, value, lat, long, color
        });
      });
      imageSeries.data = data;
      polygonSeries.data = data;
    });
  }

  ngOnDestroy(): void {
    this.browserOnly(() => {
      if (this.mChart) {
        this.mChart.dispose();
      }
    });
  }
}
