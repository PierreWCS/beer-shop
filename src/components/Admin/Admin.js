import React, { useEffect, useState } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import NavBarAdmin from "./NavBarAdmin/NavBarAdmin";
import Api from "../services/Api";
import Chart from "./Chart";

const Admin = () => {
  const [ordersDate, setOrdersDate] = useState(null);

  let stockMonths = [15, 10, 20, 27, 30, 12, 17, 19, 25, 35, 47, 42];

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrders = () => {
    Api.get("orders").then((res) => {
      console.log(res.data);
      let stockOrders = res.data;
      for (let i = 0; i < stockOrders.length; i++) {
        // Defining the order month
        let orderMonth =
          stockOrders[i].order_date[0] + stockOrders[i].order_date[1];

        // Adding one order to the month
        stockMonths[Number(orderMonth) - 1] =
          stockMonths[Number(orderMonth) - 1] + 1;
        console.log(stockMonths);
      }
      setOrdersDate(stockMonths);
    });
  };

  const data = [
    {
      id: "sales",
      color: "hsl(39, 70%, 50%)",
      data: [
        {
          x: "January",
          y: stockMonths[0],
        },
        {
          x: "February",
          y: stockMonths[1],
        },
        {
          x: "March",
          y: stockMonths[2],
        },
        {
          x: "April",
          y: stockMonths[3],
        },
        {
          x: "May",
          y: stockMonths[4],
        },
        {
          x: "June",
          y: stockMonths[5],
        },
        {
          x: "July",
          y: stockMonths[6],
        },
        {
          x: "August",
          y: stockMonths[7],
        },
        {
          x: "September",
          y: stockMonths[8],
        },
        {
          x: "October",
          y: stockMonths[9],
        },
        {
          x: "November",
          y: stockMonths[10],
        },
        {
          x: "December",
          y: stockMonths[11],
        },
      ],
    },
  ];

  return (
    <div className="adminMainContainer">
      <NavBarAdmin />
      <div className="adminPageContainer">
        <h1 className="titleAdminPage">Sales summary</h1>
        {ordersDate ? (
          <div className="graphContainerAdmin">
            <Chart data={data} />
          </div>
        ) : null}

        <Link className="backtoHomeAdminContainer" to="/">
          <img
            src={require("../images/logoBeer.png")}
            className="logoBackToHome"
            alt="back to home"
          />
          Back to the site
        </Link>
      </div>
    </div>
  );
};

export default Admin;
