/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-10-10 21:21:38
 */
import {
  ElementRef, Output, Directive, AfterViewInit, OnDestroy, EventEmitter
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';

@Directive({
  selector: '[appAppear]'
})
export class AppearDirective implements AfterViewInit, OnDestroy {

  @Output()
  appear: EventEmitter<void>;

  elementPos: number;
  elementHeight: number;

  scrollPos: number;
  windowHeight: number;

  subscriptionScroll: Subscription;
  subscriptionResize: Subscription;

  constructor(public element: ElementRef) {
    this.appear = new EventEmitter<void>();
  }

  saveDimensions() {
    this.elementPos = this.getOffsetTop(this.element.nativeElement);
    this.elementHeight = this.element.nativeElement.offsetHeight;
    this.windowHeight = window.innerHeight;
  }
  saveScrollPos() {
    this.scrollPos = window.scrollY;
  }
  getOffsetTop(element: any) {
    let offsetTop = element.offsetTop || 0;
    if (element.offsetParent) {
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }
  checkVisibility() {
    if (!this.isVisible()) {
      // double check dimensions (due to async loaded contents, e.g. images)
      this.saveDimensions();
      if (!this.isVisible()) {
        this.unsubscribe();
        this.appear.emit();
        const animation = this.element.nativeElement.dataset.animation,
        animationDelay = this.element.nativeElement.dataset.animationDelay
        if (animationDelay) {
          setTimeout(() => {
            this.element.nativeElement.classList.add(animation);
            this.element.nativeElement.classList.add('visible');
          }, animationDelay);
        } else {
          this.element.nativeElement.classList.add(animation);
          this.element.nativeElement.classList.add('visible');
        }
      }
    }
  }
  isVisible() {
    return (this.scrollPos >= this.elementPos) || (this.scrollPos + this.windowHeight) >= (this.elementPos + this.elementHeight);
  }

  subscribe() {
    this.subscriptionScroll = Observable.fromEvent(window, 'scroll').startWith(null)
      .subscribe(() => {
        this.saveScrollPos();
        this.saveDimensions();
        this.checkVisibility();
      });
    this.subscriptionResize = Observable.fromEvent(window, 'resize').startWith(null)
      .subscribe(() => {
        this.saveDimensions();
        this.checkVisibility();
      });
  }
  unsubscribe() {
    if (this.subscriptionScroll) {
      this.subscriptionScroll.unsubscribe();
    }
    if (this.subscriptionResize) {
      this.subscriptionResize.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.subscribe();
  }
  ngOnDestroy() {
    this.unsubscribe();
  }

}
