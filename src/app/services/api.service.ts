import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl='http://localhost:4204/api/user/';
  private token = JSON.parse(localStorage.getItem('user')).stsTokenManager.accessToken;
 private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })
};

  constructor(private http:HttpClient) {
  }

  public getUsuarios():Observable<{user:Array<User>}>{
    return this.http.get<{user:Array<User>}>(this.apiUrl+'get/all',this.httpOptions);
  }

  public saveUsuario(usuario:User):Observable<{user:User}>{
    return this.http.post<{user:User}>(this.apiUrl+'registrar',usuario,this.httpOptions);
  }

  public updateUsuario(usuario:User):Observable<{user:User}>{
    return this.http.put<{user:User}>(this.apiUrl+'/get/actualizar',usuario,this.httpOptions);
  }

  public deleteUsuario(id:string):Observable<any>{
    return this.http.delete(this.apiUrl+'delete/'+id,this.httpOptions);
  }

}
