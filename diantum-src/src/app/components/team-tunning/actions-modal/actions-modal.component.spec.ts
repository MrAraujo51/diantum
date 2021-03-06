import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsModalComponent } from './actions-modal.component';

describe('ActionsModalComponent', () => {
  let component: ActionsModalComponent;
  let fixture: ComponentFixture<ActionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
