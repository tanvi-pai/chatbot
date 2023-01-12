import React from "react";
import Barchart from "../charts/Barchart/barchart";
import {Row, Col} from "react-bootstrap"

const Dashboard = () => {

  const seriesData = [{
    name: 'Working',
    data: [49.9, 71.5]

}, {
    name: 'Failed',
    data: [83.6, 78.8]

}]

const categories=["Asset1", "Asset2"]


  return (
    <div>
      <Col>
      <Barchart seriesData={seriesData} categories={categories} legends={true} />
      </Col>
      {/* <Col>
      <Barchart seriesData={seriesData} categories={categories} legends={true} />
      </Col> */}
    </div>
  )
};

export default Dashboard;
