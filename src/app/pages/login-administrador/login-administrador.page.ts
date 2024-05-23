import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.page.html',
  styleUrls: ['./login-administrador.page.scss'],
})
export class LoginAdministradorPage implements OnInit {

  formLoginAdministrador: FormGroup;
  
  constructor(
    private navCtrl: NavController,
    public fb: FormBuilder
  ) {
    this.formLoginAdministrador = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

  //nose we
  goToOptions(){
    this.navCtrl.navigateForward('/options');
  }

}
