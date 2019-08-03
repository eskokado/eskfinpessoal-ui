import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;
  barChartData: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
    this.configurarGraficoBarra();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC',
                '#0099C6', '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };

      });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDiaTipo()
      .then(dados => {
        const meses = this.configurarMeses();
        const totaisReceitas = this.totaisPorMes(dados.filter(dado => dado.tipo === 'RECEITA'), meses);
        const totaisDespesas = this.totaisPorMes(dados.filter(dado => dado.tipo === 'DESPESA'), meses);
        this.lineChartData = {
          labels: meses,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            },
            {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        };
      });
  }

  configurarGraficoBarra() {
    this.dashboardService.lancamentosPorCategoriaTipo()
      .then(dados => {
        const categorias = this.configurarCategorias(dados);
        const totaisReceitas = this.totaisPorCategoria(dados.filter(dado => dado.tipo === 'RECEITA'), categorias);
        const totaisDespesas = this.totaisPorCategoria(dados.filter(dado => dado.tipo === 'DESPESA'), categorias);
        this.barChartData = {
          labels: categorias,
          datasets: [
            {
              label: 'Receitas',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: totaisReceitas
            },
            {
                label: 'Despesas',
                backgroundColor: '#9CCC65',
                borderColor: '#7CB342',
                data: totaisDespesas
            }
          ]
        };
      });
  }


  private totaisPorMes(dados, meses) {
    const totais: number[] = [];
    for (const mes of meses) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getMonth() === mes) {
          total += dado.total;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarMeses() {
    const meses: number[] = [];
    for (let i = 1; i <= 12; i++) {
      meses.push(i);
    }
    return meses;
  }

  private totaisPorCategoria(dados, categorias) {
    const totais: number[] = [];
    for (const categoria of categorias) {
      let total = 0;
      for (const dado of dados) {
        if (dado.categoria.nome === categoria) {
          total += dado.total;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarCategorias(dados) {
    const categorias: string[] = [];
    for (const dado of dados) {
      if (categorias.indexOf(dado.categoria.nome) === -1) {
        categorias.push(dado.categoria.nome);
      }
    }
    return categorias;
  }
}
