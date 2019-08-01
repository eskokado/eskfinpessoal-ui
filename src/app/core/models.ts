export class Pessoa {
  id: number;
}

export class Categoria {
  id: number;
}

export class LancamentoDTO {
  id: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class PessoaDTO {
  id: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
}
