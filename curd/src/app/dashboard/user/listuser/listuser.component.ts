import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/add-ons/api.service';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  // stores the data from the local storage
  datalist:any=[]
 
  constructor(public router:Router,private api:ApiService) { }
 
  // data from the local storage was called 
  ngOnInit(){
    this.api.getAll().subscribe((response:any)=>this.datalist=response)
  }

  // when Edit button clicked here and id was passed to the service
  updateuser(id:any){
    this.api.editvalue=true;
    this.api.idvalue=id
    this.router.navigate(['user/createuser']) 
  }

  //Delete button was clicked and the api call occurs
  deleteUser(id:any){
    this.api.delete(id).subscribe(() => this.datalist = this.datalist.filter((res:any) => res.id !== id))
  }
  
//navigates to the createuser component
  adduser(){this.router.navigate(['/user/createuser'])}
}