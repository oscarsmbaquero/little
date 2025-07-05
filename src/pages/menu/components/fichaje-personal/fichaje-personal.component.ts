import { Component, inject } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users/users.service';

@Component({
  selector: 'app-fichaje-personal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fichaje-personal.component.html',
  styleUrl: './fichaje-personal.component.css'
})
export class FichajePersonalComponent {

  fichajesService = inject(FichajesService);
  userService = inject(UsersService);
  opciones: any;

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
      
    })
  }

}
