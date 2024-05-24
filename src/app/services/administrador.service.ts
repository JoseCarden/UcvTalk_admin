import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdministradorResponse } from '../interfaces/AdministradorResponse';
import { AdministradorRequest } from '../interfaces/AdministradorRequest';
import { Observable } from 'rxjs';
import { AdminLogin } from '../interfaces/AdminLogin';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor( private http: HttpClient) { }

  getAdministrador(): Observable<AdministradorResponse[]>{
    return this.http.get<AdministradorResponse[]>
    ('http://localhost:3000/administrador');
  }

  postAdministrador(administrador: AdministradorRequest): Observable<AdministradorRequest>{
    return this.http.post<AdministradorRequest>
    ('http://localhost:3000/administrador/register',administrador);
  }

  loginAdmin(admLogin: AdminLogin):Observable<AdministradorResponse>{
    return this.http.post<AdministradorResponse>('http://localhost:3000/administrador/login',admLogin);
  }

}
