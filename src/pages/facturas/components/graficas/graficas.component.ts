import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [TableModule],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent implements OnInit, OnChanges {

  @Input() facturas: any  ;

  ngOnInit(): void {
    console.log(this.facturas);
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['facturas']) {
      console.log('Facturas actualizadas:', this.facturas);
    }
  }

}
