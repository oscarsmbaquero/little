import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//primeng
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FacturasService } from '../../../../core/services/facturasService/facturas.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-anadir',
  standalone: true,
  imports: [FileUpload, ToastModule, ReactiveFormsModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './anadir.component.html',
  styleUrl: './anadir.component.css'
})
export class AnadirComponent {

  public addPhoto: FormGroup;
  public submitted: boolean = false;
  nameArchivo = '';
  selectedFile: File | null = null;
  loading = false;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private facturasService: FacturasService,
    private router: Router) {
    this.addPhoto = this.formBuilder.group({
      imagen: ['', [Validators.required]],
    });
  }

  onBasicUploadAuto(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.nameArchivo = file.name;
    this.addPhoto.get('imagen')?.setValue(file);
  }

  public onSubmit(): void {
    // El usuario ha pulsado en submit -> cambia a true submitted
    this.submitted = true;
    // Si el formulario es válido
    if (this.addPhoto.valid) {
      // Obtener el archivo de imagen y el tipo
      const imagen: File = this.addPhoto.get('imagen')?.value;
      // Si tenemos un archivo
      if (imagen) {
        // Extraer el nombre del archivo y su extensión
        const extension = imagen.name.split('.').pop(); // Extraer la extensión del archivo
        const nombreSinExtension = imagen.name.substring(0, imagen.name.lastIndexOf('.')); // Nombre sin la extensión
        // Crear el nuevo nombre del archivo, añadiendo el tipo
        const nuevoNombre = `${nombreSinExtension}.${extension}`;

        // Crear un nuevo objeto File con el nombre modificado (pero manteniendo el contenido)
        const nuevoArchivo = new File([imagen], nuevoNombre, { type: imagen.type });

        // Crear el objeto que se va a enviar
        const factura: any = {
          imagen: nuevoArchivo,  // Enviar el archivo con el nuevo nombre
        };
        this.loading = true;

        // Llamar al servicio para añadir el coche
        this.facturasService.addFacturas(factura).subscribe(
          (response) => {
            console.log('Datos enviados con éxito');
            this.router.navigate(['']);
            this.loading = false;
            
          },
          (error) => {
            console.error('Error al enviar los datos', error);
          }
        );
      } else {
        console.error('No se ha seleccionado una imagen válida');
      }
    }
  }

  onInputChange() {
    // Obtén los valores actuales de 'price' e 'iva'
    // const tipo = this.addPhoto.get('tipo')?.value;
    // const ivaString = this.anadirGasto.get('iva')?.value;
    // const iva = parseFloat(ivaString);
    // if (price !== null && iva !== null && typeof price === 'number' && typeof iva === 'number') {
    //   // Calcula el importe total
    //   const importeTotal = (price + (price * iva / 100)).toFixed(2);
    //   this.importeTotalPlaceholder = importeTotal.toString();

    //   this.anadirGasto.patchValue({ priceFinal: importeTotal });
    // } else {
    //   // Si alguno de los campos está vacío, reinicia el placeholder
    //   this.importeTotalPlaceholder = '';
    // }
  }

}
