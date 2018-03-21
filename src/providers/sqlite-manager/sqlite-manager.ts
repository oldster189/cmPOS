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
      db.executeSql('DROP TABLE ' + nameTable, {})
        .then(res => {
          console.log('DROP TABLE ' + nameTable + 'Success')
          this.toast.show('DROP TABLE ' + nameTable + 'Success', '3000', 'bottom').subscribe(
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

  getTransaction(type:string): Observable<Orders[]> {
    let orders: Orders[] = [];
    return Observable.create(observer => {

      this.sqlite.create({
        name: 'cmpos.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let todayDate = new Date();

        let daily = todayDate;
        daily.setUTCHours(0, 0, 0, 0);
        let dailyTime = daily.getTime() / 1000;

        var year = new Date();
        year.setFullYear(year.getFullYear() - 1);
        year.setUTCHours(0, 0, 0, 0);
        let yearTime = year.getTime() / 1000;

        var week = new Date();
        week.setDate(week.getDate() - 7);
        week.setUTCHours(0, 0, 0, 0);
        let weekTime = week.getTime() / 1000;

        var month = new Date();
        month.setMonth(month.getMonth() - 1);
        month.setUTCHours(0, 0, 0, 0);
        let monthTime = month.getTime() / 1000;

        const nextdaily = new Date();
        nextdaily.setUTCHours(0, 0, 0, 0);
        nextdaily.setDate(nextdaily.getDate() + 1);
        let nextDailyTime = nextdaily.getTime() / 1000;

        let query = "";
        let params = [];
        switch (type){
          case 'latest' :
            // query = "SELECT * FROM Orders WHERE timestamp < ? LIMIT 10";
            query = "SELECT * FROM Orders";
            // params = [nextDailyTime];
            params = [];
          break;
          case 'daily' :
            query = "SELECT * FROM Orders WHERE timestamp BETWEEN ? AND ?";
            params = [dailyTime, nextDailyTime];
            break;
          case 'weekly' :
            query = "SELECT * FROM Orders WHERE timestamp BETWEEN ? AND ?";
            params = [weekTime, nextDailyTime];
            break;
          case 'monthly' :
            query = "SELECT * FROM Orders WHERE timestamp BETWEEN ? AND ?";
            params = [monthTime, nextDailyTime];
            break;
          case 'yearly' :
            query = "SELECT * FROM Orders WHERE timestamp BETWEEN ? AND ?";
            params = [yearTime, nextDailyTime];
            break;
          default :
            break;
        }
        db.executeSql(query, params)
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
      db.executeSql('CREATE TABLE IF NOT EXISTS  `Orders` ( `order_id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `discount` REAL, `tax_percent` REAL, `sub_total` REAL, `paid` REAL, `status` TEXT, `payment_type` TEXT, `timestamp` TEXT)', {})
        .then(res => {
          console.log('Create Table Order Success')
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
