import { Component, OnInit, NgModule } from '@angular/core';
import { ZingchartAngularModule } from 'zingchart-angular';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit {

  public valores: Array<any> = [];
  public valoresGrafico: Array<number> = []; 

  public configZingChart = {};

  // config:zingchart.graphset = this.configZingChart;
  config:zingchart.graphset = {
    type: 'hbar',
    series: [{
      values: this.valoresGrafico
    }],
  };

  constructor() { 

    var menu = prompt('Digite a opção desejada \n 1 - Inserir \n 2 - Mostrar \n 3 - FIFO');

    if(menu == '1') {
      var nome = prompt('Digite o nome');
      var valor = prompt('Digite o valor');

      var valoresObj = {
        nome1234: nome,
        valor1234: valor,
      }

      console.log('valoresObj ' + valoresObj.nome1234);

      this.valores.push(valoresObj);

      console.log('this.valores > ' + this.valores[0].nome1234);

      console.log(this.valores.length);

      this.valores.forEach(element => {
        console.log(element);
      });

      let valoresGrafico = [2,3,5,6,7];

      this.valoresGrafico = valoresGrafico; 

      this.configZingChart = { type: 'hbar',
        series: [{
          values: this.valoresGrafico
        }] 
      }
    }
    else {
      alert('Opção inválida');
    }

   }

  ngOnInit(): void {
  }

}
