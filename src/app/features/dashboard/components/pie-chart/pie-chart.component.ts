import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: false,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements AfterViewInit, OnChanges {

  @Input({ required: true })
  data: any[] = [];

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    d3.select('#pieChart')
      .selectAll('*')
      .remove();

    this.createChart();
  }

  private createChart() {

    const width = 450;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#pieChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr(
        'transform',
        `translate(${width / 2},${height / 2})`
      );

    const color = d3.scaleOrdinal<string>()
      .domain(this.data.map(d => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie<any>()
      .value(d => d.value);

    const dataReady = pie(this.data);

    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius);

    svg.selectAll('path')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label)!);

    svg.selectAll('text')
      .data(dataReady)
      .enter()
      .append('text')
      .text(d => d.data.label)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')

      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t))!;
        };
      });
  }
}
