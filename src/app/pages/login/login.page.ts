import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  // goToLoginEstudiante(){
  //   this.navCtrl.navigateForward('/login-estudiante');
  // }

  // goToLoginProfesional(){
  //   this.navCtrl.navigateForward('/login-profesional');
  // }

  goToLoginAdministrador(){
    this.navCtrl.navigateForward('/login-administrador');
  }

}
