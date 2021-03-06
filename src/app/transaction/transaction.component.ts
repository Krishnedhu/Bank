import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions:any
  acno:any

  constructor(private ds:DataService) {

    this.acno=this.ds.currentAcno
    this.transactions = this.ds.getTransaction(this.acno)
    console.log(this.transactions);
    
   }

  ngOnInit(): void {
  }

}
