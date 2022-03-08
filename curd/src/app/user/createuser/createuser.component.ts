import { ApiService } from './../../add-ons/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/add-ons/MustMatch';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  addtion!: boolean;
  changeform=false;
  id!: any;
  dataform!: FormGroup;
  responsedata: any;
  submitted=false;
  newdata:any=[];
  updatedarray:any=[];
  constructor(private router:Router,private f: FormBuilder,
    private api:ApiService) { }

  ngOnInit(){
    //id value received from the service
    this.id=this.api.idvalue
    //boolean value for the create and update form diffrentitation
     this.addtion=this.api.editvalue,
    //form was creatition
     this.dataform = this.f.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      //password required for only the create user and will be optional for the update user
      password: ['', [Validators.minLength(6),!this.addtion ? Validators.required: Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(6),!this.addtion ? Validators.required :Validators.nullValidator]]
  },
  //custom password validation
  {
    validator: MustMatch('password', 'confirmPassword')
});
// change the form for update and the id was retrived from the service
if (this.addtion) {
  //check for the id value from the service
  console.log(this.api.idvalue)
//patching the value to the form
  this.api.getById(this.id).subscribe((ref:any)=>{ delete ref.password; this.dataform.patchValue(ref)});
}
}
//method for form submission 
  onFormSubmit() {
    !this.addtion ? this.saved() : this.updated();
  }
//create user method 
  saved(){
    let user =this.dataform.value
    console.log(user)
    //passing the userdetatiles to local storage 
    this.api.create(user).subscribe((ref:any)=>console.log(ref));
    this.dataform.reset()
    this.router.navigate(['/user/listuser'])
  }
// update method for the user
  updated(){
    let user = this.dataform.value
    console.log(user)
    // updating the user detatiles
    this.api.update(user,this.id)
    this.dataform.reset()
    this.updatedarray.clear();
    this.router.navigate(['/user/listuser'])
    // setting the value false for making the form to create user mode
    this.api.editvalue=false
  }

clear(){
  this.dataform.reset()
  this.router.navigate(['/user'])
}
}
