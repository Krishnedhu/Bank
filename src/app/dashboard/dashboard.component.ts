import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  acno=""
  pswd=""
  amount=""


  acno1=""
  pswd1=""
  amount1=""


  user:any
  lDate:any
  acc:any

  //deposit group model creation
  depositForm=this.fb.group({
    //form array create
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })


  // /withdraw group model creation
  withdrawForm=this.fb.group({
    //form array create
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user =this.ds.currentUname

    this.lDate = new Date()
  }

  ngOnInit(): void {

    if(!localStorage.getItem("currentAcno")){
      alert("Please Log In")
      this.router.navigateByUrl("")
    }
  }

  deposit(){

    

   var acno = this.depositForm.value.acno
   var pswd = this.depositForm.value.pswd
   var amount = this.depositForm.value.amount

   if(this.depositForm.valid){
     //calling deposit function of dataservice
     const result = this.ds.deposit(acno,pswd,amount)
     if(result){
      alert(amount+"Successfully deposit...And new balance is"+result)
    }

   }
   else{
    alert("Invalid Form")
  }
   
  }


  withdraw(){

   

   var acno = this.withdrawForm.value.acno1
   var pswd = this.withdrawForm.value.pswd1
   var amount = this.withdrawForm.value.amount1
   
   if(this.withdrawForm.valid){

    const result = this.ds.withdraw(acno,pswd,amount)
    if(result){
      alert(amount+"Successfully debited...And new balance is"+result)
    }
  }
  else{
    alert("Invalid Form")
   
  }

  
}

logout(){
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("currentUname")
  this.router.navigateByUrl("")
}


deleteAccount(){
  this.acc=JSON.parse (localStorage.getItem("currentAcno")||'')

}

cancel(){
  this.acc =""
}  

delete(event:any){
alert("Delete account "+event+" from parent")
this.router.navigateByUrl("")

}
}



