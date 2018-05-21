import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-goal-update-modal',
  templateUrl: './goal-update-modal.component.html',
  styleUrls: ['./goal-update-modal.component.css']
})
export class GoalUpdateModalComponent implements OnInit {

  @Input() teamObj;
  @Input() objectivesTeam;
  @Input() teamComponents;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onTotalObj(event, i) {
    if(event) {
      this.objectivesTeam.objectives[i] = Number(event.target.value)
    }
    this.objectivesTeam.total = 0
    this.objectivesTeam.objectives.forEach(goal => {
      this.objectivesTeam.total += goal;
    });
  }

  save() {
    this.activeModal.close(this.objectivesTeam);
    
  }
}
