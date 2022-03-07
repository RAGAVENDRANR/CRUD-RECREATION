import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  users=[];
  deleteUser(){};
  formchange(){
this.router.navigate(['/user/createuser'])
  }
}
