
import { UnitData } from './../../models/Unit';
import { CategoryData } from './../../models/categories';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading } from 'ionic-angular';
import { ProductData } from '../../models/product';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular'
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { normalizeURL, AlertController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';


declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  cameraData: string = "";
  photoTaken: boolean;
  cameraUrl: string = "assets/imgs/img-placeholder.jpg";
  photoSelected: boolean;

  product: ProductData = new ProductData();
  categories: CategoryData[] = [];
  units: UnitData[] = [];
  lastImage: string = "";
  loading: Loading;
  type: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private toast: Toast,
    private camera: Camera,
    private server: RestProvider,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.photoTaken = false;
    this.product = this.navParams.get('data') || new ProductData();
    this.type = this.navParams.get('type');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
    this.product.category = this.product.category != undefined ? this.product.category : 1;
    this.product.unit = this.product.unit != undefined ? this.product.unit : 1;

    this.getCategories();
    this.getUnit();
  }

  getCategories() {
    this.server.getCategories().subscribe((categories) => {
      if (categories.success === 1) {
        this.categories = categories.data;
      }
    });
  }

  getUnit() {
    this.server.getUnits().subscribe((unit) => {
      if (unit.success === 1) {
        this.units = unit.data;
      }
    });
  }

  createProduct() {
    this.server.addProduct(this.product).subscribe(res => {
      this.navCtrl.pop();
      this.toast.show("Add Item Success!!", '2000', 'bottom').subscribe(toast => {

      });
    });
  }

  updateProduct() {
    this.server.updateProduct(this.product).subscribe(res => {
      this.navCtrl.pop();
      this.toast.show("Update Item Success!!", '2000', 'bottom').subscribe(toast => {

      });
    });
  }

  deleteProduct(){
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการลบรายการนี้',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'OK',
          handler: () => {
            this.server.deleteProduct(this.product).subscribe(res => {
              this.navCtrl.pop();
              this.toast.show("Delete Item Success!!", '2000', 'bottom').subscribe(toast => {

              });
            });
          }
        }
      ]
    });

    confirm.present();

  }



  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Photo Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {

      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    this.toast.show(text, '2000', 'bottom').subscribe(toast => {
    });
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      if (this.platform.is('android')) {
        return cordova.file.dataDirectory + img;
      } else {
        return normalizeURL(cordova.file.dataDirectory + img);
      }

    }
  }

  public pathForUpload(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  public uploadImage() {
    // Destination URL
    var url = "http://192.168.200.31:8081/api/fileUpload";

    // File for Upload
    var targetPath = this.pathForUpload(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "filetoupload",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      let result = JSON.parse(data.response);
      if (result.success === 1) {
        this.product.image = result.name;

        // add item
        this.server.addProduct(this.product).subscribe(res => {

          this.loading.dismissAll()
          if (res.success === 1){
            this.navCtrl.pop();
            this.toast.show("Add Item Success!!", '2000', 'bottom').subscribe(toast => {

            });
          } else{
            this.toast.show(res.message, '5000', 'bottom').subscribe(toast => {

            });
          }

        });



      }else{
        this.toast.show("Upload Failure", '5000', 'bottom').subscribe(toast => {

        });
      }

    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
}
