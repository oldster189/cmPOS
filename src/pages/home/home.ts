import { OrderPage } from './../order/order';
import { ProductData } from './../../models/product';
import { CategoryData } from './../../models/Categories';
import { RestProvider } from './../../providers/rest/rest';
import { Component, ViewChild } from '@angular/core';
import {NavController, Platform, Searchbar} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import {SqliteManagerProvider} from "../../providers/sqlite-manager/sqlite-manager";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mainSearchbar') searchBar: Searchbar;

  products: ProductData[] = [];
  categories: CategoryData[] = [];
  productsSelect: ProductData[] = [];
  productsFilter: ProductData[] = [];
  amountItem = "No Sale";
  titleProductFilter = "All items";
  isSearch = false;
dates = '2018-03-13 16:51:00';
  constructor(
    public navCtrl: NavController,
    private server: RestProvider,
    public actionSheetCtrl: ActionSheetController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast ) {

  }

  loadProducts() {
    this.server.getProducts()
      .subscribe((products) => {
        if (products.success === 1) {
          this.products = products.data;
          this.productsFilter = products.data;
        }
      });
  }

  loadCategories() {
    this.server.getCategories()
      .subscribe((categories) => {
        if (categories.success === 1) {
          this.categories = categories.data;
        }
      });
  }

  searchItems(ev: any) {
    let val = ev.target.value;
    console.log(ev);
    if (val !== undefined) {
      if (val && val.trim() != '') {
        this.productsFilter = this.products.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.isSearch = false;
      this.productsFilter = this.products;
    }
  }

  onSearchCancel() {
    this.isSearch = false;
    this.productsFilter = this.products;
  }

  onSearchShow() {
    this.isSearch = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }


  addProduct(product: ProductData) {
    if (product.stock > 0) {
      let productTmp = Object.assign({}, product);
      let index = this.productsSelect.findIndex(data => data._id === product._id);

      // index -1 เท่ากับ ค้นหาไม่เจอ ให้ add new array
      if (index == -1) {
        productTmp.qty = 1;
        this.productsSelect.push(productTmp);
      } else {
        this.productsSelect[index].qty += 1;
      }
      product.stock -= 1;

      const sum = this.productsSelect.reduce((total, element) => total + element.qty, 0);
      this.amountItem = "Current Sale [" + sum + "]";
    }
  }

  createButton() {
    let buttons = [];

    let btnAll = {
      text: 'All items',
      handler: () => {
        this.productsFilter = this.products;
        this.titleProductFilter = "All items";
      }
    }
    buttons.push(btnAll);

    this.categories.forEach(element => {
      let btn = {
        text: element.category_name,
        handler: () => {
          this.productsFilter = this.products.filter(product => product.category === element._id);
          this.titleProductFilter = element.category_name;
        }
      }
      buttons.push(btn);
    });

    let btnCancel = {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

      }
    }
    buttons.push(btnCancel);
    return buttons;
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: this.createButton()
    });
    actionSheet.present();
  }

  goToOrderPage() {​
    this.navCtrl.push(OrderPage,
      {
        data: this.productsSelect,
        callback: this.getData
      });
  }

  //Handle Callback When click button back
  getData = (data) => {
    return new Promise((resolve, reject) => {
      console.log("getData");
      this.productsSelect = data;
      if (this.productsSelect.length > 0) {
        const sum = this.productsSelect.reduce((total, element) => total + element.qty, 0);
        this.amountItem = "Current Sale [" + sum + "]";
      } else {
        this.amountItem = "No Sale";
      }
      resolve();
    });
  };


  scan() {
    this.barcodeScanner.scan().then((data) => {
      if (data.cancelled == false) {
        let index = this.products.findIndex(element => (element._id + "") === data.text);
        if (index != -1) {
          this.addProduct(this.products[index]);
        } else {
          this.toast.show('Product not found', '2000', 'bottom').subscribe(toast => {
          });
        }
      }


    }, (err) => {
      this.toast.show(err, '2000', 'bottom').subscribe(toast => {
      });

    });
  }

  ionViewCanEnter() {
    console.log("ionViewCanEnter");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");

    this.loadProducts()
    this.loadCategories()
  }

  ionViewWillUnload() {
    console.log("ionViewWillUnload");
  }

  ionViewWillLeave() {
    this.productsSelect = [];
    this.amountItem = "No Sale";
  }
}
