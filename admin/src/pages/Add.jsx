import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("sizes", JSON.stringify(sizes));
      formdata.append("category", category);
      formdata.append("bestseller", bestseller);
      formdata.append("subcategory", subcategory);

      image1 && formdata.append("image1", image1);
      image2 && formdata.append("image2", image2);
      image3 && formdata.append("image3", image3);
      image4 && formdata.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formdata,
        { headers: { token } }
      );

      // console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
        setname("");
        setdescription("");
        setbestseller(false);
        setprice("");
        setcategory("");
        setsubcategory("");
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onsubmithandler}>
      <div>
        <p className="mb-3 font-bold">Upload Image</p>
        <div className="flex gap-1 sm:gap-5">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setimage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setimage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setimage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setimage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div>
        <p className="mt-3 font-bold">Product Name</p>
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          className="mt-2 border border-gray-300 px-3 py-1 w-full max-w-[450px]"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div>
        <p className="mt-3 font-bold">Product Description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          className="mt-2 border border-gray-300 px-3 py-1 w-full max-w-[450px]"
          type="text"
          placeholder="write here"
          required
        />
      </div>

      <div className="sm:flex gap-10 block">
        <div className="mt-3">
          <p className="font-bold">Product Category</p>
          <select
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            className="mt-2 px-2 py-1 border border-gray-300"
            required
          >
            <option>--select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="mt-3">
          <p className="font-bold">Sub-Category</p>
          <select
            onChange={(e) => setsubcategory(e.target.value)}
            value={subcategory}
            className="mt-2 px-2 py-1 border border-gray-300 "
            required
          >
            <option>--select</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="mt-3">
          <p className="font-bold">Product Price</p>
          <input
            onChange={(e) => setprice(e.target.value)}
            value={price}
            className="mt-2 px-2 py-1 border border-gray-300"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div>
        <p className="mt-3 font-bold">Product Sizes</p>
        <div className="mt-2 flex gap-3">
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 w-full mt-4 px-3 py-2 sm:w-1/3">
        <input
          onChange={() => setbestseller((prev) => !prev)}
          checked={bestseller}
          className="cursor-pointer"
          type="checkbox"
          id="bestseller"
          required
        />
        <label className="ml-2 cursor-pointer font-bold" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-8 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
