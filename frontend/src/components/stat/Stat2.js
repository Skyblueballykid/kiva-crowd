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
    const responseData = await getData();
    const data = prepareData(responseData);

    this.setState({ data })
    chart.data = this.state.data;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'sector_and_activity_name';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.title.text = "Sector and Activity"

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.title.text = "Avg Loan"

    let valueAxisTwo = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisTwo.min = 0;
    valueAxisTwo.cursorTooltipEnabled = false;
    valueAxisTwo.renderer.opposite = true;
    valueAxisTwo.title.text = "Avg Lender Term in Months"

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = 'average_loan';
    series.dataFields.categoryX = 'sector_and_activity_name';
    series.columns.template.strokeWidth = 0;

    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = 'vertical';

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.7;

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    let seriesTwo = chart.series.push(new am4charts.LineSeries());
    seriesTwo.sequencedInterpolation = true;
    seriesTwo.dataFields.valueY = 'average_lender_term_in_months';
    seriesTwo.dataFields.categoryX = 'sector_and_activity_name';
    seriesTwo.yAxis = valueAxisTwo;
    seriesTwo.strokeWidth = 7;
    seriesTwo.tooltipText = "{valueY}";

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
  return data.map(function(x) {
    return {
      sector_and_activity_name: `${x.sector_name} \n ${x.activity_name}`,
      average_lender_term_in_months: x.average_lender_term_in_months,
      count_of_loans: x.count_of_loans,
      average_loan: x.average_loan
    };
  }).sort((a, b) => (a.average_loan > b.average_loan) ? -1 : 1).slice(0, 10);
}
