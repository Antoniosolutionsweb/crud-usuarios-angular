import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Usuario } from '../interface/usuario.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private serviceUrl: string ='http://localhost:3000/usuarios'

  constructor( private http:HttpClient) { }

  postUsuario(data:Usuario){
    return this.http.post<Usuario>(`${this.serviceUrl}`, data)
      .pipe(map((res:Usuario)=>{
        return res
      }))
  }
  getUsuario(){
    return this.http.get<Usuario>(`${this.serviceUrl}`,)
      .pipe(map((res:Usuario)=>{
        return res
      }))
  }
  updateUsuario(data:Usuario, id:number){
    return this.http.put<Usuario>(`${this.serviceUrl}/${ id }`, data)
      .pipe(map((res:Usuario)=>{
        return res
      }))
  }
  deleteUsuario(id:number){
    return this.http.delete<any>(`${ this.serviceUrl }/${ id }`);
  
  }
}
