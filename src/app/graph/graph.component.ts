import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ZingchartAngularModule } from 'zingchart-angular';

declare var zingchart: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  quantum: any;
  valoresEscalonamento: Array<Number> = [];
  valoresNomes: Array<String> = [];
  processos: Array<Object> = [];
  valorTotalEscalonamentoRestante = 0;
  menu: Number;
  calculado: Boolean;
  tempoMedioDeRetorno: Number;
  tempoMedioDeEspera: Number;
  tempoTotalDoProcessador: Number;

  ngOnInit() {
    let series;
    this.preencherOpcoes();
    series = this.montarSeries();

    let valoresNomes;
    valoresNomes = this.valoresNomes.reverse();

    this.preencherTempoDeEspera();
    this.obterTempoMedioDeEspera();
    this.obterTempoMedioDeRetorno();
    this.obterTempoTotalDoProcessador();

    var chart = {
      id: 'chart-zingchart-1',
      data: {
        type: 'hbar',
        plot: {
          stacked: true,
        },
        tooltip: {
          text: 'offset: %offset-values<br> value: %v',
          textAlign: 'left',
        },
        scaleX: {
          labels: valoresNomes,
        },
        series: series,
      },
      height: 300,
      width: 1000,
    };

    zingchart.render(chart);
    this.calculado = true;
  }

  public montarSeries() {
    let series = [];
    let offSet = 0;

    let self = this;

    while (this.valorTotalEscalonamentoRestante > 0) {
      this.processos.forEach(function (item: any, index: Number) {
        if (item.QuantidadeRestante <= 0) {
        } else {
          let values = [];
          let offSetValues = [];
          self.processos.forEach(function (item2: any, index2: Number) {
            if (index == index2) {
              if (item.QuantidadeRestante > self.quantum) {
                values.push(self.quantum);
                offSetValues.push(
                  offSet - self.quantum * item.QuantidadeNoGrafico
                );
                offSet += self.quantum;
              } else {
                values.push(item.QuantidadeRestante);
                offSetValues.push(
                  offSet - self.quantum * item.QuantidadeNoGrafico
                );
                offSet += item.QuantidadeRestante;
                item.TempoTurnAround = offSet;
              }
            } else {
              values.push(0);
              offSetValues.push(0);
            }
          });

          if (item.QuantidadeRestante >= self.quantum) {
            self.valorTotalEscalonamentoRestante -= self.quantum;
            item.QuantidadeRestante -= self.quantum;
            item.QuantidadeNoGrafico += 1;
          } else {
            self.valorTotalEscalonamentoRestante -= item.QuantidadeRestante;
            item.QuantidadeRestante -= item.QuantidadeRestante;
            item.QuantidadeNoGrafico += 1;
          }

          let serieObject = {
            values: values.reverse(),
            offsetValues: offSetValues.reverse(),
            backgroundColor: '#FF6600',
          };

          series.push(serieObject);
        }
      });
    }

    return series;
  }

  public obterTempoMedioDeRetorno() {
    let tempoTotalRetorno = 0;

    this.processos.forEach(function (item: any) {
      tempoTotalRetorno += item.TempoTurnAround;
    });

    this.tempoMedioDeRetorno = tempoTotalRetorno / this.processos.length;
  }

  public obterTempoMedioDeEspera() {
    let tempoTotalDeEspera = 0;

    this.processos.forEach(function (item: any) {
      tempoTotalDeEspera += item.TempoDeEspera;
    });

    this.tempoMedioDeEspera = tempoTotalDeEspera / this.processos.length;
  }

  public obterTempoTotalDoProcessador() {
    let tempoTotalDoProcessador = 0;

    this.processos.forEach(function (item: any) {
      tempoTotalDoProcessador += item.Valor;
    });

    this.tempoTotalDoProcessador = tempoTotalDoProcessador;
  }

  public preencherTempoDeEspera() {
    this.processos.forEach(function (item: any) {
      item.TempoDeEspera = item.TempoTurnAround - item.Valor;
    });
  }

  public preencherOpcoes() {
    var menu;
    var quantum;
    let valoresNomeArray = [];
    let valoresEscalonamentoArray = [];
    let processos = [];

    menu = null;
    quantum = null;

    do {
      quantum = prompt('Digite o quantum');
    } while (quantum == null || quantum == undefined);

    do {
      menu = parseInt(
        prompt('Digite a opção desejada \n 1 - Inserir \n 2 - Mostrar')
      );
      this.menu = menu;

      if (menu === null) {
        break;
      }

      if (menu == '1') {
        let valorNome = prompt('Digite o nome do processo');
        let valorEscalonamento = prompt(
          'Digite a quantidade de cpu necessária para o processo'
        );
        valoresNomeArray.push(valorNome);
        valoresEscalonamentoArray.push(parseInt(valorEscalonamento));
        console.log(parseInt(valorEscalonamento));

        let processo = {
          Nome: valorNome,
          Valor: parseInt(valorEscalonamento),
          QuantidadeRestante: parseInt(valorEscalonamento),
          QuantidadeNoGrafico: 0,
          TempoTurnAround: 0,
          TempoDeEspera: 0,
        };

        this.valorTotalEscalonamentoRestante += parseInt(valorEscalonamento);
        this.quantum = parseInt(quantum);

        processos.push(processo);
      }
    } while (menu != 2);

    this.valoresEscalonamento = valoresEscalonamentoArray;
    this.valoresNomes = valoresNomeArray;
    this.processos = processos;
  }
}