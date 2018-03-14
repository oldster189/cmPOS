import { SqliteManagerProvider } from './../../providers/sqlite-manager/sqlite-manager';
import { TransactionDetailPage } from './../transaction-detail/transaction-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { Orders } from '../../models/orders'; 

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  today = Date.now()
  orders: Orders[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private sqliteManager: SqliteManagerProvider
  ) {    
  }
 

  ionViewDidLoad() {
    this.getTransaction(); 
  }
 
  getTransaction() { 
    this.sqliteManager.getTransaction().subscribe(data => {
      this.orders = data;
    });
  }

  goToTransactionDetail(order: Orders) {
    this.navCtrl.push(TransactionDetailPage, { data: order });
  }

}
