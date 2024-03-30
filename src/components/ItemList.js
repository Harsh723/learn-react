import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constant";
import { addItem } from "../utils/cartSlice";

export default function ItemList({ items }) {

    //just like useSelector is for reading , we have useDispatch for dispatching the action
    const dispatch = useDispatch() // this dispatch is an function

    const handleAddItem = (item) => {
        //dispatch an action
        dispatch(addItem(item)) //this will dispatch an action addItem having action.payload as "pizza" and call the reducer to modify the state
        //when you dispatch this action, redux under the hood create an object { payload: "burger"} and pass it as 2nd argument(action) to reducer addItems
    }

  return (
    <div>
        {items.map(item => (
            <div 
                key={item.card.info.id}
                className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
            >
                <div className="w-9/12">
                    <div className="py-2">
                        <span>{item.card.info.name}</span>
                        <span> - ₹ {item.card.info.price/100 ?? item.card.info.defaultPrice/100}</span>
                    </div>
                    <p className="text-sm">
                        {item.card.info.description}
                    </p>
                </div>
                <div className="w-3/12 p-4">
                    <div className="absolute">
                        <button 
                            className="p-2 mx-5 bg-white shadow-lg rounded-lg"
                            onClick={() => handleAddItem(item)}
                        >
                            Add +
                        </button>
                    </div>
                    <img src={CDN_URL + item.card.info.imageId} className="w-full"/>
                </div>
            </div>
        ))}
    </div>
  )
}
