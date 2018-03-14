import { ItemsPage } from './../items/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { CategoriesPage } from '../categories/categories';
import { DiscountsPage } from '../discounts/discounts';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  itemsPage:any;
  categoriesPage:any;
  discountsPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemsPage = ItemsPage;
    this.categoriesPage = CategoriesPage;
    this.discountsPage = DiscountsPage;
  } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

}
