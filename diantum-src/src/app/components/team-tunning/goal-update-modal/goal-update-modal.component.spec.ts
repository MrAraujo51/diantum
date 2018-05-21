import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalUpdateModalComponent } from './goal-update-modal.component';

describe('GoalUpdateModalComponent', () => {
  let component: GoalUpdateModalComponent;
  let fixture: ComponentFixture<GoalUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
