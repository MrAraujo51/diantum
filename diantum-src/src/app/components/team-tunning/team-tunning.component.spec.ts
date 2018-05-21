import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTunningComponent } from './team-tunning.component';

describe('TeamTunningComponent', () => {
  let component: TeamTunningComponent;
  let fixture: ComponentFixture<TeamTunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
