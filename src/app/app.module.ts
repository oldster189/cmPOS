import { ListsPage } from './../pages/lists/lists';
import { DiscountsPage } from './../pages/discounts/discounts';
import { CategoriesPage } from './../pages/categories/categories';
import { AddItemPage } from './../pages/add-item/add-item';
import { ItemsPage } from './../pages/items/items';
import { TransactionDetailPage } from './../pages/transaction-detail/transaction-detail';
import { TransactionPage } from './../pages/transaction/transaction';
import { OrderPage } from './../pages/order/order';
import { PaymentPage } from './../pages/payment/payment';
import { TruncatePipe } from './../pipes/truncate/truncate';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestProvider } from '../providers/rest/rest';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ReportPage } from '../pages/report/report';
import { SqliteManagerProvider } from '../providers/sqlite-manager/sqlite-manager';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera  } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {SupportPage} from "../pages/support/support";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TruncatePipe,
    PaymentPage,
    OrderPage,
    ListsPage,
    ItemsPage,
    AddItemPage,
    CategoriesPage,
    DiscountsPage,
    ReportPage,
    TransactionPage,
    TransactionDetailPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PaymentPage,
    OrderPage,
    ListsPage,
    ItemsPage,
    AddItemPage,
    CategoriesPage,
    DiscountsPage,
    ReportPage,
    TransactionPage,
    TransactionDetailPage,
    SupportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    SQLite,
    Toast,
    SqliteManagerProvider,
    BarcodeScanner,
    Camera,
    FileTransfer,
    FilePath,
    FileTransferObject,
    File,
    InAppBrowser
  ]
})
export class AppModule {}
