import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterproducts, setfilterproducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setsubcategory] = useState([]);
  const [sortType, setsortType] = useState("relevant");

  const toggleCategory = (e) => {
    //  If the clicked value (e.target.value) already exists in the array it removes it
    //  otherwise it adds it in to the array

    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    //  If the clicked value (e.target.value) already exists in the array it removes it
    //  otherwise it adds it in to the array

    if (subCategory.includes(e.target.value)) {
      setsubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyfilter = () => {
    let productcopy = products.slice();

    if (showsearch && search) {
      productcopy = productcopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productcopy = productcopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productcopy = productcopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setfilterproducts(productcopy);
  };

  const sortProduct = () => {
    let fpcopy = filterproducts.slice();

    switch (sortType) {
      case "low-high":
        setfilterproducts(fpcopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setfilterproducts(fpcopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyfilter();
        break;
    }
  };

  useEffect(() => {
    applyfilter();
  }, [category, subCategory, search, showsearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setshowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 "
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        <hr />
        <hr />

        {/* Category filter */}
        <div
          className={`border border-green-400 pl-5 py-3 mt-10 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-small font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
        <div
          className={`border border-green-400 pl-5 py-3 my-10 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-small font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right-side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"}></Title>
          {/* Product sorting */}
          <select
            onChange={(e) => setsortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by- Relevant</option>
            <option value="low-high">Sort by - low to high</option>
            <option value="high-low">Sort by- high to low</option>
          </select>
        </div>

        {/* Mapping the products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterproducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
