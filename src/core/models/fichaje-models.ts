 export interface FichajeDiario {
  user: string;
  mail: string;
  password: string;
  rol: string;
  idUsuario: number;
  tienda: string;
  dia?: string; 
  entrada: {
    hora: string;     
    lat: number;
    lng: number;
  };
  salida: {
    hora: string;     
    lat: number;
    lng: number;
  };
}