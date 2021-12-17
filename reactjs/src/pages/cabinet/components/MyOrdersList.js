import React from "react";
import { List, Avatar, Tag } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axiosInstance from "../../../common/axios";
import { useState, useEffect } from "react";
import moment from "moment";

const MyOrdersList = () => {
  const [data, setData] = useState([{ order: { orderitem: [] } }])

  useEffect(() => {
    axiosInstance.get('users/profile-order/').then(response => setData(response.data)).catch(err => console.log(err))
  }, [])
  console.log(data)
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={data}
      renderItem={(item, idx) => (
        <List.Item
          key={idx}
        >
          <List.Item.Meta
            title={moment(item.date_create).format('MMMM Do YYYY, H:mm')}
          />
        
          {item.order.orderitem.map(ell => <p>{ell.product} - {ell.quantity}</p>)}
          <p>Total price {item.order.total}</p>
          <br /><br />
          <b>Status </b>:&nbsp;&nbsp;&nbsp;{item.status}
        </List.Item>
      )}
    />
  );
};
export default MyOrdersList;
