import { useState } from "react";
import "./css/index.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import CabinetLayout from "./components/CabinetLayout";
import { Menu } from "antd";
import {
  LikeOutlined,
  SendOutlined,
  FileTextOutlined,
  RollbackOutlined,
  SettingOutlined,
  FieldTimeOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import MyDataList from "./components/MyDataList";
import MyOrdersList from "./components/MyOrdersList";
import CustomerSettings from "./components/CustomerSettings";
import ActiveDeal from "./components/ActiveDeal";
import Cart from './components/Cart'

const CustomerCabinet = ({ match }) => {
  const menuItems = (
    <>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        <Link to={`${match.url}/my-data`}>My data</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
        <Link to={`${match.url}/cart`}>Cart</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FieldTimeOutlined />}>
        <Link to={`${match.url}/history-orders`}>History orders</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<RollbackOutlined />}>
        <Link to="/">Back to site</Link>
      </Menu.Item>
    </>
  );

  const switchRoutes = (
    <>
      <Route path={`${match.url}/my-data`}>
        <MyDataList />
      </Route>
      <Route path={`${match.url}/cart`}>
        <Cart />
      </Route>
 
      <Route path={`${match.url}/history-orders`}>
        <MyOrdersList />
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

export default CustomerCabinet;
