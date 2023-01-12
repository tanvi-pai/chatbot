import React from "react";
import { Container, Stack, Row, Col, Table } from "react-bootstrap";
import Barchart from "../charts/Barchart/barchart";
import Piechart from "../charts/Piechart/piechart";

const Dashboard = () => {

  const data = [{
    name: 'Worked',
    data: [49.9, 71.5]

}, {
    name: 'Failed',
    data: [83.6, 78.8]

}]

const categories = ["asset1", "asset2"]


const piechart = [{
  name: 'Brands',
  colorByPoint: true,
  data: [{
      name: 'Chrome',
      y: 70.67,
      sliced: true,
      selected: true
  }, {
      name: 'Edge',
      y: 14.77
  },  {
      name: 'Firefox',
      y: 4.86
  }, {
      name: 'Safari',
      y: 2.63
  }, {
      name: 'Internet Explorer',
      y: 1.53
  },  {
      name: 'Opera',
      y: 1.40
  }, {
      name: 'Sogou Explorer',
      y: 0.84
  }, {
      name: 'QQ',
      y: 0.51
  }, {
      name: 'Other',
      y: 2.6
  }]
}]

const colors = [
  "#4A80CA",
  "#5C68CA",
  "#4AA0CA",
  "#56A2E0",
  "#A369DC",
];

  return (
    <Row className="dashboard-container">
      <Col xs={6}>
      <Barchart seriesData={data} colors={colors} categories={categories} legends={true}/>
      </Col>
      <Col xs={6}>
      <Piechart seriesData={piechart} colors={colors} />
      </Col>
    </Row>
  )
};

export default Dashboard;
