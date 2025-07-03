import { Component } from '@angular/core';
import { FichajeDiario } from '../../../../core/models/fichaje-models';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-anadir-fichejes',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './anadir-fichejes.component.html',
  styleUrl: './anadir-fichejes.component.css'
})
export class AnadirFichejesComponent {
  horaEntrada: string | null = null;
    horaSalida: string | null = null;
    hourTransform = '';
    minuteTransform = '';
    secondTransform = '';
    private intervalId: any;
    user: any;
    tienda!: string;
    idUsuario!: number;
    relojCard : any;
    registro: FichajeDiario = {
      idUsuario: 0,
      dia: '',
      entrada: {
        hora: '',
        lat: 0,
        lng: 0
    },
    salida: {
      hora: '',
      lat: 0,
      lng: 0
    }
  };

  constructor(
    private fichajesService: FichajesService
  ){}

  ngOnInit() {
    this.actualizarReloj();
    this.intervalId = setInterval(() => this.actualizarReloj(), 1000);
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = usuario.data.user;
    this.tienda = usuario.data.tienda;
    this.idUsuario = usuario.data.idUsuario;

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString('es-ES', { hour12: false });
  }

  ficharEntrada(): void {
  this.obtenerUbicacion()
    .then((ubicacion) => {
      this.horaEntrada = this.obtenerHoraActual();
      this.registro.idUsuario = this.idUsuario; 
      this.registro.dia = this.relojCard.split(' ')[0];
      this.registro.entrada.hora = this.horaEntrada;
      this.registro.entrada.lat = ubicacion.lat;
      this.registro.entrada.lng = ubicacion.lng;
      this.fichajesService.setFichajeEntrada(this.registro)
        .subscribe((response) => {
          console.log('Fichaje de entrada registrado:', response);
        });

      console.log('Entrada fichada a las:', this.registro);
      console.log('Ubicación de entrada:', ubicacion.lat, ubicacion.lng);
    })
    .catch((error) => {
      console.error('Error al obtener la ubicación para entrada:', error);
    });
}


  ficharSalida(): void {
    this.obtenerUbicacion()
      .then((ubicacion) => {
        this.horaSalida = this.obtenerHoraActual();
        console.log('Salida fichada a las:', this.horaSalida);
        console.log('Ubicación de salida:', ubicacion.lat, ubicacion.lng);
        // Aquí puedes enviar la hora y la ubicación a tu backend si lo necesitas
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación para salida:', error);
      });
  }

  private actualizarReloj(): void {
    const ahora = new Date();
    const seg = ahora.getSeconds();
    const min = ahora.getMinutes();
    const hora = ahora.getHours();

    this.secondTransform = `rotate(${seg * 6}deg)`;
    this.minuteTransform = `rotate(${min * 6 + seg * 0.1}deg)`;
    this.hourTransform = `rotate(${(hora % 12) * 30 + min * 0.5}deg)`;
    this.relojCard = `${ahora.toLocaleDateString('es-ES')} ${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  }

  obtenerUbicacion(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject('La geolocalización no está soportada por este navegador.');
      }
    });
  }

  

}
