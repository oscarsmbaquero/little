import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
//primeng
import { TableModule } from 'primeng/table';
//loader
import { MatrixComponent } from '../../../../shared/components/loading-two/matrix/matrix.component';
import { FacturasService } from '../../../../core/services/facturasService/facturas.service';


@Component({
  selector: 'app-facturas-erroneas',
  standalone: true,
  imports: [TableModule, CommonModule, MatrixComponent],
  templateUrl: './facturas-erroneas.component.html',
  styleUrl: './facturas-erroneas.component.css'
})
export class FacturasErroneasComponent {
  loading = false;
  facturasErroneas: any;
  facturasIncompletas: any;

   constructor(private facturasService: FacturasService){}

  ngOnInit(): void {

    //TODO cambiar a facturas filtardas 
    this.facturasService.getfacturas().subscribe((element) => {
      this.facturasErroneas = element;
      console.log(element);
    
      this.facturasIncompletas = element
        .map((factura: any) => {
          const hasNoEncontrado = Object.values(factura).some(value => value === "No encontrado");
          return { ...factura, incomplete: hasNoEncontrado };
        })
        .filter(factura => factura.incomplete);
    
      console.log(this.facturasIncompletas);
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
