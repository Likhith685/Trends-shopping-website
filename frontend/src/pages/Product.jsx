import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productdata, setproductdata] = useState(false);
  const [Image, setImage] = useState("");
  const [size, setsize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productdata ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ------------------ProductData---------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*--------------- productImages--------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={Image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/*------------------------ product info----------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 ">{productdata.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-4" alt="" />
            <img src={assets.star_icon} className="w-4" alt="" />
            <img src={assets.star_icon} className="w-4" alt="" />
            <img src={assets.star_icon} className="w-4" alt="" />
            <img src={assets.star_dull_icon} className="w-4" alt="" />
            <p className="pl-2">(1344)</p>
          </div>
          <p className="mt-3 font-medium text-3xl">
            {currency}
            {productdata.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productdata.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-4">
              {productdata.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`border py-2 px-4 border-gray-300 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => addToCart(productdata._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-1/2"
            >
              ADD TO CART
            </button>
            <hr className="mt-1 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-1 flex flex-col gap-1 ">
              <p>100% original product</p>
              <p>Cash on Delivery is available</p>
              <p>Easy return and Exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------Description and Review section-------------------- */}

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3  text-sm"> Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (354)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus harum mollitia similique dolorem ipsum cum recusandae
            molestiae officiis, provident porro nihil. Labore ipsam quo
            voluptates nemo? Debitis, eum aliquam quasi praesentium natus
            provident deserunt mollitia cum velit blanditiis, ab temporibus
            voluptas autem repudiandae? Iure illo quos dolore vero! Possimus,
            eveniet!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut,
            aut?Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            iste.
          </p>
        </div>
      </div>

      {/*--------------------- Display Related Products----------------- */}
      <RelatedProducts
        category={productdata.category}
        subCategory={productdata.subCategory}
      />
    </div>
  ) : (
    <div className="opacity:0"></div>
  );
};

export default Product;
