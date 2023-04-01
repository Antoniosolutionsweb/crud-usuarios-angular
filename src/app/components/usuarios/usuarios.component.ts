import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Usuario } from 'src/app/interface/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  formValue !: FormGroup;
  usuario: Usuario= new Usuario()
  usuarioData! : any
  showAdd!: boolean
  showApdate!:boolean

  constructor(private formbuilder: FormBuilder,
              private api:UsuariosService){ } 

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(5)]]

    })
    this.getAllUsuario()
  }

  clickAddUsuario(){
    this.formValue.reset()
    this.showAdd = true
    this.showApdate = false
  }
  postUsuarioDetalle(){
    this.usuario.nombre = this.formValue.value.nombre;
    this.usuario.apellido = this.formValue.value.apellido;
    this.usuario.edad = this.formValue.value.edad;
    this.usuario.email = this.formValue.value.email;
    this.usuario.telefono = this.formValue.value.telefono;

    this.api.postUsuario(this.usuario)
      .subscribe( res=>{
        console.log(res) 
        let ref = document.getElementById('cancelar')
        ref?.click()
        this.formValue.reset()
        this.getAllUsuario()
        alert("Usuario agregado correctamente ")
        
      },
        err=>{
          alert('no se pudo registrar el usuario')
        }
      )
  }

  getAllUsuario(){
    this.api.getUsuario()
    .subscribe(res=>{
      this.usuarioData = res
    })
  }
  deleteUsuario( usuario: Usuario){
    this.api.deleteUsuario(usuario.id)
      .subscribe( res=>{
        alert('usuario borrado')
        this.getAllUsuario()
      })
  }

  onEdit( usuario: Usuario){
    this.showAdd = false
    this.showApdate = true
    this.usuario.id = usuario.id
    this.formValue.controls['nombre'].setValue(usuario.nombre)
    this.formValue.controls['apellido'].setValue(usuario.apellido)
    this.formValue.controls['edad'].setValue(usuario.edad)
    this.formValue.controls['email'].setValue(usuario.email)
    this.formValue.controls['telefono'].setValue(usuario.telefono)
  }
  updateUsuarioDetalle(){
    this.usuario.nombre = this.formValue.value.nombre;
    this.usuario.apellido = this.formValue.value.apellido;
    this.usuario.edad = this.formValue.value.edad;
    this.usuario.email = this.formValue.value.email;
    this.usuario.telefono = this.formValue.value.telefono;

    this.api.updateUsuario(this.usuario,this.usuario.id)
      .subscribe( res =>{
        alert('Usuario actualizado correctamente')
        let ref = document.getElementById('cancelar')
        ref?.click()
        this.formValue.reset()
        this.getAllUsuario()
      })

  }

  campoValido(campo: string){
    return this.formValue.controls[campo].errors && this.formValue.controls[campo].touched
  }

}
