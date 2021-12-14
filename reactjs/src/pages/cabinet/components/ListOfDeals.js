import { Table, Tag, Space, Typography, message, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import axiosInstance from "../../../common/axios";
import moment from "moment";

const { Text, Link } = Typography;

const ListOfDeals = () => {
  const [statuses, setStatuses] = useState(null)
  const [data, setData] = useState()
  useEffect(() => {
    axiosInstance.get('users/free_order/').then(response => setData(response.data)).catch(err => console.log(err))
  }, [])

  const handleDelete = (key) => {
    const dataSource = [...data];
    setData(dataSource.filter((item) => item.order_id !== key));
  };
  const handleAccept = (id) => {
    axiosInstance.patch(`order/courier/change_order/${id}/`, { status: 'ACCEPT' }).then(response => {
      message.success("Success accepted");
    }).catch(err => console.log(err))
  };
  const handleFinish = (id) => {
    axiosInstance.patch(`order/courier/change_order/${id}/`, { status: 'FINISHED' }).then(response => {
      message.success("Successfully finished");
    }).catch(err => console.log(err))

  };

  const columns = [
    {
      title: "Date",
      dataIndex: 'date_create',
      render: (date_create, record) => {
        return moment(date_create).format('MMMM Do YYYY, H:mm')
      }
    },
    {
      title: "Order Items",
      dataIndex: "order",
      render: (order, record) => {
        return order.orderitem.map(item => <p>{item.product} - {item.quantity}</p>)
      }
    },
    {
      title: "Action",
      key: "action",
      render: (
        text,
        record
      ) => (
        <Space size="middle">
          {record.status == "ACCEPT" ?
            <Text
              type="danger"
              onClick={() => handleFinish(record.id)}
              className="list-of-deals-accept-text"
            >
              Finish
            </Text> : <Text
            type="success"
            onClick={() => handleAccept(record.id)}
            className="list-of-deals-accept-text"
          >
            Accept
          </Text>
          }
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ListOfDeals;
