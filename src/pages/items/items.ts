import { AddItemPage } from './../add-item/add-item';
import { CategoryData } from './../../models/categories';
import { ProductData } from './../../models/product';
import { Component, ViewChild } from '@angular/core';
import { ActionSheetController } from 'ionic-angular'
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  @ViewChild('mainSearchbar') searchBar: Searchbar;

  isShowSearch = false;
  productsFilter: ProductData[] = [];
  products: ProductData[] = [];
  categories: CategoryData[] = [];
  titleProductFilter = "All Items";

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    private server: RestProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');

  }


  ionViewWillEnter(){
    this.getProducts();
    this.getCategories();
  }


  getProducts() {
    this.server.getProducts().subscribe((res) => {
      if (res.success === 1) {
        this.products = res.data;
        this.productsFilter = res.data;
      }
    });
  }

  doRefresh(refresher) {
    this.server.getProducts().subscribe((res) => {
      if (res.success === 1) {
        this.products = res.data;
        this.productsFilter = res.data;

        setTimeout(() => {
          refresher.complete();
        }, 1000);
      }
    }) ;
  }

  getCategories() {
    this.server.getCategories().subscribe((res) => {
      if (res.success === 1) {
        this.categories = res.data;
      }
    })
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

  searchItems(ev: any) {
    let val = ev.target.value;
    console.log(ev);
    if (val !== undefined) {
      if (val && val.trim() != '') {
        this.productsFilter = this.products.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }else{
        this.productsFilter = this.products;
      }
    } else {
      this.isShowSearch = false;
      this.productsFilter = this.products;
    }
  }

  onSearchCancel() {
    this.isShowSearch = false;
    this.productsFilter = this.products;
  }

  onSearchShow() {
    this.isShowSearch = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }

  editProduct(product:ProductData){
    this.navCtrl.push(AddItemPage,{type:"edit",data:product});
  }

  createItem(){
    this.navCtrl.push(AddItemPage,{type:"add"});
  }



}
