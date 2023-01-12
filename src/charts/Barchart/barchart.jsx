import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const Barchart = (props) => {

  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: "transparent",
      height: props.height,
    },
    title: { text: "" },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    setChartData(props.seriesData);
  }, [props.seriesData]);

const setChartData = (data) => {
  const options = {
    chart: {
      type: 'column',
      backgroundColor: "transparent",
      height: 500,
      border: "0",
      spacing: [10, 10, 15, 10],
  },
  colors: props.colors,
      credits: {
        enabled: false
      },
      lang: {
        thousandsSep: "\u002C",
        noData: "No data to display"
      },
  title: {
      text: 'Monthly Average Rainfall',
      align: "center",
        style: {
          color: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "MatterMedium"
        }
  },
  subtitle: {
      text: props.subtitle ?? ""
  },
  xAxis: {
      categories: props.categories,
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
        enabled: props.yAxisTitle ? true : false,
        text: 'Rainfall (mm)'
      },
      gridLineColor: "transparent",
        gridLineWidth: 0,
        lineWidth: 0,
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  legend: {
    enabled: props.legends,
    symbolHeight: 9,
    symbolWidth: 9,
    symbolRadius: 0,
    itemStyle: {
      color: "grey",
      fontSize: "11px",
      fontWeight: "normal",
      fontFamily: "MatterMedium"
    }
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: props.seriesData
}

  setChartOptions(options);
} 


  return <HighchartsReact options={chartOptions} highcharts={Highcharts} />;
};

export default Barchart;
