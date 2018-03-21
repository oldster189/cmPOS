import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Searchbar} from 'ionic-angular';
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
  @ViewChild('mainSearchbar') searchBar: Searchbar;

  categories:CategoryData[] = [];
  categoriesFilter:CategoryData[] = [];

  isShowSearch = false;
  titleCategoryFilter:string = "All Items"

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest:RestProvider,public actionSheetCtrl: ActionSheetController,) {
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

  createButton() {
    let buttons = [];

    let btnAll = {
      text: 'All items',
      handler: () => {
        this.categoriesFilter = this.categories;
        this.titleCategoryFilter = "All items";
      }
    }
    buttons.push(btnAll);

    this.categories.forEach(element => {
      let btn = {
        text: element.category_name,
        handler: () => {
          this.categoriesFilter = this.categories.filter(category => category._id === element._id);
          this.titleCategoryFilter = element.category_name;
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
      this.categoriesFilter = this.categories;
    }
  }

  onSearchCancel() {
    this.isShowSearch = false;
    this.categoriesFilter = this.categories;
  }

  onSearchShow() {
    this.isShowSearch = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }



}
