import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;

  constructor() { 
    this.loginform=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.nullValidator,Validators.minLength(3),Validators.maxLength(12)]), 
      recaptcha:new FormControl ('', Validators.required)
    })
  }

  ngOnInit(): void {
  }
onsubmit(){
  console.log(this.loginform.value)
}
}
