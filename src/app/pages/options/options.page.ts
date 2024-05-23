import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
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

}
