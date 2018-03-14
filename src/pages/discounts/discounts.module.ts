import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountsPage } from './discounts';

@NgModule({
  declarations: [
    DiscountsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountsPage),
  ],
})
export class DiscountsPageModule {}
