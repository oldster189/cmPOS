import { OrderDetail } from './../../models/orderDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Toast } from '@ionic-native/toast';
import { Orders } from '../../models/orders';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SqliteManagerProvider {

  constructor(public http: HttpClient, private sqlite: SQLite, private toast: Toast) {
    console.log('Hello SqliteManagerProvider Provider');
  }

  dropTable(nameTable: string) {
    this.sqlite.create({
      name: 'cmpos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DROP TABLE ' + name, {})
        .then(res => {
          console.log('DROP TABLE ' + name + 'Success')
          this.toast.show('DROP TABLE ' + name + 'Success', '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        })
        .catch(e => {
          console.log("Error: " + e)
          this.toast.show(e, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log("Error: " + e)
      this.toast.show(e, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  getTransaction(): Observable<Orders[]> {
    let orders: Orders[] = [];
    return Observable.create(observer => {
      this.sqlite.create({
        name: 'cmpos.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM Orders ฏฎ', {})
          .then(res => {
            for (var i = 0; i < res.rows.length; i++) {
              orders.push(res.rows.item(i));
            }
            observer.next(orders);
            observer.complete();
          }).catch(e => {
            console.log(e);
            this.toast.show(e, '3000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );

            observer.next(orders);
            observer.complete();
          });
      })
        .catch(e => {
          console.log(e)
          this.toast.show(e, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
          observer.next(orders);
          observer.complete();
        });
    });
  }


  getTransactionDetail(order_id: string): Observable<OrderDetail[]> {
    let orderDetail: OrderDetail[] = [];
    return Observable.create(observer => {
      this.sqlite.create({
        name: 'cmpos.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM OrderDetail WHERE order_id=?', [order_id])
          .then(res => {
            for (var i = 0; i < res.rows.length; i++) {
              orderDetail.push(res.rows.item(i));
            }
            console.log(orderDetail);
            observer.next(orderDetail);
            observer.complete();
          }).catch(e => {
            console.log(e);
            this.toast.show(e, '3000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );
            observer.next(orderDetail);
            observer.complete();
          });
      })
        .catch(e => {
          console.log(e)
          this.toast.show(e, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
          observer.next(orderDetail);
          observer.complete();
        });
    });
  }

  createTableOrder() {
    this.sqlite.create({
      name: 'cmpos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS  `Orders` ( `order_id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `discount` REAL, `tax_percent` REAL, `sub_total` REAL, `paid` REAL, `status` TEXT, `payment_type` TEXT, `timestamp` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP)', {})
        .then(res => {
          console.log('Create Table Order Success')
          this.toast.show('Create Table Order Success', '3000', 'bottom').subscribe(
            toast => {
            }
          );
        })
        .catch(e => {
          console.log(e)
          this.toast.show(e, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    })
      .catch(e => {
        console.log(e)
        this.toast.show(e, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
  }

  createTableOrderDetail() {
    this.sqlite.create({
      name: 'cmpos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS OrderDetail(order_detail_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, category_id INTEGER, image TEXT, name TEXT, stock INTEGER, qty INTEGER, price INTEGER, category_name TEXT, order_id INTEGER , FOREIGN KEY (order_id) REFERENCES Orders (order_id))', {})
        .then(res => {
          console.log('Create Table OrderDetail Success')
          this.toast.show('Create Table OrderDetail Success', '3000', 'bottom').subscribe(
            toast => {
            }
          );
        })
        .catch(e => {
          console.log(e)
          this.toast.show(e, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    })
      .catch(e => {
        console.log(e)
        this.toast.show(e, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
  }
}
