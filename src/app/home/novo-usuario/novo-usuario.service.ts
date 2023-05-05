import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovoUsuario } from './novo-usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  private readonly url: string = 'http://localhost:3000/user/signup'
  private readonly urlExists: string = 'http://localhost:3000/user/exists'

  constructor(private http: HttpClient) { }

  cadastraUsuario(novoYsuario: NovoUsuario){
    return this.http.post<NovoUsuario>(this.url, novoYsuario);
  }

  verificaUsuarioExistente(nomeUsuaio: string){
    return this.http.get(`${this.urlExists}/${nomeUsuaio}`);
  }
}
