import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogTypes } from 'src/app/interfaces/dialog-data-type';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {
  usuarioAutenticado: Usuario;

  constructor(
    private comunicacionAlertasService: ComunicacionDeAlertasService,
    private autenticacionPorJWT: AutenticadorJwtService,
    private router: Router,
    private usuariosService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuariosService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuarioAutenticado => {
      this.usuarioAutenticado = nuevoUsuarioAutenticado;
    });
  }

  navegarHaciaPrincipal() {
    this.router.navigate(['/listadoMensajes']);
  }

  confirmacionAbandonarSesion() {
    this.comunicacionAlertasService.abrirDialogConfirmacion('¿Desea abandonar la sesión?').subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.autenticacionPorJWT.eliminaJwt();
        this.usuarioAutenticado = null;
        this.router.navigate(['/login']);
      }
    });
  }

  navegarHaciaCambiaPassword() {
    this.router.navigate(['/cambioPassword']);
  }

  navegarHaciaDatosPersonales() {
    this.router.navigate(['/datosUsuario']);
  }
}