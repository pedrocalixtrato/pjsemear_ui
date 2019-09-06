export interface Endereco {
  id?: number;
  logradouro: string;
  numero: Array<string>;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
