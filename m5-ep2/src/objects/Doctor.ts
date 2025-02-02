interface IDoctor {
    id?: number;
    nombre: string;
    especialidad: string;
    experiencia: number;
    descripcion: string;
    //imagen?: string;
  }

export class Doctor implements IDoctor {
  id?: number;
  nombre: string;
  especialidad: string;
  experiencia: number;
  descripcion: string;
  //imagen?: string;

  constructor(doctor: IDoctor) {
    this.id = doctor.id;
    this.nombre = doctor.nombre;
    this.especialidad = doctor.especialidad;
    this.experiencia = doctor.experiencia;
    this.descripcion = doctor.descripcion;
    //this.imagen = doctor.imagen;
  }

  /*
  getId(): number {
    return this.id;
  }
  */
 
  getNombre(): string {
    return this.nombre;
  }

  getEspecialidad(): string {
    return this.especialidad;
  }

  getExperiencia(): number {
    return this.experiencia;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

}