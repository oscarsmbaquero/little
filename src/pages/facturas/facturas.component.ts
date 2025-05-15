import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IFactura } from '../../core/models/facturas-model';
import { FacturasService } from '../../core/services/facturasService/facturas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
//primeng
import { AvatarModule } from 'primeng/avatar';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
//components
import { ListadoComponent } from './components/listado/listado.component';
import { AnadirComponent } from './components/anadir/anadir.component';
import { FacturasErroneasComponent } from './components/facturas-erroneas/facturas-erroneas.component';
import { GraficasComponent } from './components/graficas/graficas.component';


@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
             TabsModule, 
             CommonModule, 
             AnadirComponent, 
             ListadoComponent, 
             AvatarModule, 
             BadgeModule, 
             FacturasErroneasComponent, 
             GraficasComponent, 
             SidebarModule, 
             ReactiveFormsModule
            ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit {

  private facturasSubject: BehaviorSubject<IFactura[]> = new BehaviorSubject<IFactura[]>([]);
    facturas! : any[]
    facturasIncompletas! : any[]
    loading = false;
    erroFacturasCount = 0;
    visible = false;
    filtrosForm: FormGroup;

    constructor(private fb: FormBuilder, private facturasService: FacturasService) {
      this.filtrosForm = this.fb.group({
        tipoDocumento: ['',],
        estado: ['',],
        mes: ['',],
        anio: ['',]
      });
    }

  ngOnInit() {    
    this.loading = true;
    this.facturasService.getfacturas().subscribe((element) => {
      // Agregar la propiedad "incomplete" si algún campo tiene "No encontrado"
      const facturasActualizadas = element.map((factura: any) => {
        const hasNoEncontrado = Object.values(factura).some(value => value === "No encontrado");
        if (hasNoEncontrado) {
          this.erroFacturasCount++; // Incrementa el contador si la factura tiene "No encontrado"
        }        
        return { ...factura, incomplete: hasNoEncontrado };
      });
  
      this.facturasSubject.next(facturasActualizadas);
      this.facturas = facturasActualizadas;
      this.facturasIncompletas = this.facturas.filter((element) => element.incomplete);
      this.loading = false;
    });
  }

  change(){
    this.visible = true;
  }

  onDateChange(event: Event): void {    
    const input = event.target as HTMLInputElement;
    //this.dateFilter.emit(input.value);
  }

  closeSidebar(): void {
    this.visible = false;
  }

  aplicarFiltros() {
    //const filtros = this.filtrosForm.value;
    //console.log('Filtros:', filtros);
    // Procesar filtros...
    //this.visible = false;
  }

  }
 




