import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EnderecoService} from '../../base/base-core/endereco/endereco.service';
import {AuthService} from '../../base/login/auth.service';
import {SnotifyService} from 'ng-snotify';
import {Endereco} from '../../base/base-core/endereco/endereco.model';

@Component({
  selector: 'sma-endereco-edit',
  templateUrl: './endereco-edit.component.html',
  styleUrls: ['./endereco-edit.component.scss']
})
export class EnderecoEditComponent implements OnInit {

  @ViewChild('criarEnderecoSuccess', {static: true}) criarEnderecoSuccess;


  formGroup: FormGroup = new FormGroup({
    logradouro: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numero: new FormControl(),
    complemento: new FormControl(''),
    bairro: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  });

  endereco: Endereco;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private enderecoService: EnderecoService,
    private auth: AuthService,
    private snotify: SnotifyService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadEditedEntity(params.id);
    });
  }

  private loadEditedEntity(id) {
    this.enderecoService.obterEndereco(id).subscribe(dado => {
      this.endereco = dado;
      this.formGroup.setValue({
        logradouro: this.endereco.logradouro,
        numero: this.endereco.numero,
        complemento: this.endereco.complemento,
        bairro: this.endereco.bairro,
        cep: this.endereco.cep,
        cidade: this.endereco.cidade,
        estado: this.endereco.estado,
      });
    });
  }


  saveHandler() {
    this.enderecoService.salvar(this.formGroup.getRawValue()).subscribe((result: any) => {
      const menssagem = this.criarEnderecoSuccess.nativeElement.innerHTML;
      if (result.error) {
        this.snotify.error(result.error_description);
      }
      this.snotify.success(menssagem);
      console.log(result);
    });
  }

  cancelHandler() {
    this.enderecoService.obterTodos().subscribe(enderecos =>
      console.log(enderecos)
    );
    this.router.navigate(['/enderecos']);
  }

}
