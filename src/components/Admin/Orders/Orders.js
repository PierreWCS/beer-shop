import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios({
      method: 'get',
      url: "http://localhost:8000/api/orders"
    })
      .catch(e => console.log(e))
      .then((res) => {
        const stockOrders = res.data;
        setOrders(stockOrders);
      })
  };

  return (
    <div className="productsAdmin">
      <NavBarAdmin />
      <div className="productsAdminContainer ordersMainContainerAdmin">
        hello
        {
          orders ?
            <div className="ordersTabContainer">
              <div className="headOrdersTab">
                <p className="ordersTabHeadCell">ID</p>
                <p className="ordersTabHeadCell">Date</p>
                <p className="ordersTabHeadCell">Status</p>
                <p className="ordersTabHeadCell">Total price</p>
              </div>
              {orders.map((order) => {
                return (
                  <div className="ordersTabCellContainer">
                    <p className="ordersTabCell">{order.id}</p>
                    <p className="ordersTabCell">{order.order_date}</p>
                    <p className="ordersTabCell">{order.order_status}</p>
                    <p className="ordersTabCell">{order.total_price}</p>
                  </div>
                )
              })}
            </div>
            : null
        }
      </div>
    </div>
  )
};

export default Orders;
