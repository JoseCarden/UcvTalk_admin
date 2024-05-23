import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-logup-administrador',
  templateUrl: './logup-administrador.page.html',
  styleUrls: ['./logup-administrador.page.scss'],
})
export class LogupAdministradorPage implements OnInit {

  formLogupAdministrador: FormGroup;
  
  constructor(
    private navCtrl: NavController,
    private estService: AdministradorService,
    public alertCrl: AlertController,
    private toastCtrl: ToastController,
    public fb: FormBuilder
  ) { 
    this.formLogupAdministrador = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async registrarAdministrador(){

    //Obtener valores del form
    var form = this.formLogupAdministrador.value;

    //Mensaje en caso no válido
    if(this.formLogupAdministrador.invalid){
      const alert = await this.alertCrl.create({
        header: 'Faltan datos',
        message: 'Tienes que poner un usuario y contraseña',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    //Creación de JSON para nuevo administrador
    var administrador = {
      Correo: form.correo,
      Usuario: form.usuario,
      Contra: form.password,
    }

    //Uso de servicio POST
    this.estService.postAdministrador(administrador)
    .subscribe( resp => {
      console.log(resp);
    })

    //TOAST de confirmación
    const toast = await this.toastCtrl.create({
      message: 'Se registró correctamente',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();

    //Redirección a HOME
    this.navCtrl.navigateBack('/home');
  }
}
