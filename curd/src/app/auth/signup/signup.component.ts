import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup: FormGroup;

  constructor(private router:Router) { 
    this.signup=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.nullValidator,Validators.minLength(3),Validators.maxLength(12)]), 
      // recaptcha:new FormControl ('', Validators.required)
    })
  }

  ngOnInit(): void {
  }
onsubmit(){
  this.router.navigate(['auth/login'])
}
login(){
  this.router.navigate(['auth/login'])
}
}