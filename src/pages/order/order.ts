import { PaymentPage } from './../payment/payment';
import { ProductData } from './../../models/product';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  @ViewChild(Navbar) navBar: Navbar;

  sumPrice: number = 0;
  productsSelect: ProductData[] = [];
  callback: any;
  isEmptyOrder = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.productsSelect = this.navParams.get('data') || [];
    this.callback = this.navParams.get('callback'); 
  }

  ionViewDidLoad() { 
    this.isEmptyOrder = this.productsSelect.length > 0 ? true : false;

    this.calculateSumPrice();
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.backPage();
    } 
  }

  public backPage() {
    this.callback(this.productsSelect).then(() => {
      this.navCtrl.pop();
    });
  }

  calculateSumPrice() {
    this.sumPrice = 0;
    this.productsSelect.forEach(element => {
      this.sumPrice += (element.price * element.qty);
    });
  }

  clearProducts() {
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการลบใบเสร็จนี้',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'OK',
          handler: () => {
            this.productsSelect = [];
            this.backPage()
          }
        }
      ]
    });

    confirm.present();
  }

  addQty(product: ProductData) {
    let index = this.productsSelect.findIndex(data => data._id === product._id);
    if (this.productsSelect[index].qty < this.productsSelect[index].stock)
    this.productsSelect[index].qty += 1;
    this.calculateSumPrice()
  }

  removeQty(product: ProductData) {
    let index = this.productsSelect.findIndex(data => data._id === product._id);

    if (this.productsSelect[index].qty > 0) {

      this.productsSelect[index].qty -= 1;

      //check count == 0 remove item
      if (this.productsSelect[index].qty == 0) { 
        this.productsSelect.splice(index, 1); 
      }
    }
 
    this.isEmptyOrder = this.productsSelect.length > 0 ? true : false;
    this.calculateSumPrice()
  }

  checkout() { 
    this.navCtrl.push(PaymentPage, {data:this.productsSelect});
  }
 
}
