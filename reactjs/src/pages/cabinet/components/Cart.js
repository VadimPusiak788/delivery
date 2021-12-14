import axiosInstance from "../../../common/axios";
import { useEffect, useState } from "react";
import { List, Button, message } from 'antd';

const Cart = () => {
    const [cartData, setCartData] = useState({ products: [] })

    useEffect(() => {
        axiosInstance.get("order/customer/view_cart/").then(response => setCartData(response.data)).catch(err => console.log(err))
    }, [])

    const handleOrder = () => {
        axiosInstance.post("order/customer/view_cart/").then(response => message.success("Ordered")).catch(err => console.log(err))
    }

    const handleDecline = (pk) => {
        axiosInstance.delete("order/customer/view_cart/").then(response => message.success("Declined")).catch(err => console.log(err))
    }

    const handleOrderRemove = (id) => {
        axiosInstance.post(`order/customer/delete_order/${id}/`).then(response => { if (response.status === 200) { message.success('Remove product') } })
    }
    const handlerender = (isPrice) => {
        if (isPrice){
        return   <h3>Total price: {cartData.price_total} UAH</h3>;
    }
    }

    console.log(cartData)
    return <>
        {handlerender(cartData.price_total)}
        <List
            size="large"
            bordered
            dataSource={cartData.products}
            renderItem={item =>
            <List.Item actions={[<Button type="primary" style={{marginTop: '3em' }} onClick={() => { handleOrderRemove(item.id) }}>Remove this order</Button>]}>
                <div>
                <p>{item.product}</p>
                <p>Quantity: {item.quantity}</p>
                </div>

        </List.Item>}
        />
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '5rem' }}>
            <Button type="primary" style={{ marginRight: '2rem' }} onClick={() => handleOrder()}>Order</Button>
            <Button type="primary" danger onClick={() => handleDecline()}>Decline</Button>
        </div>
    </>
}

export default Cart;