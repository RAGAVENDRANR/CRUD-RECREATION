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
  submitted = false;
  id!: string;
  dataform!: FormGroup;
  users:any=[];
  constructor(private router:Router,  private route: ActivatedRoute,private formBuilder: FormBuilder) { }

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

    }

  
  get f() { return this.dataform.controls}
  
  formchange(){
    this.changeform=!this.changeform
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.dataform.value)
    this.dataform.reset()
    this.users.push(this.dataform.value);
    this.router.navigate(['/user'])
  }
clear(){
  this.dataform.reset()
  this.router.navigate(['/user'])
}
}
