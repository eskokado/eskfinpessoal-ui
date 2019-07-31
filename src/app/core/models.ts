export class Pesssoa {
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
  pessoa = new Pesssoa();
  categoria = new Categoria();
}
