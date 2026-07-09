import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

export interface PieChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-pie-chart',
  standalone: false,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements AfterViewInit, OnChanges {
  @Input({ required: true })
  data: PieChartData[] = [];

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      d3.select('#pieChart').selectAll('*').remove();
      this.createChart();
    }
  }

  private createChart(): void {
    if (!this.data?.length) {
      return;
    }

    const width = 320;
    const height = 320;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#pieChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal<string>().domain(this.data.map((d) => d.label)).range(d3.schemeCategory10);
    const pie = d3.pie<PieChartData>().value((d) => d.value);
    const dataReady = pie(this.data);
    const arc = d3.arc<d3.PieArcDatum<PieChartData>>().innerRadius(0).outerRadius(radius);

    svg
      .selectAll('path')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.label)!)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    svg
      .selectAll('text')
      .data(dataReady)
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text((d) => `${d.data.label} (${d.data.value})`);
  }
}
