import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user:FormGroup;
  constructor(public authservice:AuthService,private fb:FormBuilder) {
    this.user = fb.group({
      correo:['',Validators.required],
      password:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

}
