import React, { Component } from 'react';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class Stat2 extends Component {
  state = {
    data: []
  }

  async componentDidMount() {
    // Create chart instance
    let chart = am4core.create('stat2', am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    const data = await getData();
    // console.log(data);
    // prepareData();

    this.setState({ data })
    chart.data = this.state.data;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'sector_name';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = 'count_of_loans';
    series.dataFields.categoryX = 'sector_name';
    series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = 'vertical';

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // paretoValueAxis.renderer.opposite = true;
    // paretoValueAxis.min = 0;
    // paretoValueAxis.max = 100;
    // paretoValueAxis.strictMinMax = true;
    // paretoValueAxis.renderer.grid.template.disabled = true;
    // paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    // paretoValueAxis.numberFormatter.numberFormat = "#'%'";
    // paretoValueAxis.cursorTooltipEnabled = false;

    // let paretoSeries = chart.series.push(new am4charts.LineSeries());
    // paretoSeries.dataFields.valueY = 'pareto';
    // paretoSeries.dataFields.categoryX = 'country';
    // paretoSeries.yAxis = paretoValueAxis;
    // paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    // paretoSeries.bullets.push(new am4charts.CircleBullet());
    // paretoSeries.strokeWidth = 2;
    // paretoSeries.stroke = new am4core.InterfaceColorSet().getFor(
    //   'alternativeBackground'
    // );
    // paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panX';

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="stat2" style={{ width: '90%', height: '500px', padding: '16px' }}></div>;
  }
}

export default Stat2;

const { REACT_APP_API } = process.env;

async function getData() {
  try {
    const res = await axios.get(`${REACT_APP_API}/api/statistics/stats_2`);
    const { results } = res.data;
    return results;
  } catch (error) {
    console.log(error)
  }
}

function prepareData(data) {
  return
}
