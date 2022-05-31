import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modelos/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Iniciativa } from '../modelos/iniciativa';
import { IniciativasService } from '../services/iniciativas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users: User[] | undefined;
  username = '';
  center = '';
  apellidos = '';
  location = '';
  u = '';
  iniciativas: Iniciativa[] | undefined;

  iniciativa = null;
  public user: User
  constructor(private iniciativaService: IniciativasService, private userService: UserService, private auth: AuthService,  private tokenStorage: TokenStorageService, private router: Router) { }


  cargarUsuarios(): void {
    this.auth.lista().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  dele(id: number) {
    this.auth.delete(id).subscribe(
      data => {

        this.cargarUsuarios();


      }
     ); window.location.reload();
      }

  updateUser(id: number){
    this.router.navigate(['edicion', id]);
  }


  ngOnInit(): void {



this.getIniciativasAll();

    this.iniciativaService.getIniciativasAll().subscribe(
      (iniciativas)=> {
        this.iniciativas = iniciativas
      });


this.cargarUsuarios();
    if (this.tokenStorage.getToken()===null) {

      window.alert("¡¡No tienes acceso!!"),
      this.router.navigate(["/", "login"])


    }

    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  getIniciativasAll(): void {
    this.iniciativaService.getIniciativasAll().subscribe(
      (iniciativas)=> {
        this.iniciativas = iniciativas
      }
    );
  }


  handleClear(){
    this.center = '';
    this.username = '';
    this.center = '';
    this.apellidos = '';
    this.location = '';
    this.u = '';
  }

  getCosas(): void {
    console.log(this.iniciativa)
    console.log(this.center)
    console.log(this.username)
    console.log(this.apellidos)
    console.log(this.u)
    console.log(this.location)
    this.auth.getFiltros(this.center, this.username, this.apellidos, this.u, this.location, this.iniciativa).subscribe(
      (user)=> {
        this.users = user
        if (user.length === 0){
          Swal.fire('No hay usuarios que coincidan con los filtros indicados')
        }
        console.log(user)
      }
    );
  }

}

