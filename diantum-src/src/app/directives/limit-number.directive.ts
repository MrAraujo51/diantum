import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[limitNumber]'
})
export class LimitNumberDirective {

  @Input() min: number;
  @Input() max: number;

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array < string > = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {}
  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: number = this.el.nativeElement.value;
    if(current < this.min) {
      this.el.nativeElement.value = this.min
      event.preventDefault();      
    }

    if(current > this.max) {
      this.el.nativeElement.value = this.max
      event.preventDefault();      
    }
  }

}
