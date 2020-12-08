import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuariolog:any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuariolog = user;
        localStorage.setItem('user', JSON.stringify(this.usuariolog));
      }
    })
  }



  login(usuario){
    return this.afAuth.signInWithEmailAndPassword(usuario.correo, usuario.password)
    .then((result) => {
      this.ngZone.run(() => {
        localStorage.setItem('user',JSON.stringify(result));
        this.router.navigate(['dashboard']);
      });
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    });
  }

  register(usuario){
    this.afAuth
    .createUserWithEmailAndPassword(usuario.correo, usuario.password)
    .then(value => {
      this.login(usuario)
    })
    .catch(err => {
      window.alert(err.message);
    }); 
  }

}
