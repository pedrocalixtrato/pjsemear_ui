import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseList} from '../rest/rest.model';
import {Endereco} from './endereco.model';
import {catchError, map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  enderecosUrl = 'http://192.99.228.142:8082/enderecos';

  constructor(private http: HttpClient) {
  }

  pesquisar(): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.enderecosUrl}`, {headers})
      .toPromise()
      .then(response => response);
  }

  // cadastrarAluno(aluno): Observable<Aluno> {
  //   const url = this.rest.buildFullUrl(`alunos`);
  //   return this.http.post(url, aluno).map((result: ApiResponseSingle<Aluno>) => {
  //     return result.content;
  //   }).catch((error, caught) => {
  //     return Observable.create(observer => {
  //       observer.next('usuario_duplicado');
  //       observer.complete();
  //     });
  //   });
  // }

  salvar(endereco): Observable<Endereco> {
    return this.http.post(this.enderecosUrl, endereco).pipe(map((result: Endereco) => {
        return result;
      })
    ).pipe(
      catchError((err) => {
      return new Observable<any>(observer => {
        observer.next(err.error);
        observer.complete();
      });
    }));
  }

  obterEndereco(id): Observable<any> {
    const enderecosUrl = this.enderecosUrl;
    return this.http.get(`${enderecosUrl}/${id}`);
  }

  obterTodos(): Observable<ApiResponseList<any>> {
    // const headers = new HttpHeaders({
    //   Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    // });
    return this.http.get(this.enderecosUrl);
  }
}
