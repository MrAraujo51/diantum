import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandiesGameComponent } from './candies-game.component';

describe('CandiesGameComponent', () => {
  let component: CandiesGameComponent;
  let fixture: ComponentFixture<CandiesGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandiesGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandiesGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
