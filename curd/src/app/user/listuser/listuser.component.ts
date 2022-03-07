import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/add-ons/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  constructor(public router:Router,private api:ApiService) { }
  datalist:any=[]

  ngOnInit(): void {
    this.api.getAll()
    .subscribe((response:any)=>this.datalist=response);
  }
  deleteUser(){};
  formchange(){
this.router.navigate(['/user/createuser'])
  }
}
