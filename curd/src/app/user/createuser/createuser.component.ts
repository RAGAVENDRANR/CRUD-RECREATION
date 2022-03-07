import { ApiService } from './../../add-ons/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  addtion=true;
  changeform=false;
  id!: string;
  dataform!: FormGroup;
  users:any=[];
  responsedata: any;
  constructor(private router:Router,  private route: ActivatedRoute,private formBuilder: FormBuilder,
    private api:ApiService) { }

  ngOnInit(){
     this.id = this.route.snapshot.params['id'] 
    this.addtion=!this.id
     this.dataform = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.minLength(6),Validators.required , Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(6),Validators.required ,Validators.nullValidator]]
  });
this.api.getAll().subscribe((res:any)=>this.responsedata=res),
console.log(this.responsedata)
    }

  
  get f() { return this.dataform.controls}
  
  formchange(){
    this.changeform=!this.changeform
  }

  onSubmit(){
    console.log(this.dataform.value)
    this.users.push(this.dataform.value);
    this.api.create(this.dataform.value);
    console.log(this.users)
    this.dataform.reset()
    this.router.navigate(['/user'])
  }
clear(){
  this.dataform.reset()
  this.router.navigate(['/user'])
}
}
