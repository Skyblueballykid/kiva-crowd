import React, { Component } from 'react';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class Stat3 extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    // create chart
    let chart = am4core.create('stat3', am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    chart.colors.step = 2;

    // Add data
    const data = await getData();
    const formattedData = prepareData(data);
    this.setState({ data: Object.values(formattedData) });
    console.log(this.state.data)
    chart.data = this.state.data;

    // define data fields
    chart.dataFields.value = 'average_lenders_per_loan';
    chart.dataFields.name = 'sector_name';
    chart.dataFields.children = 'children';

    chart.zoomable = false;
    let bgColor = new am4core.InterfaceColorSet().getFor('background');

    // level 0 series template
    let level0SeriesTemplate = chart.seriesTemplates.create('0');
    let level0ColumnTemplate = level0SeriesTemplate.columns.template;

    level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level0ColumnTemplate.fillOpacity = 0;
    level0ColumnTemplate.strokeWidth = 4;
    level0ColumnTemplate.strokeOpacity = 0;

    // level 1 series template
    let level1SeriesTemplate = chart.seriesTemplates.create('1');
    let level1ColumnTemplate = level1SeriesTemplate.columns.template;

    level1SeriesTemplate.tooltip.animationDuration = 0;
    level1SeriesTemplate.strokeOpacity = 1;

    level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level1ColumnTemplate.fillOpacity = 1;
    level1ColumnTemplate.strokeWidth = 4;
    level1ColumnTemplate.stroke = bgColor;

    let bullet1 = level1SeriesTemplate.bullets.push(
      new am4charts.LabelBullet()
    );
    bullet1.locationY = 0.5;
    bullet1.locationX = 0.5;
    bullet1.label.text = '{activity_name}';
    bullet1.label.fill = am4core.color('#ffffff');

    chart.maxLevels = 2;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="stat3" style={{ width: '90%', height: '500px', padding: '16px' }}></div>;
  }
}

export default Stat3;

const { REACT_APP_API } = process.env;

async function getData() {
  try {
    const res = await axios.get(`${REACT_APP_API}/api/statistics/stats_3`);
    const { results } = res.data;
    return results;
  } catch (error) {
    console.log(error);
  }
}

function prepareData(data) {
  return data.reduce((obj, i) => {
    obj[i['sector_name']] = {
      sector_name: i['sector_name'],
      children: [
        ...obj[i['sector_name']] ? obj[i['sector_name']].children: [],
        {
          activity_name: i.activity_name,
          average_lenders_per_loan: i.average_lenders_per_loan,
        },
      ],
    };

    return obj;
  }, {});
}
