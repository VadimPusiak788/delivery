import { useState } from "react";
import "./css/index.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import CabinetLayout from "./components/CabinetLayout";
import { Menu } from "antd";
import {
  LikeOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  RollbackOutlined,
  FieldTimeOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import MyDataList from "./components/MyDataList";
import MyOrdersList from "./components/MyOrdersList";
import ListOfDeals from "./components/ListOfDeals";


const PerformerCabinet = ({ match }) => {
  const menuItems = (
    <>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        <Link to={`${match.url}/my-data`}>My data</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DollarCircleOutlined />}>
        <Link to={`${match.url}/history-orders`}>History orders</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<OrderedListOutlined />}>
        <Link to={`${match.url}/list-of-deals`}>List of deals</Link>
      </Menu.Item>
    </>
  );

  const switchRoutes = (
    <>
      <Route path={`${match.url}/my-data`}>
        <MyDataList />
      </Route>
      <Route path={`${match.url}/history-orders`}>
        <MyOrdersList />
      </Route>
      <Route path={`${match.url}/list-of-deals`}>
        <ListOfDeals />
      </Route>
    </>
  );
  return (
    <CabinetLayout
      menuItems={menuItems}
      match={match}
      switchRoutes={switchRoutes}
    />
  );
};

export default PerformerCabinet;
