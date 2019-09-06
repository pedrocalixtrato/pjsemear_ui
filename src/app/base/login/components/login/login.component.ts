import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formGroup: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login() {
    const usuario = this.formGroup.get('usuario').value;
    const senha = this.formGroup.get('senha').value;
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['enderecos']);
      })
      .catch(erro => {
        console.log('Nao autorizado');
      });
  }

}
