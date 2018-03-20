import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {CategoryData} from "../../models/categories";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories:CategoryData[] = [];
  categoriesFilter:CategoryData[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest:RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.getCategories();
  }

  getCategories(){
    this.rest.getCategories().subscribe(result => {
      this.categories = result.data;
    })
  }

  editCategory(category:CategoryData){

  }

  createItem(){

  }

  searchItems(ev: any) {
    let val = ev.target.value;
    console.log(ev);
    if (val !== undefined) {
      if (val && val.trim() != '') {
        this.categoriesFilter = this.categories.filter((item) => {
          return (item.category_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.isShowSearch = false;
      this.categoriesFilter = this.products;
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


}
