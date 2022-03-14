import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;

  constructor(private router:Router) { 
    this.loginform=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.nullValidator,Validators.minLength(3),Validators.maxLength(12)]), 
      // recaptcha:new FormControl ('', Validators.required)
    })
  }
  ngOnInit(){}
onsubmit(){
  this.loginform.reset()
  this.router.navigate(['dashboard'])
}
signup(){
  this.router.navigate(['auth/signup'])
}
}
