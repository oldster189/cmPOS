import { SqliteManagerProvider } from './../../providers/sqlite-manager/sqlite-manager';
import { TransactionDetailPage } from './../transaction-detail/transaction-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Orders } from '../../models/orders';
import { ActionSheetController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  today = Date.now()
  orders: Orders[] = [];
  titleFilter:string = "Latest";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqliteManager: SqliteManagerProvider,
  public actionSheetCtrl: ActionSheetController
  ) {
  }


  ionViewDidLoad() {
    this.getTransaction('latest');
  }

  getTransaction(type:string) {
    this.sqliteManager.getTransaction(type).subscribe(data => {
      this.orders = data;
    });
  }

  goToTransactionDetail(order: Orders) {
    this.navCtrl.push(TransactionDetailPage, { data: order });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Latest',
          handler: () => {
            this.titleFilter = "Latest";
            this.getTransaction('latest');
          }
        },{
          text: 'Daily',
          handler: () => {
            this.titleFilter = "Daily";
            this.getTransaction('daily');
          }
        },{
          text: 'Weekly',
          handler: () => {
            this.titleFilter = "Weekly";
            this.getTransaction('weekly');
          }
        },{
          text: 'Monthly',
          handler: () => {
            this.titleFilter = "Monthly";
            this.getTransaction('monthly');
          }
        },{
          text: 'Yearly',
          handler: () => {
            this.titleFilter = "Yearly";
            this.getTransaction('yearly');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

}
