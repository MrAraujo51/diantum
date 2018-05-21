import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamComponent } from '../../../models/team-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { GoalUpdateModalComponent } from '../goal-update-modal/goal-update-modal.component';
import { ActionsModalComponent } from '../actions-modal/actions-modal.component';
import { GameParameters } from '../game-parameters'
import { LogModalComponent } from '../log-modal/log-modal.component';


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
  providers: [GameParameters]
})
export class SimulationComponent implements OnInit {

  distributedObj: boolean;
  teamObj: number = 8000;
  objectivesTeam = {
    total: 0,
    objectives: []
  }
  selectedComp: TeamComponent;
  teamComponents: TeamComponent[] = [];
  initGame: boolean;
  distributionType = 'uniforme';
  
  // Time Variables
  periods = 26; 
  totalTime = 0;
  periodTime = 0;
  currentPeriod = 1;


  constructor(
    public modalService: NgbModal,
    public gameParameters: GameParameters
  ) { }

  ngOnInit() {
  }

  startSimulation() {
    this.gameParameters.names['m'] = ["Pablo", "Roberto", "David", "Jorge", "Pedro", "Eduardo", "Felipe", "Alberto"]
    this.gameParameters.names['f'] = ["Sofía", "Alicia", "Ana", "Emilia", "Eva", "Sara", "Andrea", "Natalia"]

    this.distributedObj = false
    this.initGame = true;
    
    let male = 0, female = 0;
    for (let i = 0; i < 8; i++) {
      this.teamComponents[i] = new TeamComponent();
      this.teamComponents[i].code = i + 1
      this.teamComponents[i].gender = (Math.floor(Math.random() * 100) + 1 <= 50) ? 'f' : 'm'
      this.teamComponents[i].type = this.componentType(i);
      this.teamComponents[i].color = this.randomColor(this.teamComponents[i].type)
      
      let range = this.gameParameters.performance[this.teamComponents[i].type][this.teamComponents[i].color];
      this.teamComponents[i].performance = this.randomPerformance(range[0], range[1]);

      this.teamComponents[i].changeCount = 0;

      this.teamComponents[i].gender = (this.teamComponents[i].gender === 'm' && male >= 4) ? 'f' : this.teamComponents[i].gender;
      this.teamComponents[i].gender = (this.teamComponents[i].gender === 'f' && female >= 4) ? 'm' : this.teamComponents[i].gender;
      this.randomName(i);
      
      this.teamComponents[i].gender === 'm' ? male++ : female++;

      this.teamComponents[i].quality = this.gameParameters.quality[this.teamComponents[i].type][this.teamComponents[i].color];

      this.teamComponents[i].log = []
    }
    this.shuffleArray(this.teamComponents)
    console.log(this.teamComponents);
  }

  componentType(i): number {
    i++
    if (this.distributionType === 'uniforme') {
      return i;
    } else {
      let type
      switch (i) {
        case 1:
          type = Math.floor(Math.random() * 2) + 1
          break;
        case 2:
          type = Math.floor(Math.random() * 4) + 3
          break;
        case 3:
          type = Math.floor(Math.random() * 6) + 5
          break;
        case 4:
          type = Math.floor(Math.random() * 8) + 7
          break;

        default:
          type = Math.floor(Math.random() * 8) + 1
          break;
      }
      return type;
    }

  }
  
  randomPerformance(start: number, end: number): number {
    return  Math.floor(Math.random() * (end - start + 1)) + start;
  }

  randomColor(type): string {
    const r = Math.floor(Math.random() * 100) + 1;

    const i = type <= 2 ? 1 :
              type <= 4 ? 2 :
              type <= 6 ? 3 :
              4

    return  r <= this.gameParameters.colorByType[i].green ? 'green' :
              r <= (this.gameParameters.colorByType[i].green + this.gameParameters.colorByType[i].yellow) ? 'yellow' :
              'red'
  }

  randomName(i) {
    let nameIdx;
    let gen = this.teamComponents[i].gender
    nameIdx = Math.floor(Math.random() * this.gameParameters.names[gen].length) + 0
    this.teamComponents[i].name = this.gameParameters.names[gen][nameIdx]
    this.gameParameters.names[gen].splice(nameIdx, 1)
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onSelectionComponent(comp) {
    this.selectedComp = comp
    console.log(comp);
  }

  distributionObjetives() {
    let averange = this.teamObj / 8
    this.distributedObj = true
    for (let i = 0; i < 8; i++) {
      this.objectivesTeam.objectives[i] = averange;
      this.teamComponents[i].objTotal = averange;
      this.teamComponents[i].objPeriod = averange / this.periods;
    }
    this.objectivesTeam.total = 0
    this.objectivesTeam.objectives.forEach(goal => {
      this.objectivesTeam.total += goal;
    });
  }

  openProfileModal() {
    this.selectedComp.behav = this.gameParameters.behav[this.selectedComp.type]
    const modalRef = this.modalService.open(ProfileModalComponent);

    modalRef.componentInstance.selectedComp = this.selectedComp
  }

  openGoalUpdateModal() {
    const modalRef = this.modalService.open(GoalUpdateModalComponent);
    modalRef.componentInstance.teamObj = this.teamObj;
    modalRef.componentInstance.objectivesTeam = this.objectivesTeam;
    modalRef.componentInstance.teamComponents = this.teamComponents;

    modalRef.result.then((res) => {
      if(res) {
        this.objectivesTeam = res;
        for (let i = 0; i < 8; i++) {
          if(this.teamComponents[i].objTotal !== this.objectivesTeam.objectives[i]) {
            this.teamComponents[i].changeCount += 1;
          }
          this.teamComponents[i].objTotal = this.objectivesTeam.objectives[i]
        }
      }
    })
  }

  openActionsModal() {
    const modalRef = this.modalService.open(ActionsModalComponent);
    
    modalRef.componentInstance.selectedComp = this.selectedComp

    modalRef.result.then((res) => {
      if(res) {
        this.selectedComp = res;

        this.teamComponents.forEach(comp => {
          if(comp.code == this.selectedComp.code) {
            comp = this.selectedComp;
            
          }
        })

        console.log(this.teamComponents);
      }
    })
  }

  openLogModal() {
    const modalRef = this.modalService.open(LogModalComponent);
    
    modalRef.componentInstance.selectedComp = this.selectedComp
  }
}
