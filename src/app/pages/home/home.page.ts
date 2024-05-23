import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdministradorResponse } from 'src/app/interfaces/AdministradorResponse';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  // public estudiantes: EstudianteResponse[] = [];
  
  constructor(
    private navCtrl: NavController,
    private estService: AdministradorService
  ) {}

  goToLoginAdministrador(){
    this.navCtrl.navigateForward('/login-administrador');
  }

  goToLogupAdministrador(){
    this.navCtrl.navigateForward('/logup-administrador');
  }

  ngOnInit() {
    // this.estService.getEstudiantes()
    // .subscribe( estudiantes => this.estudiantes.push(...estudiantes));
  }

}
