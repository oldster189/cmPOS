import {SqliteManagerProvider} from './../../providers/sqlite-manager/sqlite-manager';
import {ProductData} from './../../models/product';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Toast} from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  productsSelect: ProductData[] = [];
  sumPrice: number;
  isShowTypeCash: boolean = true;
  isPayment = true;
  cashAmount: string;
  cardAmount: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sqlite: SQLite,
              private toast: Toast,
              private sqliteManager: SqliteManagerProvider,
              private plt: Platform) {

    this.plt.ready().then(() => {
      this.sqliteManager.createTableOrder();
      this.sqliteManager.createTableOrderDetail();
    });

    this.productsSelect = this.navParams.get('data') || [];
  }

  ionViewDidLoad() {
    this.calculateSumPrice();
  }

  calculateSumPrice() {
    this.sumPrice = 0;
    this.productsSelect.forEach(element => {
      this.sumPrice += (element.price * element.qty);
    });
    this.cashAmount = this.sumPrice.toFixed(2);
    this.cardAmount = this.sumPrice.toFixed(2);
  }

  convert(event: any) {
    this.cashAmount = event.target.value.replace(/[^\d\.]/g, '');
    this.cardAmount = event.target.value.replace(/[^\d\.]/g, '');

    this.isPayment = event.target.value >= this.sumPrice;
  }

  payment() {
    let paid = this.isShowTypeCash ? this.cashAmount : this.cardAmount;
    let paymentType = this.isShowTypeCash ? "Cash" : "Card";
    let counter: number = 0;
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'cmpos.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let date = new Date();
        let newDateTime = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('00' + date.getDate().toString()).slice(-2) + ' ' + ('00' + date.getHours().toString()).slice(-2) + ':' + ('00' + date.getMinutes().toString()).slice(-2) + ':' + date.getSeconds();
        let newDate = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('00' + date.getDate().toString()).slice(-2);

        db.executeSql('INSERT INTO Orders(discount, tax_percent, sub_total, paid,status, payment_type, timestamp, date) VALUES(?,?,?,?,?,?,?,?)', [0, 0.07, this.sumPrice, paid, "success", paymentType, newDateTime, newDate])
          .then(res => {
            this.productsSelect.forEach(element => {
              db.executeSql('INSERT INTO OrderDetail(category_id, image, name, stock, qty, price, category_name, order_id)  VALUES(?,?,?,?,?,?,?,?)', [element._id, element.image, element.name, element.stock, element.qty, element.price, element.category_name, res.insertId])
                .then(res => {
                  console.log(res);
                  counter++;
                  if (counter == this.productsSelect.length) {
                    this.toast.show("Payment Success!", '2000', 'bottom').subscribe(toast => {

                    });
                    this.navCtrl.popToRoot();
                  }
                })
                .catch(e => {
                  console.log(e);
                });
            });
          })
          .catch(e => {
            this.toast.show(e, '2000', 'bottom').subscribe(toast => {
            });
            console.log(e);
          });
      }).catch(e => {
        this.toast.show(e, '2000', 'bottom').subscribe(toast => {
        });
        console.log(e)
      });
    });
  }

  clickSelectType(event: any) {
    this.isShowTypeCash = event.target.parentElement.getAttribute("id") === "cash";
  }

}
