import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetchallorders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setorders(response.data.orders);
      }
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  const statushandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchallorders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchallorders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} * {item.quantity} <span>{item.size}</span>{" "}
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} * {item.quantity} <span>{item.size}</span>,{" "}
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-2 mb-1 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p className="mt-1 mb-1 font-medium">
                  {order.address.street + ","}
                </p>
                <p className="mb-1 font-medium">
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country}
                </p>
              </div>
              <p className="font-medium">{order.address.phone}</p>
            </div>

            <div>
              <p>
                <span className="font-bold">Items: </span>
                {order.items.length}
              </p>
              <p>
                <span className="font-bold">Payment Method: </span>
                {order.paymentmethod}
              </p>
              <p>
                <span className="font-bold">Payment : </span>
                {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                <span className="font-bold">Date: </span>
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <p>
              Order Amount :{currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statushandler(event, order._id)}
              value={order.status}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
