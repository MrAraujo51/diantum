import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { InstanceService } from '../../../service/instance.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  public initGame = false;
  public id = localStorage.getItem('GID');
  public header= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  public start = 0;
  public data= [[], [], [], []];
  public periodo = 0;
  public params: any;
  public inventario: number;
  public demanda: number;
  public demandaTotal = 0;
  public ventasTotales = 0;
  public costosTotales = 0;
  public costoVentasTotales = 0;
  public enCamino = {};
  public pedido = 0;
  public randomDemand: number;
  public closeResult: string;
  public canPlay = false;
  public log;

  rForm: FormGroup;

  @ViewChild('getGameModal') public getGameModal;
  @ViewChild('paramsModal') public paramsModal;

  /**
   * Graficas
   *
   * color: rgb(165,0,33) ----> Nivel de servicio
   * color: rgba(120,140,185) ----> Rentabilidad
   */
  @ViewChild ('serviceLevel')  serviceLevelChart: BaseChartDirective;
  @ViewChild ('rentabillity')  rentabillityChart: BaseChartDirective;

  public lineChartType = 'line';
  // public lineChartData:Array<any>;
  // public lineChartLabels:Array<any>
  public lineChartOptions: any = {
    responsive: true
  };
  public serviceLevelChartData: Array<any> = [];
  public rentabillityChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];

  /**
   *
   * ventasTotales / demandaTotal ---> Nivel de Servicio
   * VentasTotales - costosTotales / costosTotales ---> Rentabilidad
   */
  public serviceLevelColor: Array<any> = [
    {
      backgroundColor: 'rgba(165,0,33,0.2)',
      borderColor: 'rgba(165,0,33,1)',
      pointBackgroundColor: 'rgba(165,0,33,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(165,0,33,0.8)'
    }]

  public rentabillityColor: Array<any> = [
    {
      backgroundColor: 'rgba(120,140,185,0.2)',
      borderColor: 'rgba(120,140,185,1)',
      pointBackgroundColor: 'rgba(120,140,185,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(120,140,185,0.8)'
    }]

  constructor(
    public productService: ProductService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router,
    public instanceService: InstanceService,
    public modalService: NgbModal,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.rForm = formBuilder.group ({
      'deliveryTerm': [null, Validators.required],
      'demandVariabilityStart': [null, Validators.required],
      'demandVariabilityEnd': [null, Validators.required],
      'initIventory': [null, Validators.required],
      'unitCostInventory': [null, Validators.required],
      'unitCostOpportunity': [null, Validators.required],
      'unitCostPurchase': [null, Validators.required],
      'unitCostSelling': [null, Validators.required],
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.initGame = false;
    // Default parameters
    this.params = {
      plazoEntrega: 3,
      inventarioInicial: 5,
      costeUnitario: {
          venta: 5,
          compra: 1,
          oportunidad: 1.5,
          inventario: 1
      },
      variabilidad: {
          end: 10,
          start: 0
      }
    }

    if (this.id) {
      this.instanceService.getParameters(this.id).subscribe( ins => {
        if (ins.code === '1701') {
          this.canPlay = true;
          this.params.plazoEntrega = parseInt(ins.params.plazoEntrega, 10);
          this.params.inventarioInicial = parseInt(ins.params.inventarioInicial, 10);
          this.params.costeUnitario.venta = parseInt(ins.params.precioV, 10)
          this.params.variabilidad.start = parseInt(ins.params.variabilidad.split('-')[0], 10);
          this.params.variabilidad.end = parseInt(ins.params.variabilidad.split('-')[1], 10);
          console.log(this.params);

        }
      });
    }
    this.resetData();
  }

  startSimulation() {
    this.initGame = true;
    if (this.periodo > 0) { this.resetData(); }
    this.inventario = this.params.inventarioInicial
    this.randomDemand = parseInt(this.randomNumber(this.params.variabilidad.start, this.params.variabilidad.end))
    while (this.randomDemand === 0) {
      this.randomDemand = parseInt(this.randomNumber(this.params.variabilidad.start, this.params.variabilidad.end))
    }
    this.demanda = this.randomDemand
    this.demandaTotal = this.demanda;
    this.data[0][this.periodo] = this.demanda
    this.data[1][this.periodo] = this.params.inventarioInicial
  }

  finalizeSimulation() {
    this.initGame = false;
    if (this.canPlay) {
      this.sendData();
    }else {
    this.open(this.getGameModal);
    }
    this.resetData();
  }

  resetData() {
    this.header = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    this.data = [[], [], [], []];
    for (let index = 0; index < 20; index++) {
      this.header[index] = index + 1;
      this.data[0][index] = 0;
      this.data[1][index] = 0;
      this.data[2][index] = 0;
      this.data[3][index] = 0;
    }
    this.enCamino = {};
    this.serviceLevelChartData.length = 0;
    this.rentabillityChartData.length = 0;
    this.lineChartLabels.length = 0;

    this.start = 0;
    this.periodo = 0;
    this.ventasTotales = 0;
    this.demandaTotal = 0;
    this.costosTotales = 0;
    this.costoVentasTotales = 0;
  }

  pedir() {
    let ventas;
    if (this.periodo >= 19 - this.params.plazoEntrega && this.periodo + this.params.plazoEntrega < 39) {
       this.start++
       this.addColumn()
    }
    this.enCamino[(this.periodo + this.params.plazoEntrega)] = this.pedido;

    if (this.demanda > this.inventario) {
      this.demanda -= this.inventario;
      ventas = this.inventario
      this.ventasTotales += this.inventario
      this.inventario = 0
    } else {
      this.inventario -= this.demanda
      ventas = this.demanda
      this.ventasTotales += this.demanda
      this.demanda = 0;
    }

    this.costosTotales += this.params.costeUnitario.inventario * this.inventario;
    this.costosTotales += this.params.costeUnitario.oportunidad * this.demanda;
    this.costosTotales += this.params.costeUnitario.compra * this.pedido;
    this.costoVentasTotales += this.params.costeUnitario.venta * ventas;


    this.serviceLevelChartData.push((this.ventasTotales / this.demandaTotal) * 100);
    this.rentabillityChartData.push(((this.costoVentasTotales - this.costosTotales) / this.costoVentasTotales) * 100)
    this.lineChartLabels.push(this.periodo + 1);
    this.serviceLevelChart.chart.update();
    this.rentabillityChart.chart.update();


    this.randomDemand = parseInt(this.randomNumber(this.params.variabilidad.start, this.params.variabilidad.end))
    this.demanda += this.randomDemand
    this.demandaTotal += this.randomDemand

    if ((this.periodo + this.params.plazoEntrega) < 39) {
      this.data[2][(this.periodo + this.params.plazoEntrega)] = this.pedido
    }

    if (this.periodo < 39) {
      if (this.enCamino[this.periodo + 1]) {
        this.inventario += parseInt(this.enCamino[this.periodo + 1])
        this.data[2][(this.periodo + 1 )] = 0
      }
      this.data[0][this.periodo + 1] = this.demanda
      this.data[1][this.periodo + 1] = this.inventario
    }
    this.data[3][this.periodo] = this.pedido
    this.periodo =  this.periodo + 1;
    if (this.periodo === 40) {
      this.finalizeSimulation();
      this.open(this.paramsModal);
    }
    if (this.periodo === 4) {
      if (!this.authService.loggedIn() || !localStorage.getItem('GID') || !this.canPlay) {
        this.finalizeSimulation();
      }
    }
  }

  addColumn() {
    this.header.push(this.periodo + 2 + this.params.plazoEntrega);
    this.data[0].push(0);
    this.data[1].push(0);
    this.data[2].push(0);
    this.data[3].push(0);
  }

  deleteColumn() {
    this.header.splice(0, 1);
    this.data[0].splice(0, 1);
    this.data[1].splice(0, 1);
    this.data[2].splice(0, 1);
    this.data[3].splice(0, 1);
  }

  randomNumber(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  changeValues() {
    const newParameters = {
      _id: this.id,
      plazoEntrega: this.rForm.get('deliveryTerm').value,
      variabilidad: {
          start: this.rForm.get('demandVariabilityStart').value,
          end: this.rForm.get('demandVariabilityEnd').value,
      },
      inventarioInicial: this.rForm.get('initIventory').value,
      costeUnitario: {
          inventario: this.rForm.get('unitCostInventory').value,
          oportunidad: this.rForm.get('unitCostOpportunity').value,
          compra: this.rForm.get('unitCostPurchase').value,
          venta: this.rForm.get('unitCostSelling').value,
      }
    }

    this.productService.updateProduct(newParameters).subscribe(data => {

    })
  }

  sendData() {
    this.log = {
      // tslint:disable-next-line:max-line-length
      parameters: ` ${this.params.plazoEntrega}/${this.params.variabilidad.start}/${this.params.variabilidad.end}/${this.params.inventarioInicial}/${this.params.costeUnitario.inventario}/${this.params.costeUnitario.oportunidad}/${this.params.costeUnitario.compra}/${this.params.costeUnitario.venta}`,
      rentability: (((this.costoVentasTotales - this.costosTotales) / this.costoVentasTotales) * 100).toFixed(2),
      lservice: ((this.ventasTotales / this.demandaTotal) * 100).toFixed(2),
      periodo: this.periodo,

    }

    this.instanceService.saveLog(this.id, this.log).subscribe( data => {
    });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  open(content) {
    this.modalService.open(content);
  }

  onOrder(event) {
    if (event.target.value < 0) { this.pedido = 0}
    if (event.target.value > 10) { this.pedido = 10}
  }

  goTo(anchor: string) {
    // TODO - HACK: remove click once https://github.com/angular/angular/issues/6595 is fixed
    (<HTMLScriptElement>document.querySelector('#' + anchor)).scrollIntoView({block: 'start', behavior: 'smooth'});
}

}
