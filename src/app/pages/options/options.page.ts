import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'CERRAR SESION',
      message: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.goToHome();
          }
        }
      ]
    });

    await alert.present();
  }

  goBack() {
    this.presentAlert();
  }

  goToProfesRegister(){
    this.navCtrl.navigateForward('/profes-register');
  }

  goToCalificaProfes(){
    this.navCtrl.navigateForward('/califica-profes');
  }

  goToReporteEstudiante(){
    this.navCtrl.navigateForward('/reporte-estudiante');
  }

  goToDiagnosticoEstudiante(){
    this.navCtrl.navigateForward('/diagnostico-estudiante');
  }

  goToHome(){
    this.navCtrl.navigateForward('/home');
  }

}
