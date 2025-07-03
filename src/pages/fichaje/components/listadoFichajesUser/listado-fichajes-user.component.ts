import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { GeolocationService } from '../../../../core/services/GeolocationService/geolocation.service';

@Component({
  selector: 'app-listado-fichajes-user',
  standalone: true,
  imports: [],
  templateUrl: './listado-fichajes-user.component.html',
  styleUrl: './listado-fichajes-user.component.css',
})
export class ListadoFichajesUserComponent implements OnInit {
  user = '';
  tienda = '';
  idUsuario!: number;
  fichajes: any[] = [];
  direccion: string | null = null;

  constructor(
    private fichajesService: FichajesService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = usuario.data.user;
    this.tienda = usuario.data.tienda;
    this.idUsuario = usuario.data.idUsuario;

    this.fichajesService.getFichajesByUser(this.idUsuario).subscribe(
      (response: any[]) => {
        this.fichajes = response;

        this.fichajes.forEach((fichaje, index) => {
          const { lat, lng } = fichaje.entrada;

          if (lat && lng) {
            this.geolocationService
              .getLocalidadFromCoordinates(lat, lng)
              .subscribe((localidad) => {
                this.fichajes[index].localidadEntrada = localidad;
              });
          } else {
            this.fichajes[index].localidadEntrada = 'No disponible';
          }
        });
      },
      (error) => {
        console.error('Error al obtener los fichajes:', error);
      }
    );
  }
}
