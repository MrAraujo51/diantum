import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

export class Lead {
  constructor(
    public id: number,                // Id del Lead
    public status: string,            // Estatus del lead (gree, orange, red)
    public lastAction: number,        // Minuto de la ultima accion hecha sobre el
    public gender: string,            // Genero del lead (m, f)
    public situation: string,         // Situacion del lead (oportunity, visit, offer, contract)
    public preVisit: number,          // Preparacion de la visita (0 - no preparada, 10 - corta, 50 - media, 90 - alta)
    public preOffer: boolean,          // Preparacion de oferta realizada (true, false)
    public timeUsed: number,          // Tiempo usado por el lead en el juego
    public idImage: number,           // Numero de imagen asignado
  ) {

  }
}

@Injectable()
export class LeadService {

  public oportunities: Array<Lead> = [];
  public visits: Array<Lead> = [];
  public offers: Array<Lead> = [];
  public contracts: Array<Lead> = [];

  getOportunities() { return Observable.of(this.oportunities); }

  getVisits() { return Observable.of(this.visits); }

  getOffers() { return Observable.of(this.offers); }

  getContracts() { return Observable.of(this.contracts); }

  getOportunity(id: number | string ) {
    return this.getOportunities()
      // (+) before `id` turns the string into a number
      .map(leads => leads.find(lead => lead.id === +id ));
  }

  getVisit(id: number | string) {
    return this.getVisits()
      // (+) before `id` turns the string into a number
      .map(leads => leads.find(lead => lead.id === +id));
  }

  getOffer(id: number | string) {
    return this.getOffers()
      // (+) before `id` turns the string into a number
      .map(leads => leads.find(lead => lead.id === +id));
  }

  getContract(id: number | string) {
    return this.getContracts()
      // (+) before `id` turns the string into a number
      .map(leads => leads.find(lead => lead.id === +id));
  }

  addOportunity(lead: Lead) {
    this.oportunities.push(lead);
  }

  addVisit(lead: Lead) {
    this.visits.push(lead);
  }

  addOffer(lead: Lead) {
    this.offers.push(lead);
  }

  addContract(lead: Lead) {
    this.contracts.push(lead);
  }

  removeOportunity(id) {
    const idx = this.oportunities.findIndex(lead => lead.id === id);
    if (idx > -1) {
      this.oportunities.splice(idx, 1);
    }
  }

  removeVisit(id) {
    const idx = this.visits.findIndex( lead => lead.id === id);
    if (idx > -1) {
      this.visits.splice(idx, 1);
    }
  }

  removeOffer(id) {
    const idx = this.offers.findIndex( lead => lead.id === id);
    if (idx > -1) {
      this.offers.splice(idx, 1);
    }
  }

  removeContract(id) {
    const idx = this.contracts.findIndex( lead => lead.id === id);
    if (idx > -1) {
      this.contracts.splice(idx, 1);
    }
  }

  clear() {
    this.oportunities.length = 0;
    this.visits.length = 0;
    this.offers.length = 0;
    this.contracts.length = 0;
  }
}
