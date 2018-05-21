import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameParameters } from '../game-parameters';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { TeamComponent } from '../../../models/team-component';

@Component({
  selector: 'app-actions-modal',
  templateUrl: './actions-modal.component.html',
  styleUrls: ['./actions-modal.component.css'],
  providers: [GameParameters]
  
})
export class ActionsModalComponent implements OnInit {

  @Input() selectedComp: TeamComponent;

  actions = [];

  constructor(
    public activeModal: NgbActiveModal,
    public gameParams: GameParameters
  ) { }

  ngOnInit() {
    console.log(this.gameParams)
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  markAction(action, cat, ev) {
    if(ev.target.checked) {
      action.cat = cat
      this.actions.push(action)
    } else {
      let idx = this.actions.findIndex(act => act.name == action.name)
      this.actions.splice(idx,1);
    }
  }

  save() {
    this.actions.forEach(act => {
      this.selectedComp.log.push(` ${act.cat}. ${act.name}. Periodo X`)
    });
    this.activeModal.close(this.selectedComp);
  }
}
