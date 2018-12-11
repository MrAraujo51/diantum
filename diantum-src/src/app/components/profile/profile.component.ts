import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,

  ) {

   }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data.profile.user;
    })
  }


}
