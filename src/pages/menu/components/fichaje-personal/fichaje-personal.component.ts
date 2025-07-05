import { Component, inject } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users/users.service';
//primeng
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-fichaje-personal',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './fichaje-personal.component.html',
  styleUrl: './fichaje-personal.component.css'
})
export class FichajePersonalComponent {

  fichajesService = inject(FichajesService);
  userService = inject(UsersService);
  opciones: any;
  registros: any;

  opcionSeleccionada: string = '';
  // opciones = [
  //   { valor: 'opcion1', label: 'Opción 1' },
  //   { valor: 'opcion2', label: 'Opción 2' },
  //   { valor: 'opcion3', label: 'Opción 3' }
  // ];

  constructor() { }

  ngOnInit(){
    this.userService.getUsers().subscribe((element)=>{
      console.log(element);
      this.opciones = element;
      console.log(this.opciones.idUsuario);         
    })
  }

  onSelectChange(event: Event) {
  const idSeleccionado = (event.target as HTMLSelectElement).value;
  console.log('ID seleccionado:', idSeleccionado);

  // Si necesitas el objeto completo del usuario:
  const usuario = this.opciones.find((op: { idUsuario: string; }) => op.idUsuario == idSeleccionado);
  console.log('Usuario seleccionado:', usuario);
  this.fichajesService.getFichajesByUser(usuario.idUsuario).subscribe((element)=>{
    this.registros = element;
    this.registros = this.calcularTiempoTrabajado(this.registros);
console.log(element);

  })
}

//TODO EXPORTAR A UTILS
calcularTiempoTrabajado(fichajes: any[]) {
  const formatoHora = (hora: string): string => {
    if (!hora) return '00:00:00';
    const [h = '00', m = '00', s = '00'] = hora.split(':');
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
  };

  return fichajes.map(fichaje => {
    const entradaHora = formatoHora(fichaje.entrada?.hora);
    const salidaHora = formatoHora(fichaje.salida?.hora);

    if (entradaHora && salidaHora) {
      const fecha = '1970-01-01';
      const entrada = new Date(`${fecha}T${entradaHora}`);
      const salida = new Date(`${fecha}T${salidaHora}`);

      if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
        return { ...fichaje, tiempoTrabajado: null };
      }

      const diffMs = salida.getTime() - entrada.getTime();
      const totalSegundos = Math.floor(diffMs / 1000);

      const horas = Math.floor(totalSegundos / 3600);
      const minutos = Math.floor((totalSegundos % 3600) / 60);
      const segundos = totalSegundos % 60;

      const tiempoTrabajado = `${horas.toString().padStart(2, '0')}:${minutos
        .toString()
        .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

      return { ...fichaje, tiempoTrabajado };
    }

    return { ...fichaje, tiempoTrabajado: null };
  });
}

}
