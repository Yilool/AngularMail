import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {
  loginForm: FormGroup;
  ocultarPassword: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private autenticadorJwtService: AutenticadorJwtService,
    private comunicacionAlertas: ComunicacionDeAlertasService
  ) {
      this.loginForm = new FormGroup({
        usuario: new FormControl('rafa', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('1234', [Validators.required])
      });
  }

  ngOnInit(): void {
  }

  autenticaUsuario() {
    this.comunicacionAlertas.abrirDialogCargando();

    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value,
      this.loginForm.controls.password.value).subscribe(data => {
        console.log(data.jwt);
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt);
          this.router.navigate(['/listadoMensajes']);
          this.comunicacionAlertas.cerrarDialogo();
          this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
        } else {
          this.comunicacionAlertas.abrirDialogError('Usuario y/o Password inválido')
        }
      });
  }
}