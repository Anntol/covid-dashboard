import { Component, OnInit } from '@angular/core';

import { ICovid19 } from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private covidService: CovidService ) { }

  ngOnInit(): void {
  
  }

}
