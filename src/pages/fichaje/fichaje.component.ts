import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.css'
})
export class FichajeComponent implements OnInit, OnDestroy {
  horaEntrada: string | null = null;
  horaSalida: string | null = null;
  hourTransform = '';
  minuteTransform = '';
  secondTransform = '';
  private intervalId: any;
  user: any;

    ngOnInit() {
    this.actualizarReloj();
    this.intervalId = setInterval(() => this.actualizarReloj(), 1000);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

   ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  

  private obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString('es-ES', { hour12: false });
  }

  ficharEntrada(): void {
    this.horaEntrada = this.obtenerHoraActual();
    // Aquí puedes también enviar al backend si quieres
    console.log('Entrada fichada a las:', this.horaEntrada);
  }

  ficharSalida(): void {
    this.horaSalida = this.obtenerHoraActual();
    // Aquí puedes también enviar al backend si quieres
    console.log('Salida fichada a las:', this.horaSalida);
  }

  private actualizarReloj(): void {
    const ahora = new Date();
    const seg = ahora.getSeconds();
    const min = ahora.getMinutes();
    const hora = ahora.getHours();

    this.secondTransform = `rotate(${seg * 6}deg)`;
    this.minuteTransform = `rotate(${min * 6 + seg * 0.1}deg)`;
    this.hourTransform = `rotate(${(hora % 12) * 30 + min * 0.5}deg)`;
  }

}
