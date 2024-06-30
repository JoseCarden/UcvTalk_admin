import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AdministradorService } from 'src/app/services/administrador.service';
import { firstValueFrom , throwError } from 'rxjs';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.page.html',
  styleUrls: ['./login-administrador.page.scss'],
})
export class LoginAdministradorPage implements OnInit {

  formLoginAdministrador: FormGroup;
  
  constructor(
    private navCtrl: NavController,
    private admService: AdministradorService,
    public alertCrl: AlertController,
    private toastCtrl: ToastController,
    public fb: FormBuilder
  ) {
    this.formLoginAdministrador = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

  
  async goToOptions(){

    //Obtener valores del form
    var form = this.formLoginAdministrador.value;

    //Advertencia a falta de algún campo
    if(this.formLoginAdministrador.invalid){
      const alert = await this.alertCrl.create({
        header: 'Faltan datos',
        message: 'Tienes que rellenar campos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    //Creación de estructura JSON para login
    var logAdmin = {
      Usuario:  form.usuario,
      Contra: form.password
    }

    //Validación de credenciales
    try{
      const resp = await firstValueFrom(this.admService.loginAdmin(logAdmin));//llamada y transformación del servicio

      if(resp.Usuario && resp.Contra){//¿La respuesta tiene estos campos?

        this.navCtrl.navigateForward('/options'); //Si es así, redirección a pagina
        this.formLoginAdministrador.reset();

      }else{
        throw new Error('Admin no encontrado');
      }

    }catch (error){
      //Toast de error
      const toast = await this.toastCtrl.create({
        message: 'Credenciales incorrectas',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      
      //Borrado de campos
      this.formLoginAdministrador.reset();
    }
  }

}
