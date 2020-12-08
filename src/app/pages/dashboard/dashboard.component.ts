import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuarios:any= [];
  usuario: User;
  formUsuario: FormGroup;
  private _id:string;

  editar:boolean=false;

  constructor(private apiService: ApiService, private fb:FormBuilder) {
    this.formUsuario= this.fb.group(
      {
        nombre:['',Validators.required],
        correo:['',Validators.required],
        direccion:['',Validators.required],
        telefono:['',Validators.required],
        sexo:['',Validators.required],
        edad:['',Validators.required]
      }
    )
  }


  ngOnInit(): void {
    this.getUsuarios()
  }

  save(){
    if(this.editar){
      let usuario = this.formUsuario.value;
      usuario._id=this._id;
      this.updateUsuario(usuario);
      console.log(this.formUsuario.value);
      
    }
    else{
      this.createUsuario(this.formUsuario.value);
    }
  }

  public editarU(user){
    this.editar=true;
    this._id = user._id;
    delete user['_id'];
    delete user['createdAt'];
    delete user['updatedAt'];
    delete user['__v'];
 
   this.formUsuario.setValue(user);
    
  }



private  createUsuario(usuario) {
    this.apiService.saveUsuario(usuario).subscribe(res => {
      $('#formUsuario').modal('toggle');
      this.getUsuarios();
      alert('Usuario Creado')
    }, err => {
      alert(err.error)
    })
  }

  private getUsuarios() {
    this.apiService.getUsuarios().subscribe(res => {
      this.usuarios = res.user;
      console.log(res);
      
    }, err => {

    })
  }

  private updateUsuario(usuario) {
    this.apiService.updateUsuario(usuario).subscribe(res => {
      this.getUsuarios();
      $('#formUsuario').modal('toggle');
    }, err => {

    })
  }

  deleteUsuario(_id:string) {
    
    this.apiService.deleteUsuario(_id).subscribe(res => {
      alert('usuario eliminado')
      this.getUsuarios();
    }, err => {

    })
  }
}
