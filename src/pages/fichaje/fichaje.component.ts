import { Component } from '@angular/core';

@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.css'
})
export class FichajeComponent {
  horaEntrada: string | null = null;
  horaSalida: string | null = null;

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

}
