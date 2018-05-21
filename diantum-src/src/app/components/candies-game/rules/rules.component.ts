import { Component, OnInit } from '@angular/core';
import { InstanceService } from 'app/service/instance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  public id = localStorage.getItem('GID');
  canPlay = false;

  constructor(
    public instanceService: InstanceService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.id) {
      this.instanceService.getParameters(this.id).subscribe( ins => {
        if (ins.code === '1701') {
          this.canPlay = true;
        } else {
        this.router.navigate(['candies-game'])
        }
      });
    } else {
      this.router.navigate(['candies-game'])
    }
  }

}
