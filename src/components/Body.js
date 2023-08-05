import RestaurantCard from "./RestaurantCard";
//import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    console.log("hello", json);
    //Optional Chaining
    setListOfRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  //conditional rendering
  //if (listOfRestaurant.length === 0) return <Shimmer />;
  console.log("body rendered", listOfRestaurant);

  //another way to write conditional rendering is to use ternary operator
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(searchText);
              const filterRestaurant = listOfRestaurant.filter(
                (res) =>
                  //res.data.name.includes(searchText) - this will not work for all the cases and people generally stuck here
                  res.data.name.toLowerCase().includes(searchText.toLowerCase()) // better way
                //incase of empty text how inclues returning true for all the cases ?
              );
              setFilteredRestaurant(filterRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRestaurant = listOfRestaurant.filter(
              (val) => val.data.avgRating > 4
            );
            setFilteredRestaurant(filteredRestaurant);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((res) => (
          <Link key={res.info.id} to={"/restuarant/" + res.info.id}>
            <RestaurantCard resData={res} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
