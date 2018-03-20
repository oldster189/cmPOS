import { OrderDetail } from './../../models/orderDetail';
import { Orders } from './../../models/orders';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteManagerProvider } from '../../providers/sqlite-manager/sqlite-manager';

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html',
})
export class TransactionDetailPage {

  order: Orders;
  orderDetails: OrderDetail[] = [];
  today = Date.now();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqliteManager: SqliteManagerProvider
  ) {
    this.order = this.navParams.get('data');
  }

  ionViewDidLoad() {
    this.getTransactionDetail();
  }

  getTransactionDetail() {
     this.sqliteManager.getTransactionDetail(this.order.order_id).subscribe(data => {
        this.orderDetails = data;
        console.log("data: "+data);
     });
  }

}
