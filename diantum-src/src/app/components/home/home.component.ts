/*
 * @Author: Manuel Araujo
 * @Date: 2017-07-02 13:49:26
 * @Last Modified time: 2017-07-02 13:49:26
 */
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public translate: TranslateService,
  ) {

  }

  ngOnInit() {

  }

  goToGamificacion() {
     this.router.navigate(['/gamificacion'], { fragment: 'tecnologia'});
  }

}
