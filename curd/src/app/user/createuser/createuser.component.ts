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
  id!: string;
  dataform!: FormGroup;
  responsedata: any;
  submitted=false;
  newdata:any=[]
  constructor(private router:Router,  private route: ActivatedRoute,private formBuilder: FormBuilder,
    private api:ApiService) { }

  ngOnInit(){
    // this.id = this.route.snapshot.params['id'] 
     this.addtion=this.api.editvalue,
     this.dataform = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.minLength(6),!this.addtion ? Validators.required: Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(6),!this.addtion ? Validators.required :Validators,MustMatch]]
  },Validators.MustMatch('password', 'confirmPassword'));

// if (this.addtion) {
//   this.api.getById(this.id)
//       .pipe(first())
//       .subscribe((ref)=>this.newdata=ref),console.log(this.newdata)}
    
    }
  onFormSubmit() {
    !this.addtion ? this.saved() : this.updated();
  }

  saved(){
    let user =this.dataform.value
    console.log(user)
    this.api.create(user).subscribe((ref:any)=>console.log(ref));
    this.dataform.reset()
    this.router.navigate(['/user'])
  }
  updated(){
    console.log(this.dataform.value)
    this.api.update(this.dataform.value,this.id)
    this.dataform.reset()
    this.router.navigate(['/user'])
    this.api.editvalue=false
  }
clear(){
  this.dataform.reset()
  this.router.navigate(['/user'])
}
}
