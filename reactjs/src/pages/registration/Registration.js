import { React, useState } from "react";
import { Card, Row, Col, Tabs } from "antd";
import "./css/registration.css";
import CustomerFrom from './components/CustomerFrom'
import PerformerForm from './components/PerformerForm'
import axiosInstance from "../../common/axios";
import { useEffect } from "react";

const { TabPane } = Tabs;

const Registration = () => {
  return (
    <Row className="login-row" justify={"space-between"}>
      <Col className="image-background" span={14}>
      </Col>
      <Col className="login-col" span={10}>
        <Card title="Sign up" style={{ width: "35rem" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Customer" key="1">
              <CustomerFrom />
            </TabPane>
            <TabPane tab="Courier" key="2" >
              <PerformerForm />
            </TabPane>
          </Tabs>
        </Card>
      </Col >
    </Row >
  );
};

export default Registration;
