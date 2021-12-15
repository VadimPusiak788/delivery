import { List, Card, Image, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../common/axios';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Products from './Products';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([])
    useEffect(() => {
        axiosInstance.get('order/list/supplier/').then(response => setSuppliers(response.data)).catch(err => console.log(err))
    }, [])
    console.log(suppliers)
    return <Switch>
        <Route exact path="/" ><List
        grid={{ gutter: 10, column: 3 }}
        footer={<div></div>}
            bordered
            dataSource={suppliers}
            renderItem={item => (
             <List.Item style={{marginTop: '5em' }}>
                <Card title={<Link to={`/supplier/${item.id}`}><div style={{justifyContent: "center" }}>{item.name}</div></Link>}>
                <Image
      width={200}
      
      src="http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
      />
                 </Card>
                 <p>City: {item.location.city}</p>
                <p>Street: {item.location.street}</p>
            </List.Item>
            )}
            
        /></Route>
        <Route path="/supplier/:id" > <Products /></Route>
    </Switch>


}

export default Suppliers;