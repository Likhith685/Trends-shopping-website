import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useEffect } from "react";
import axios from "axios"
const Orders = () => {
  const {backendUrl,token,currency} = useContext(ShopContext);

  const [orderData,setorderData] =useState([])
 const [loadingIndex, setLoadingIndex] = useState(null);


 const loadorderData1 = async (index) => {
  setLoadingIndex(index);
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Order tracking simulated for index:', index);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingIndex(null);
  }
};

  const loadorderData = async () =>{
      try {
         if(!token){
          return null
         }
         const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
        //  console.log(response.data)
        if(response.data.success){
          let allordersitem=[]
          response.data.orders.map((order)=>{
            order.items.map((item)=>{
                item['status']=order.status
                item['payment']=order.payment
                item['paymentmethod']=order.paymentmethod
                item['date']=order.date
                allordersitem.push(item)
              })
          })
          setorderData(allordersitem.reverse())
        }
      } catch (error) {
        
      }
  }
  useEffect(()=>{
    loadorderData()
  },[token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between  gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-400">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size : {item.size}</p>
                </div>
                <p className="mt-2">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p>Payment: <span className="text-gray-400">{item.paymentmethod}</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between ">
             
<div className="flex flex-col items-start gap-6 relative">
  {["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"].map((step, i, arr) => {
    const currentIndex = arr.indexOf(item.status);
    const isCompleted = i < currentIndex || step === "Order Placed"; // always green
    const isCurrent = i === currentIndex;
    const isLast = i === arr.length - 1;

    return (
      <div key={step} className="flex items-start gap-3 relative">
        {/* Dot and vertical line */}
        <div className="flex flex-col items-center">
          {/* Dot */}
          <div className={`w-4 h-4 rounded-full z-10
            ${isCompleted ? "bg-green-500" : isCurrent ? "bg-green-600 animate-pulse" : "bg-gray-300"}`}>
          </div>
          {/* Vertical Line */}
          {!isLast && (
            <div className={`w-px flex-1 ${
              i < currentIndex ? "bg-green-500" : "bg-gray-300"
            }`} style={{ height: '40px' }}></div>
          )}
        </div>

        {/* Step label */}
        <p className="text-sm">{step}</p>
      </div>
    );
  })}
</div>




               <button
  onClick={() => loadorderData1(index)}
  className="text-sm font-medium rounded-sm flex items-center gap-2"
  disabled={loadingIndex === index}
>
  {loadingIndex === index ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
        ></path>
      </svg>
      Loading...
    </>
  ) : (
    'Track Your Order'
  )}
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
