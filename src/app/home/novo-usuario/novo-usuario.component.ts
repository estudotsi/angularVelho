import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: NovoUsuarioService, private usuarioExistente: UsuarioExisteService, private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      fullName:['', [Validators.required, Validators.minLength(4)]],
      userName:['', [Validators.required, minusculoValidator], [this.usuarioExistente.usuarioJaExiste()]],
      password:['']
    },
    {
      validators: [usuarioSenhaIguaisValidator]
    }
    );
  }

  cadastrar(){
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    if(this.novoUsuarioForm.valid){
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.service.cadastraUsuario(novoUsuario).subscribe({
        next: data => this.router.navigate(['/']),
        error: error => console.log("Deu errado: ", error),
        complete: () => console.log("Completou")
      });
    }
  }

}
