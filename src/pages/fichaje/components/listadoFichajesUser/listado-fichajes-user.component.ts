import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';

@Component({
  selector: 'app-listado-fichajes-user',
  standalone: true,
  imports: [],
  templateUrl: './listado-fichajes-user.component.html',
  styleUrl: './listado-fichajes-user.component.css'
})
export class ListadoFichajesUserComponent implements OnInit {

  user = ''
  tienda= ''
  idUsuario!: number;
  fichajes: any[] = [];

  constructor(private fichajesService: FichajesService) {}



  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = usuario.data.user;
    this.tienda = usuario.data.tienda;
    this.idUsuario = usuario.data.idUsuario; 
    
    this.fichajesService.getFichajesByUser(this.idUsuario)
      .subscribe((response: any) => {
        console.log('Fichajes obtenidos:', response);
        this.fichajes = response;
        console.log(this.fichajes);
        
      }, (error) => {
        console.error('Error al obtener los fichajes:', error);
      });

  }

}
