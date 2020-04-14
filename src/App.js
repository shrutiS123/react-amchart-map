import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
   // let chart = am4core.create("chartdiv", am4charts.XYChart);
  // Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);
let interfaceColors = new am4core.InterfaceColorSet();

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Mercator();

// Export
chart.exporting.menu = new am4core.ExportMenu();

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();

// Data for general and map use
let originCities = [
    {
        "id": "london",
        "title": "London",
        "destinations": ["vilnius", "reykjavik", "lisbon", "moscow", "belgrade", "ljublana", "madrid", "stockholm", "bern", "kiev", "new york"],
        "latitude": 51.5002,
        "longitude": -0.1262,
        "scale": 1.5,
        "zoomLevel": 2.74,
        "zoomLongitude": -20.1341,
        "zoomLatitude": 49.1712
    },
    {
        "id": "vilnius",
        "title": "Vilnius",
        "destinations": ["london", "brussels", "prague", "athens", "dublin", "oslo", "moscow", "bratislava", "belgrade", "madrid"],
        "latitude": 54.6896,
        "longitude": 25.2799,
        "scale": 1.5,
        "zoomLevel": 4.92,
        "zoomLongitude": 15.4492,
        "zoomLatitude": 50.2631
    }
];

let destinationCities = [{
    "id": "brussels",
    "title": "Brussels",
    "latitude": 50.8371,
    "longitude": 4.3676
}, {
    "id": "prague",
    "title": "Prague",
    "latitude": 50.0878,
    "longitude": 14.4205
}, {
    "id": "athens",
    "title": "Athens",
    "latitude": 37.9792,
    "longitude": 23.7166
}, {
    "id": "reykjavik",
    "title": "Reykjavik",
    "latitude": 64.1353,
    "longitude": -21.8952
}, {
    "id": "dublin",
    "title": "Dublin",
    "latitude": 53.3441,
    "longitude": -6.2675
}, {
    "id": "oslo",
    "title": "Oslo",
    "latitude": 59.9138,
    "longitude": 10.7387
}, {
    "id": "lisbon",
    "title": "Lisbon",
    "latitude": 38.7072,
    "longitude": -9.1355
}, {
    "id": "moscow",
    "title": "Moscow",
    "latitude": 55.7558,
    "longitude": 37.6176
}, {
    "id": "belgrade",
    "title": "Belgrade",
    "latitude": 44.8048,
    "longitude": 20.4781
}, {
    "id": "bratislava",
    "title": "Bratislava",
    "latitude": 48.2116,
    "longitude": 17.1547
}, {
    "id": "ljublana",
    "title": "Ljubljana",
    "latitude": 46.0514,
    "longitude": 14.5060
}, {
    "id": "madrid",
    "title": "Madrid",
    "latitude": 40.4167,
    "longitude": -3.7033
}, {
    "id": "stockholm",
    "title": "Stockholm",
    "latitude": 59.3328,
    "longitude": 18.0645
}, {
    "id": "bern",
    "title": "Bern",
    "latitude": 46.9480,
    "longitude": 7.4481
}, {
    "id": "kiev",
    "title": "Kiev",
    "latitude": 50.4422,
    "longitude": 30.5367
}, {
    "id": "paris",
    "title": "Paris",
    "latitude": 48.8567,
    "longitude": 2.3510
}, {
    "id": "new york",
    "title": "New York",
    "latitude": 40.43,
    "longitude": -74
}];

// Default to London view
//chart.homeGeoPoint = { "longitude": originCities[0].zoomLongitude, "latitude": originCities[0].zoomLatitude };
//chart.homeZoomLevel = originCities[0].zoomLevel;

let targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
let planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";

// Texts
let labelsContainer = chart.createChild(am4core.Container);
labelsContainer.isMeasured = false;
labelsContainer.x = 80;
labelsContainer.y = 27;
labelsContainer.layout = "horizontal";
labelsContainer.zIndex = 10;

let plane = labelsContainer.createChild(am4core.Sprite);
plane.scale = 0.15;
plane.path = planeSVG;
plane.fill = am4core.color("#cc0000");

let title = labelsContainer.createChild(am4core.Label);
title.text = "Flights from London";
title.fill = am4core.color("#cc0000");
title.fontSize = 20;
title.valign = "middle";
title.dy = 2;
title.marginLeft = 15;

