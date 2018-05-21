import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Lead, LeadService } from '../../../service/lead.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseChartDirective } from 'ng2-charts';
import { InstanceService } from 'app/service/instance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'ng2-translate';


const gameParameters = {
  oportunity: {
    probability: {
      cIndividual: {
        green: 30,
        orange: 40,
        red: 30
      },
      cGroup: {
        green: 10,
        orange: 40,
        red: 50
      },
      verify: {
        green : {
          green: 50,
          orange: 30,
          red: 20
        },
        orange: {
          green: 20,
          orange: 30,
          red: 50
        },
        red: {
          green: 10,
          orange: 10,
          red: 80
        }
      }
    },
    time: {
      cIndividual: 10,
      cGroup: 5,
      verify: 10
    }
  },
  visit: {
    probability: {
      preMax: {
        green: {
          green: 50,
          orange: 30,
          red: 20
        },
        orange: {
          green: 30,
          orange: 40,
          red: 30
        }
      },
      preMed: {
        green: {
          green: 30,
          orange: 30,
          red: 40
        },
        orange: {
          green: 10,
          orange: 30,
          red: 60
        }
      },
      preMin: {
        green: {
          green: 10,
          orange: 10,
          red: 80
        },
        orange: {
          green: 0,
          orange: 10,
          red: 90
        }
      },
      visitLen: {
        r1: 10,
        r2: 10,
        r3: 60,
        r4: 10,
        r5: 10
      }
    },
    time: {
      preMax: 80,
      preMed: 45,
      preMin: 10,
      visitLen: {
        r1: 40,
        r2: 50,
        r3: 60,
        r4: 70,
        r5: 80
      }
    },
  },
  offer: {
    probability: {
      preOffer: {
        r1: 10,
        r2: 10,
        r3: 50,
        r4: 20,
        r5: 10
      }
    },
    time: {
      makeOffer: 20,
      preOffer: {
        r1: 35,
        r2: 40,
        r3: 45,
        r4: 60,
        r5: 75
      }
    }
  },
  contract: {
    probability: {
      contract: {
        green: {
          green: 60,
          red: 40
        },
        orange: {
          green: 30,
          red: 70
        }
      },
      reuDuration: {
        r1: 10,
        r2: 10,
        r3: 50,
        r4: 20,
        r5: 10
      }
    },
    time: {
      reuDuration: {
        r1: 30,
        r2: 35,
        r3: 40,
        r4: 60,
        r5: 80
      }
    }
  },
  nOpoGr: 5,
  nObjective: 36
}


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  params: any;
  canPlay: boolean;

  public id = localStorage.getItem('GID');

  tLeads = 0;
  tLeadsVisitM = 0;
  tLeadsVisitF = 0;

  public oportunities$: Observable<Lead[]>;
  public visits$: Observable<Lead[]>;
  public offers$: Observable<Lead[]>;
  public contracts$: Observable<Lead[]>;

  contractGreen = 0;
  contractRed = 0;

  selectedLeadOpor;
  selectedLeadVisi;
  selectedLeadOffe;
  selectedLeadCont;

  visitDuration = 0;
  offerDuration = 0;
  contractDuration = 0
  totalTime = 0;
  freeTrialTime = 1500;
  log: any;

  public gameTime = 30240;
  public initGame = false;

  totalContractTime = 0;
  cEfficiency

  @ViewChild ('rConvertion')  rConvertionChart: BaseChartDirective;
  @ViewChild ('cEfficiency')  cEfficiencyChart: BaseChartDirective;
  @ViewChild ('goals')  goalsChart: BaseChartDirective;

  @ViewChild('getGameModal') public getGameModal;
  @ViewChild('paramsModal') public paramsModal;

  public rConvertionChartLabels: string[] = ['Customers', 'Leads'];
  public rConvertionChartData: number[] = [];
  public rConvertionChartType = 'doughnut';

  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Percentage'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time - days'
        }
      }]
    }
  };
  public cEfficiencyChartData: Array<any> = [];
  public goalsChartData: Array<any> = [];

  public cEfficiencyChartLabels: Array<any> = [];
  public goalsChartLabels: Array<any> = [];

  public rConvertionColor: Array<any> = [{
    backgroundColor: ['rgba(0, 204, 0, 0.8)', 'rgba(255, 51, 51, 0.8)'],
    borderColor: ['rgba(0, 204, 0, 1)', 'rgba(255, 51, 51, 1)'],
    pointBackgroundColor: ['rgba(0, 204, 0, 1)', 'rgba(255, 51, 51, 1)'],
    pointBorderColor: ['#fff', '#fff'],
    pointHoverBackgroundColor: ['#fff', '#fff'],
    pointHoverBorderColor: ['rgba(0, 204, 0, 1)', 'rgba(255, 51, 51, 1)']
  }]

  public cEfficiencyColor: Array<any> = [{
    backgroundColor: 'rgba(0, 204, 0,0.2)',
    borderColor: 'rgba(0, 204, 0,1)',
    pointBackgroundColor: 'rgba(0, 204, 0,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 204, 0,0.8)'
  }]

  public goalsColor: Array<any> = [{

    backgroundColor: 'rgba(120, 140, 185,0.2)',
    borderColor: 'rgba(120, 140, 185,1)',
    pointBackgroundColor: 'rgba(120, 140, 185,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(120, 140, 185,0.8)'
  }]



  constructor(
    public _leads: LeadService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public instanceService: InstanceService,
    public modalService: NgbModal,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {

    if (this.id) {
      this.instanceService.getParameters(this.id).subscribe( ins => {
        if (ins.code === '1709') {
          this.canPlay = true;
          this.params = ins.params
          console.log(this.params);
          gameParameters.nObjective = parseInt(ins.params.nObjective, 10)
        }
      });
    }
  }

  startSimulation() {
    this.initGame = true;
    this.oportunities$ = this._leads.getOportunities();
    this.visits$ = this._leads.getVisits();
    this.offers$ = this._leads.getOffers();
    this.contracts$ = this._leads.getContracts();

    this.rConvertionChartLabels = ['Customers', 'Leads'];

    this.randomVisitDur();
    this.randomOfferDur();
    this.randomContractDur();
  }

  finalizeSimulation() {
    this.initGame = false;

    if (this.canPlay) {
      this.sendData();
      this.open(this.paramsModal);
    }

    this.cEfficiencyChartData.length = 0;
    this.rConvertionChartData.length = 0;
    this.rConvertionChartLabels.length = 0;
    this.goalsChartData.length = 0;
    this.goalsChartLabels.length = 0;

    this.contractGreen = 0;
    this.contractRed = 0;

    this.tLeads = 0;
    this.tLeadsVisitM = 0;
    this.tLeadsVisitF = 0;

    this.totalContractTime = 0;
    this.totalTime = 0;
    this._leads.clear();
  }

  createIndividual() {
    if (!this.initGame) { this.initGameMessage(); return null; }

    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    this.totalTime += gameParameters.oportunity.time.cIndividual;
    const status = this.randomColor(
      gameParameters.oportunity.probability.cIndividual.green,
      gameParameters.oportunity.probability.cIndividual.orange,
      gameParameters.oportunity.probability.cIndividual.red);

    this.tLeads += 1;

    const lead = new Lead( this.tLeads, status, this.totalTime, this.randomGender(), 'oportunity', 0, false, 0, 0);
    lead.timeUsed += gameParameters.oportunity.time.cIndividual;
    this._leads.addOportunity(lead);
    this.rConvertionChartData = [this.contractGreen, this.tLeads - this.contractGreen];
    this.verifyInactivity()
    this.verifyFreeTrial();
  }

  createGroup() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= 30240) { this.finalizeSimulation(); return null; }

    this.totalTime += gameParameters.oportunity.time.cGroup * gameParameters.nOpoGr

    for (let index = 0; index < gameParameters.nOpoGr; index++) {
      const status = this.randomColor(
        gameParameters.oportunity.probability.cGroup.green,
        gameParameters.oportunity.probability.cGroup.orange,
        gameParameters.oportunity.probability.cGroup.red);

      this.tLeads += 1;

      const lead = new Lead( this.tLeads, status, this.totalTime, this.randomGender(), 'oportunity', 0, false, 0, 0);
      lead.timeUsed += gameParameters.oportunity.time.cGroup;
      this._leads.addOportunity(lead);
      this.rConvertionChartData = [this.contractGreen, this.tLeads - this.contractGreen];
    }
    this.verifyInactivity();
    this.verifyFreeTrial();
  }

  onSelectionOporChange(lead) {
    this.selectedLeadOpor = lead;
  }

  onSelectionVisitChange(lead) {
    this.selectedLeadVisi = lead;
  }

  onSelectionOfferChange(lead) {
    this.selectedLeadOffe = lead;
  }

  onSelectionContractChange(lead) {
    this.selectedLeadCont = lead;
  }

  verify() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    if (this.selectedLeadOpor) {
      this.totalTime += gameParameters.oportunity.time.verify;
      const lead = this.selectedLeadOpor
      if (lead.status === 'green') {
        lead.status = this.randomColor(
          gameParameters.oportunity.probability.verify.green.green,
          gameParameters.oportunity.probability.verify.green.orange,
          gameParameters.oportunity.probability.verify.green.red)
      } else if (lead.status === 'orange') {
        lead.status = this.randomColor(
          gameParameters.oportunity.probability.verify.orange.green,
          gameParameters.oportunity.probability.verify.orange.orange,
          gameParameters.oportunity.probability.verify.orange.red)
      } else {
        lead.status = this.randomColor(
          gameParameters.oportunity.probability.verify.red.green,
          gameParameters.oportunity.probability.verify.red.orange,
          gameParameters.oportunity.probability.verify.red.red)
      }

      if (lead.status === 'green' || lead.status === 'orange') {
        lead.timeUsed += gameParameters.oportunity.time.verify;
        lead.situation = 'visit';
        lead.lastAction = this.totalTime

        switch (lead.gender) {
          case 'm':
            this.tLeadsVisitM++;
            lead.idImage = (this.tLeadsVisitM % 20) + 1
            break;
          case 'f':
            this.tLeadsVisitF++;
            lead.idImage = (this.tLeadsVisitF % 20) + 1
            break;
        }


        this._leads.addVisit(lead)

      }

      this._leads.removeOportunity(lead.id);
      this.selectedLeadOpor = null;
      this.verifyInactivity();
      this.verifyFreeTrial();
    }
  }

  /*********************
   * METHODS FOR VISIT *
   *********************/

  preMin() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    if (this.selectedLeadVisi) {
      if (this.selectedLeadVisi.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
      }else if (this.selectedLeadVisi.preVisit === 0) {
        this.selectedLeadVisi.preVisit = 10;
        this.totalTime += gameParameters.visit.time.preMin;
        this.selectedLeadVisi.timeUsed += gameParameters.visit.time.preMin;
        this.selectedLeadVisi.lastAction = this.totalTime;
        this.verifyInactivity();
        this.verifyFreeTrial();
      }
    }
  }

  preMed() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    if (this.selectedLeadVisi) {
      if (this.selectedLeadVisi.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
      } else if (this.selectedLeadVisi.preVisit === 0) {
        this.selectedLeadVisi.preVisit = 50;
        this.totalTime += gameParameters.visit.time.preMed;
        this.selectedLeadVisi.timeUsed += gameParameters.visit.time.preMed;
        this.selectedLeadVisi.lastAction = this.totalTime;
        this.verifyInactivity();
        this.verifyFreeTrial();
      }
    }
  }

  preMax() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= 30240) { this.finalizeSimulation(); return null; }

    if (this.selectedLeadVisi) {
      if (this.selectedLeadVisi.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
      } else if (this.selectedLeadVisi.preVisit === 0) {
        this.selectedLeadVisi.preVisit = 90;
        this.totalTime += gameParameters.visit.time.preMax;
        this.selectedLeadVisi.timeUsed += gameParameters.visit.time.preMax;
        this.selectedLeadVisi.lastAction = this.totalTime;
        this.verifyInactivity();
        this.verifyFreeTrial();
      }
    }
  }

  toVisit() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    const lead = this.selectedLeadVisi
    if (lead) {
      if (lead.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
      } else if (lead.preVisit !== 0) {
        switch (lead.preVisit) {
          case 10:
            switch (lead.status) {
              case 'green':
                lead.status = this.randomColor(
                  gameParameters.visit.probability.preMin.green.green,
                  gameParameters.visit.probability.preMin.green.orange,
                  gameParameters.visit.probability.preMin.green.red
                )
                break;
              case 'orange':
                lead.status = this.randomColor(
                  gameParameters.visit.probability.preMin.orange.green,
                  gameParameters.visit.probability.preMin.orange.orange,
                  gameParameters.visit.probability.preMin.orange.red
                )
                break;
              case 'red':
                this.toastr.error('No buying propensity', 'Inactive lead');
                break;
            }
            break;

          case 50:
            switch (lead.status) {
              case 'green':
                lead.status = this.randomColor(
                  gameParameters.visit.probability.preMed.green.green,
                  gameParameters.visit.probability.preMed.green.orange,
                  gameParameters.visit.probability.preMed.green.red
                )
                break;
              case 'orange':
                lead.status = this.randomColor(
                  gameParameters.visit.probability.preMed.orange.green,
                  gameParameters.visit.probability.preMed.orange.orange,
                  gameParameters.visit.probability.preMed.orange.red
                )
                break;
            }
            break;
          case 90:
            switch (lead.status) {
              case 'green':
                lead.status = this.randomColor(
                  gameParameters.visit.probability.preMax.green.green,
                  gameParameters.visit.probability.preMax.green.orange,
                  gameParameters.visit.probability.preMax.green.red
                )
                break;
              case 'orange':
                lead.status = this.randomColor(
                  gameParameters.visit.probability.preMax.orange.green,
                  gameParameters.visit.probability.preMax.orange.orange,
                  gameParameters.visit.probability.preMax.orange.red
                )
                break;
              case 'red':
                this.toastr.error('No buying propensity', 'Inactive lead');
                break;
            }
          break;
        }
        if (lead.status !== 'red') {
          lead.situation = 'offer';
          lead.timeUsed += this.visitDuration;
          lead.lastAction = this.totalTime;
          this._leads.addOffer(lead);
        }

        this.totalTime += this.visitDuration;
        this._leads.removeVisit(lead.id);
        this.randomVisitDur();
        this.selectedLeadVisi = null;
        this.verifyInactivity();
        this.verifyFreeTrial();
      } else {
        this.toastr.warning('Visit preparation required');
      }
    }
  }

  /****************************
   * END OF METHODS FOR VISIT *
   ****************************/

  makeOffer() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    if (this.selectedLeadOffe) {
      if (this.selectedLeadOffe.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
      } else if (!this.selectedLeadOffe.preOffer) {
        this.totalTime += gameParameters.offer.time.makeOffer
        this.selectedLeadOffe.timeUsed += gameParameters.offer.time.makeOffer;
        this.selectedLeadOffe.lastAction = this.totalTime
        this.selectedLeadOffe.preOffer = true;
        this.verifyInactivity();
        this.verifyFreeTrial();
      }
    }
  }

  toOffer() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

     if (this.selectedLeadOffe) {
      const lead = this.selectedLeadOffe
      this.selectedLeadCont = null;
      if (lead.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
      } else if (lead.preOffer) {
        this.totalTime += this.offerDuration;
        lead.lastAction = this.totalTime;
        lead.timeUsed += this.offerDuration;
        this._leads.addContract(lead);
        this._leads.removeOffer(lead.id);
        this.randomOfferDur();
        this.selectedLeadOffe = null;
        this.verifyInactivity();
        this.verifyFreeTrial();
      } else {
        this.toastr.warning('Offer most by prepared before presentation');
      }
    }
  }

  toReunion() {
    if (!this.initGame) { this.initGameMessage(); return null; }
    if (this.totalTime >= this.gameTime) { this.finalizeSimulation(); return null; }

    const lead = this.selectedLeadCont
    this.selectedLeadCont = null;
    if (lead) {
      if (lead.status === 'red') {
        this.toastr.error('Buying propensity loss', 'Inactive lead');
        return null;
      }
      let contract;
      switch (lead.status) {
        case 'green':
          contract = this.randomColor(
            gameParameters.contract.probability.contract.green.green,
            0,
            gameParameters.contract.probability.contract.green.red
          )
          break;
        case 'orange':
          contract = this.randomColor(
            gameParameters.contract.probability.contract.orange.green,
            0,
            gameParameters.contract.probability.contract.orange.red
          )
          break;
      }

      if (contract === 'green') {
        this.contractGreen++;
        lead.timeUsed += this.contractDuration;
        this.totalContractTime += lead.timeUsed;

        this.cEfficiencyChartData.push((this.totalContractTime / this.totalTime) * 100);
        this.cEfficiencyChartLabels.push(Math.floor(this.totalTime / 480));
        this.cEfficiencyChart.chart.update();
      } else {
        this.contractRed++;
      }
      this.goalsChartData.push((this.contractGreen / gameParameters.nObjective) * 100);
      this.goalsChartLabels.push(Math.floor(this.totalTime / 480));
      this.goalsChart.chart.update();

      this.totalTime += this.contractDuration;
      this.rConvertionChartData = [this.contractGreen, this.tLeads - this.contractGreen];
      this._leads.removeContract(lead.id);
      this.randomContractDur();
      this.selectedLeadCont = null
      this.verifyInactivity();
      this.verifyFreeTrial();
    } else {
      this.toastr.error('Select lead');
    }
  }

  randomColor(pGreen, pOrange, pRed) {
    const r = Math.floor(Math.random() * 100) + 1;
    if (r <= pGreen) {
      return 'green';
    } else if (r <= (pGreen + pOrange)) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  randomGender() {
    const r = Math.floor(Math.random() * 100) + 1;
    if (r <= 50) {
      return 'f';
    } else {
      return 'm';
    }
  }

  randomTime(p1, p2, p3, p4, p5, r1, r2, r3, r4, r5) {
    const r = Math.floor(Math.random() * 100) + 1;
    if (r <= p1) { return r1; }
    if (r <= (p1 + p2)) { return r2; }
    if (r <= (p1 + p2 + p3)) { return r3; }
    if (r <= (p1 + p2 + p3 + p4)) { return r4; }
    return r5;
  }

  randomVisitDur() {
    this.visitDuration = this.randomTime(
      gameParameters.visit.probability.visitLen.r1,
      gameParameters.visit.probability.visitLen.r2,
      gameParameters.visit.probability.visitLen.r3,
      gameParameters.visit.probability.visitLen.r4,
      gameParameters.visit.probability.visitLen.r5,
      gameParameters.visit.time.visitLen.r1,
      gameParameters.visit.time.visitLen.r2,
      gameParameters.visit.time.visitLen.r3,
      gameParameters.visit.time.visitLen.r4,
      gameParameters.visit.time.visitLen.r5
    )
  }

  verifyInactivity() {
    this.visits$.subscribe( (leads) => {
      leads.forEach(lead => {
        if ((this.totalTime - lead.lastAction) > 1920) {
          lead.status = 'red'
        }
      });
    });

    this.offers$.subscribe( (leads) => {
      leads.forEach(lead => {
        if ((this.totalTime - lead.lastAction) > 1920) {
          lead.status = 'red'
        }
      });
    });

    this.contracts$.subscribe( (leads) => {
      leads.forEach(lead => {
        if ((this.totalTime - lead.lastAction) > 1920) {
          lead.status = 'red'
        }
      });
    });
  }

  randomOfferDur() {
    this.offerDuration = this.randomTime(
      gameParameters.offer.probability.preOffer.r1,
      gameParameters.offer.probability.preOffer.r2,
      gameParameters.offer.probability.preOffer.r3,
      gameParameters.offer.probability.preOffer.r4,
      gameParameters.offer.probability.preOffer.r5,
      gameParameters.offer.time.preOffer.r1,
      gameParameters.offer.time.preOffer.r2,
      gameParameters.offer.time.preOffer.r3,
      gameParameters.offer.time.preOffer.r4,
      gameParameters.offer.time.preOffer.r5,
    )
  }

  randomContractDur() {
    this.contractDuration = this.randomTime(
      gameParameters.contract.probability.reuDuration.r1,
      gameParameters.contract.probability.reuDuration.r2,
      gameParameters.contract.probability.reuDuration.r3,
      gameParameters.contract.probability.reuDuration.r4,
      gameParameters.contract.probability.reuDuration.r5,
      gameParameters.contract.time.reuDuration.r1,
      gameParameters.contract.time.reuDuration.r2,
      gameParameters.contract.time.reuDuration.r3,
      gameParameters.contract.time.reuDuration.r4,
      gameParameters.contract.time.reuDuration.r5,
    )
  }

  initGameMessage() {
    this.toastr.success('Please, start simulation');
  }


  verifyFreeTrial() {
    if (!this.canPlay) {
      console.log(this.totalTime);
      if (this.totalTime >= this.freeTrialTime) {
        this.open(this.getGameModal);
        this.finalizeSimulation();
      }
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  sendData() {
    this.log = {
      cEfficiency: ((this.totalContractTime / this.totalTime) * 100).toFixed(2),
      rConvertion: ((this.contractGreen / this.tLeads) * 100).toFixed(2),
      contractGreen: this.contractGreen,
      tLeads: this.tLeads,
      aGoals: ( (this.contractGreen / gameParameters.nObjective) * 100).toFixed(2),
      time: this.totalTime,
    }

    this.instanceService.saveLog(this.id, this.log).subscribe(res => {
      console.log(res);
    })
  }

  goTo(anchor: string) {
    // TODO - HACK: remove click once https://github.com/angular/angular/issues/6595 is fixed
    (<HTMLScriptElement>document.querySelector('#' + anchor)).scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
