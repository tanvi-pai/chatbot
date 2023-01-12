import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const Piechart = (props) => {

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
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
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
        text: 'Browser market shares in May, 2020',
        align: "center",
        style: {
          color: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "MatterMedium"
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                distance: 18,
            connectorWidth: 2,
                style: {
                    color:"grey",
                    fontSize: "11px",
                    fontFamily: "arial",
                    fontWeight: "normal",
                    textOutline: "none",
                  },
                  useHTML: true,
            }
        }
    },
    series: props.seriesData
}

  setChartOptions(options);
} 


  return <HighchartsReact options={chartOptions} highcharts={Highcharts} />;
};

export default Piechart;
