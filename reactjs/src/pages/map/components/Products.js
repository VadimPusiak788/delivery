import { useState, useEffect } from "react";
import axiosInstance from "../../../common/axios";
import { List, Button, message, Image } from 'antd';
import { useParams } from 'react-router-dom';

const Products = (params) => {
    const [products, setProducts] = useState([])
    let { id } = useParams();

    useEffect(() => {
        axiosInstance.get(`order/supplier/detail/${id}/`).then(response => setProducts(response.data.products)).catch(err => console.log(err))
    }, [])

    const handleOrder = (id) => {
        axiosInstance.post(`order/product/detail/${id}/`).then(response => { if (response.status === 200) { message.success('Added to cart') } })
    }

    return <List
        size="large"
        grid={{ gutter: 10, column: 3 }}
        footer={<div></div>}
        bordered
        dataSource={products}
        renderItem={item => 
        <List.Item style={{marginTop: '5em' }} actions={[<Button type="primary" style={{marginTop: '3em' }} onClick={() => { handleOrder(item.id) }}>Order</Button>]}>
            <List.Item.Meta
                title={item.name}
                description={item.description}

            />
            <Image
      width={200}
      src="https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
      />
            <p>{item.price} UAH</p>

        </List.Item>}
    />
}

export default Products;