let changeLink = chart.createChild(am4core.TextLink);
changeLink.text = "Click to change origin city";
changeLink.isMeasured = false;

changeLink.events.on("hit", function() {
    if (currentOrigin == originImageSeries.dataItems.getIndex(0)) {
        showLines(originImageSeries.dataItems.getIndex(1));
    }
    else {
        showLines(originImageSeries.dataItems.getIndex(0));
    }
})

changeLink.x = 142;
changeLink.y = 72;
changeLink.fontSize = 13;


// The world
let worldPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldPolygonSeries.useGeodata = true;
worldPolygonSeries.fillOpacity = 0.6;
worldPolygonSeries.exclude = ["AQ"];

// Origin series (big targets, London and Vilnius)
let originImageSeries = chart.series.push(new am4maps.MapImageSeries());

let originImageTemplate = originImageSeries.mapImages.template;

originImageTemplate.propertyFields.latitude = "latitude";
originImageTemplate.propertyFields.longitude = "longitude";
originImageTemplate.propertyFields.id = "id";

originImageTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
originImageTemplate.nonScaling = true;
originImageTemplate.tooltipText = "{title}";

originImageTemplate.setStateOnChildren = true;
originImageTemplate.states.create("hover");

originImageTemplate.horizontalCenter = "middle";
originImageTemplate.verticalCenter = "middle";

let originHitCircle = originImageTemplate.createChild(am4core.Circle);
originHitCircle.radius = 11;
originHitCircle.fill = interfaceColors.getFor("background");

let originTargetIcon = originImageTemplate.createChild(am4core.Sprite);
originTargetIcon.fill = interfaceColors.getFor("alternativeBackground");
originTargetIcon.strokeWidth = 0;
originTargetIcon.scale = 1.3;
originTargetIcon.horizontalCenter = "middle";
originTargetIcon.verticalCenter = "middle";
originTargetIcon.path = targetSVG;

let originHoverState = originTargetIcon.states.create("hover");
originHoverState.properties.fill = chart.colors.getIndex(1);

// when hit on city, change lines
originImageTemplate.events.on("hit", function(event) {
    showLines(event.target.dataItem);
})

// destination series (small targets)
let destinationImageSeries = chart.series.push(new am4maps.MapImageSeries());
let destinationImageTemplate = destinationImageSeries.mapImages.template;

destinationImageTemplate.nonScaling = true;
destinationImageTemplate.tooltipText = "{title}";
destinationImageTemplate.fill = interfaceColors.getFor("alternativeBackground");
destinationImageTemplate.setStateOnChildren = true;
destinationImageTemplate.states.create("hover");

destinationImageTemplate.propertyFields.latitude = "latitude";
destinationImageTemplate.propertyFields.longitude = "longitude";
destinationImageTemplate.propertyFields.id = "id";

let destinationHitCircle = destinationImageTemplate.createChild(am4core.Circle);
destinationHitCircle.radius = 7;
destinationHitCircle.fillOpacity = 1;
destinationHitCircle.fill = interfaceColors.getFor("background");

let destinationTargetIcon = destinationImageTemplate.createChild(am4core.Sprite);
destinationTargetIcon.scale = 0.7;
destinationTargetIcon.path = targetSVG;
destinationTargetIcon.horizontalCenter = "middle";
destinationTargetIcon.verticalCenter = "middle";

originImageSeries.data = originCities;
destinationImageSeries.data = destinationCities;

// Line series
let lineSeries = chart.series.push(new am4maps.MapLineSeries());
lineSeries.mapLines.template.line.strokeOpacity = 0.5;

chart.events.on("ready", function() {
    showLines(originImageSeries.dataItems.getIndex(0));
})


let currentOrigin;

function showLines(origin) {

    let dataContext = origin.dataContext;
    let destinations = dataContext.destinations;
    // clear old
    lineSeries.mapLines.clear();
    lineSeries.toBack();
    worldPolygonSeries.toBack();

    currentOrigin = origin;

    if (destinations) {
        for (var i = 0; i < destinations.length; i++) {
            let line = lineSeries.mapLines.create();
            line.imagesToConnect = [origin.mapImage.id, destinations[i]];
        }
    }

    title.text = "Flights from " + dataContext.title;

    chart.zoomToGeoPoint({ latitude: dataContext.zoomLatitude, longitude: dataContext.zoomLongitude }, dataContext.zoomLevel, true);
}

let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.strokeOpacity = 0.05;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}
export default App;