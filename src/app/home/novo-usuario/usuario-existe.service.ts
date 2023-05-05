import { Injectable } from '@angular/core';
import { NovoUsuarioService } from './novo-usuario.service';
import { first, map, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  usuarioJaExiste(){

    return(control: FormControl) =>{
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) =>
        this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        map((usuarioExiste) =>
          usuarioExiste ? { usuarioExistente: true } : null
        ),
        first()
      );
    };

  }

}
