import React, { Component } from 'react';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class Stat1 extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    // Add data
    const results = await getData();
    const formattedData = prepareData(results);
    console.log(formattedData);
    this.setState({ data: formattedData });

    // Create map instance
    let chart = am4core.create('stat1', am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = 'rotateLongLat';
    chart.padding(20, 20, 20, 20);

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    let homeButton = new am4core.Button();
    homeButton.events.on('hit', function () {
      chart.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path =
      'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);

    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      '#bfa58d'
    );
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    chart.deltaLongitude = 20;
    chart.deltaLatitude = -20;

    // limits vertical rotation
    chart.adapter.add('deltaLatitude', function (delatLatitude) {
      return am4core.math.fitToRange(delatLatitude, -90, 90);
    });

    // Create map polygon series
    let shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    shadowPolygonSeries.useGeodata = true;
    shadowPolygonSeries.dx = 2;
    shadowPolygonSeries.dy = 2;
    shadowPolygonSeries.mapPolygons.template.fill = am4core.color('#000');
    shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
    shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
    shadowPolygonSeries.fillOpacity = 0.1;
    shadowPolygonSeries.fill = am4core.color('#000');

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    polygonSeries.calculateVisualCenter = true;
    polygonSeries.tooltip.background.fillOpacity = 0.2;
    polygonSeries.tooltip.background.cornerRadius = 20;

    let template = polygonSeries.mapPolygons.template;
    template.nonScalingStroke = true;
    template.fill = am4core.color('#47c78a');
    template.stroke = am4core.color('#454a58');

    polygonSeries.calculateVisualCenter = true;
    template.propertyFields.id = 'id';
    template.tooltipPosition = 'fixed';
    template.fillOpacity = 1;

    template.events.on('over', function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = true;
      }
    });
    template.events.on('out', function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = false;
      }
    });

    let hs = template.states.create('hover');
    hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

    let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.stroke = am4core.color('#ffffff');
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
    graticuleSeries.fitExtent = false;

    let measelsSeries = chart.series.push(new am4maps.MapPolygonSeries());
    measelsSeries.tooltip.background.fillOpacity = 0;
    measelsSeries.tooltip.background.cornerRadius = 20;
    measelsSeries.tooltip.autoTextColor = false;
    measelsSeries.tooltip.label.fill = am4core.color('#000');
    measelsSeries.tooltip.dy = -5;

    let measelTemplate = measelsSeries.mapPolygons.template;
    measelTemplate.fill = am4core.color('#bf7569');
    measelTemplate.strokeOpacity = 0;
    measelTemplate.fillOpacity = 0.75;
    measelTemplate.tooltipPosition = 'fixed';

    let hs2 = measelsSeries.mapPolygons.template.states.create('hover');
    hs2.properties.fillOpacity = 1;
    hs2.properties.fill = am4core.color('#86240c');

    const { data } = this.state;
    polygonSeries.events.on('inited', function () {
      polygonSeries.mapPolygons.each(function (mapPolygon) {
        let count = data[mapPolygon.id];

        if (count > 0) {
          let polygon = measelsSeries.mapPolygons.create();
          polygon.multiPolygon = am4maps.getCircle(
            mapPolygon.visualLongitude,
            mapPolygon.visualLatitude,
            Math.max(0.2, (count/250 * Math.LN10) / 10)
          );
          polygon.tooltipText =
            mapPolygon.dataItem.dataContext.name + ': ' + count;
          mapPolygon.dummyData = polygon;
          polygon.events.on('over', function () {
            mapPolygon.isHover = true;
          });
          polygon.events.on('out', function () {
            mapPolygon.isHover = false;
          });
        } else {
          mapPolygon.tooltipText =
            mapPolygon.dataItem.dataContext.name + ': no data';
          mapPolygon.fillOpacity = 0.9;
        }
      });
    });

    // Water
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      '#454a58'
    );
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

    let animation;
    setTimeout(function () {
      animation = chart.animate(
        { property: 'deltaLongitude', to: 100000 },
        20000000
      );
    }, 3000);

    chart.seriesContainer.events.on('down', function () {
      if (animation) {
        animation.stop();
      }
    });

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div
        id="stat1"
        style={{ width: '90%', height: '550px', padding: '12px' }}
      ></div>
    );
  }
}

export default Stat1;

const { REACT_APP_API } = process.env;

async function getData() {
  try {
    const res = await axios.get(`${REACT_APP_API}/api/statistics/stats_1`);
    const { results } = res.data;
    return results;
  } catch (error) {
    console.log(error);
  }
}

function prepareData(data) {
  return Object.assign(
    {},
    ...data.map((i) => ({ [i.country_code]: i.average_loan }))
  );
}
