import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCyclumComponent } from './sales-cyclum.component';

describe('SalesCyclumComponent', () => {
  let component: SalesCyclumComponent;
  let fixture: ComponentFixture<SalesCyclumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCyclumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCyclumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
