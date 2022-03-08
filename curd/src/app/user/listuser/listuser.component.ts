import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/add-ons/api.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  datalist:any=[]
  responsedata:any=[]
  constructor(public router:Router,private api:ApiService) { }
 
  ngOnInit(): void {
    console.log("component inatilized")
    this.api.getAll().subscribe((response:any)=>this.datalist=response);
    
  }
  updateuser(){
    this.api.editvalue=true;
    this.router.navigate(['user/createuser']) 
  }

  deleteUser(id:any){
    this.api.delete(id)
        .pipe(first())
        .subscribe(() => this.datalist = this.datalist.filter((x: { id: any; }) => x.id !== id));
  };

  formchange(){
  this.router.navigate(['/user/createuser']);
  }
}
