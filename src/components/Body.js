import RestaurantCard , { withPromotedLabel } from "./RestaurantCard";
//import resList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext.js";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardWithPromoted = withPromotedLabel(RestaurantCard);

  const { LoggedInUser, setUserName } = useContext(UserContext)

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
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you are offline!! please check your internet connection
      </h1>
    );

  //conditional rendering
  //if (listOfRestaurant.length === 0) return <Shimmer />;
  //console.log("body rendered", listOfRestaurant);

  //another way to write conditional rendering is to use ternary operator
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="m-4 px-4 py-2 bg-green-100 rounded-lg"
            onClick={() => {
              console.log(searchText);
              const filterRestaurant = listOfRestaurant.filter(
                (res) =>
                  //res.data.name.includes(searchText) - this will not work for all the cases and people generally stuck here
                  res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) // better way
                //incase of empty text how inclues returning true for all the cases ?
              );
              setFilteredRestaurant(filterRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurant.filter(
                (val) => val.info.avgRating > 4
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <label>UserName: </label>
          <input 
            className="border border-black p-2" 
            value={LoggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurant.map((res) => (
          <Link key={res.info.id} to={"/restuarant/" + res.info.id}>
            {res.info.isOpen ? (
              <RestaurantCardWithPromoted resData={res?.info} />
            ) : (
              <RestaurantCard resData={res?.info} />
            )
            }    
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
