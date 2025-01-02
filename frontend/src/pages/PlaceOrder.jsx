import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";  
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate,backendUrl,cartItems,setCartItems,delivery_fee,getCartAmount,products,token} = useContext(ShopContext);
  const [formdata,setformdata] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangehandler = (event) => {
      const name = event.target.name
      const value  = event.target.value

      setformdata(data =>({...data,[name]:value}))
  }
  
  const onsubmithandler = async (event) =>{
        event.preventDefault()

        try {
           let orderItems = []

           for(const items in cartItems){
            for(const item in cartItems[items]){
                 if(cartItems[items][item]>0){
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if(itemInfo){
                      itemInfo.size = item
                      itemInfo.quantity = cartItems[items][item]
                      orderItems.push(itemInfo)
                    }
                 }
            }
           }
          //  console.log(orderItems)
          let orderData = {
            address:formdata,
            items:orderItems,
            amount:getCartAmount()+delivery_fee
          }

          switch(method){
            
            case 'cod':
              const response = await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
              console.log(response)
              if(response.data.success){
                setCartItems({})
                navigate('/orders')
              }
              else{
                toast.error(response.data.message)
              }
              break;
            case 'stripe':
              toast.error('Not available')
              break;
            
            case 'razorpay':
              toast.error('Not available')
              break;
            
            default:
              break;

          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }

  }

  return (
    <form onSubmit={onsubmithandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left-side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl my-3 sm:text-3xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input onChange={onchangehandler} name='firstName' value={formdata.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-600 py-3 px-4 w-full"
            required
          />
          <input onChange={onchangehandler} name='lastName' value={formdata.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-600 py-3 px-4 w-full "
            required
          />
        </div>
        <div>
          <input onChange={onchangehandler} name='email' value={formdata.email}
            type="email"
            placeholder="Email"
            className="border border-gray-600 py-3 px-4 w-full"
            required
          />
          <input onChange={onchangehandler} name='street' value={formdata.street}
            type="text"
            placeholder="Street"
            className="border border-gray-600 py-3 px-4 w-full mt-4"
            required
          />
        </div>
        <div className="flex gap-3">
          <input onChange={onchangehandler} name='city' value={formdata.city}
            type="text"
            placeholder="City"
            className="border border-gray-600 py-3 px-4 w-full"
            required
          />
          <input onChange={onchangehandler} name='state' value={formdata.state}
            type="text"
            placeholder="State"
            className="border border-gray-600 py-3 px-4 w-full "
            required
          />
        </div>
        <div className="flex gap-3">
          <input onChange={onchangehandler} name='zipcode' value={formdata.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-600 py-3 px-4 w-full"
            required
          />
          <input onChange={onchangehandler} name='country' value={formdata.country}
            type="text"
            placeholder="Country"
            className="border border-gray-600 py-3 px-4 w-full "
            required
          />
        </div>
        <input onChange={onchangehandler} name='phone' value={formdata.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-600 py-3 px-4 w-full"
          min={10}
          required
        />
      </div>

      {/* Right-side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-4 mx-4" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-4 mx-4" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white text-2xl px-5 py-2 mt-2"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
