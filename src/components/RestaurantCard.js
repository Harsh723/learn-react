import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {

  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData;

  return (
    <div data-testid="resCard" className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo / 100} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};


//Higher Order Component

export const withPromotedLabel =(RestaurantCard)=>{
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white rounded-lg m-2 p-2">Promoted</label>
        <RestaurantCard resData={props.resData}/>
      </div>
    )
  }
}

export default RestaurantCard;
