import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasService } from '../../../../core/services/facturasService/facturas.service';
import { BehaviorSubject } from 'rxjs';
import { IFactura } from '../../../../core/models/facturas-model';
import { TableModule } from 'primeng/table';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { MatrixComponent } from '../../../../shared/components/loading-two/matrix/matrix.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [TableModule, LoadingComponent, MatrixComponent, CommonModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  private facturasSubject: BehaviorSubject<IFactura[]> = new BehaviorSubject<IFactura[]>([]);
  facturas! : any[]
  loading = false;

  constructor(private facturasService: FacturasService){

}
ngOnInit() {
  this.facturasService.filters('EMPRESA A, S.L.').subscribe((element)=>{
    console.log(element);
    
  }
)
  this.loading = true;
  this.facturasService.getfacturas().subscribe((element) => {
    // Agregar la propiedad "incomplete" si algún campo tiene "No encontrado"
    // const facturasActualizadas = element.map((factura: any) => {
    //   const hasNoEncontrado = Object.values(factura).some(value => value === "No encontrado");
    //   return { ...factura, incomplete: hasNoEncontrado };
    // });
    const facturasActualizadas = element;

    this.facturasSubject.next(facturasActualizadas);
    this.facturas = facturasActualizadas;
    
    

    this.loading = false;
  });
}


seePhoto(url: string) {
  window.location.href = url;
}

 formatDate(dateString: any) {
  const date = new Date(dateString);
  
  // Extrae el día, mes y año
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = date.getFullYear();

  // Retorna la fecha en formato dd/mm/yyyy
  return `${day}/${month}/${year}`;
}
}