import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.page.html',
  styleUrls: ['./logup.page.scss'],
})
export class LogupPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToLogupEstudiante(){
    this.navCtrl.navigateForward('/logup-estudiante');
  }

  goToLogupProfesional(){
    this.navCtrl.navigateForward('/logup-profesional');
  }

  goToLogupAdministrador(){
    this.navCtrl.navigateForward('/logup-administrador');
  }

}
