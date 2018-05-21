/*
 * @Author: Manuel Araujo
 * @Date: 2017-07-02 13:49:13
 * @Last Modified time: 2017-07-02 13:49:13
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {
  hasAppeared = false;
  constructor(
    public router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

  onAppear() {
    this.hasAppeared = true;
  }

  isHidden(){
    if (this.router.url.includes('profile')) {
      return false;
    }
    return true;
  }
}
