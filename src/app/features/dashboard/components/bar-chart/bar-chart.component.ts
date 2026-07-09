import { AfterViewInit, Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { Survey } from '../../../../core/Models/survey.model';
import * as d3 from 'd3';

export interface BarChartData {
  question: string;
  responses: number;
}

@Component({
  selector: 'app-bar-chart',
  standalone: false,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})

export class BarChartComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) data!: BarChartData[]


  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    d3.select('#barChart')
      .selectAll('*')
      .remove();

    this.createChart();
  }

  private createChart() {

    const data = this.data;

    const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 50
    };

    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('#barChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left}, ${margin.top})`
      );

    // X Scale
    const x = d3.scaleBand()
      .domain(data.map(d => d.question))
      .range([0, width])
      .padding(0.3);

    // Y Scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.responses)!])
      .nice()
      .range([height, 0]);

    // Bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.question)!)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('y', d => y(d.responses))
      .attr('height', d => height - y(d.responses));

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('text.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => x(d.question)! + x.bandwidth() / 2)
      .attr('y', d => y(d.responses) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.responses);

    // X-axis Lable
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .text('Questions');

    // Y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -35)
      .attr('text-anchor', 'middle')
      .text('Responses');

  }
}
