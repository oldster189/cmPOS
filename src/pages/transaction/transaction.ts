import {SqliteManagerProvider} from './../../providers/sqlite-manager/sqlite-manager';
import {TransactionDetailPage} from './../transaction-detail/transaction-detail';
import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, Searchbar} from 'ionic-angular';
import {Orders} from '../../models/orders';
import {ActionSheetController} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  @ViewChild('mainSearchbar') searchBar: Searchbar;

  isSearch = false;
  orderGroups = [];
  orderGroupsFilter = [];
  orders: Orders[] = [];
  ordersFilter: Orders[] = [];
  titleFilter: string = "Latest";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sqliteManager: SqliteManagerProvider,
              public actionSheetCtrl: ActionSheetController,
              private platform: Platform) {
  }


  ionViewDidLoad() {
    this.getTransaction();
  }

  getTransaction() {
    this.platform.ready().then(() => {
      this.sqliteManager.getTransaction().subscribe(data => {
        this.orders = data;
        this.groupOrders(data);
      });
    });
  }

  groupOrders(orders:Orders[]) {
    this.orderGroupsFilter = [];
    let currentLetter = "A";
    let currentOrders = [];
    orders.forEach((value, index) => {

      if(value.timestamp.substring(0, 10) != currentLetter){
        currentLetter = value.timestamp.substring(0, 10);

        let newGroup = {
          section: currentLetter,
          orders: []
        };

        currentOrders = newGroup.orders;
        this.orderGroupsFilter.push(newGroup);

      }

      currentOrders.push(value);

    });

  }

  goToTransactionDetail(order: Orders) {
    this.navCtrl.push(TransactionDetailPage, {data: order});
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Latest',
          handler: () => {
            this.titleFilter = "Latest";
            // this.getTransaction('latest');
          }
        }, {
          text: 'Daily',
          handler: () => {
            this.titleFilter = "Daily";
            // this.getTransaction('daily');
          }
        }, {
          text: 'Weekly',
          handler: () => {
            this.titleFilter = "Weekly";
            // this.getTransaction('weekly');
          }
        }, {
          text: 'Monthly',
          handler: () => {
            this.titleFilter = "Monthly";
            // this.getTransaction('monthly');
          }
        }, {
          text: 'Yearly',
          handler: () => {
            this.titleFilter = "Yearly";
            // this.getTransaction('yearly');
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


  searchItems(ev: any) {
    let val = ev.target.value;
    console.log(val);
    if (val !== undefined) {
      if (val && val.trim() != '') {
          this.ordersFilter = this.orders.filter((data) => {
            return ((data.order_id + "").indexOf(parseInt(val.toLowerCase())+"") > -1)
          });
          this.groupOrders(this.ordersFilter);
      }else{
        this.groupOrders(this.orders);
      }
    } else {
      console.log("ss");
      this.isSearch = false;
      this.groupOrders(this.orders);
    }
  }

  onSearchCancel() {
    this.isSearch = false;
    this.groupOrders(this.orders);
  }

  onSearchShow() {
    this.isSearch = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }

}
