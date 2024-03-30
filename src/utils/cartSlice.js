import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({ // this fn takes some configuration
    name: 'cart', //name of the slice
    initialState: { //initialstate of this cart slice
        items: []
    },
    reducers:{ //here we have written reducers because when we write slice we create multiple reducers unlike app store which has one big reducer which contains all small reducers of different slice
        // here will write reducer fn corresponding to each action
        addItem: (state,action) => { // addItem is an action and () => {} this is an reducer fn corresponding to this action and this fn will modify our cart slice state
            state.items.push(action.payload)//this reducer fn takes 2 parameters state, action and based on the action it modifies the state
            //note down --> in the above line we are directly mutating(means directly modifying the actual state) the state over here
            //In Redux Toolkit , we dont have any option .... we HAVE to MUTATE THE STATE 
            //Mutating the state means we now write a impure function unlike vanilla redux
            //Also we dont have to return the state... redux will take care of that automatically unlike old redux

	    // In vanilla(older) redux , it was clearly mentioned in the documentation that donot MUTATE THE STATE DIRECTLY and returning the new state was mandatory
            // In old way of writing redux we used to update/modify the state like below , it means we used to write pure function
            // const newState = [...state]
            // newState.items.push(action.payload)
            // return newState 
	    //Note -> "Mutable" means "changeable". If something is "immutable", it can never be changed.
        https://supertokens.com/blog/why-is-redux-state-immutable#:~:text=Immutability%20of%20redux%20state%20is,becomes%20the%20new%20redux%20state.

	    //many developer doesnt know how to write a immutable object ? -- go read about it and practice	
            //immutable - https://www.freecodecamp.org/news/javascript-immutability-frozen-objects-with-examples/
	    // if object is nested then try do a deep clone of it ( try to create a immutable copy of it)

            //interesting part is even though as a developer we are mutating the state directly but behind the scene
            //redux is actually creating a immutable state just like old way of writing redux
            //redux is doing all these thing with the help of library called immer(https://immerjs.github.io/immer/)
            //it means behind the scene still redux working in old way , it just that now we dont have to take care of that
       
        },
        removeItem: (state,action) => {
            state.items.pop()
        },
        clearCart: (state) => { //here we dont action because we need to clear the cart state. If you need action then use it otherwise dont
            state.items.length = 0 // here we are mutating the actual state
            //state = [] --lot of ppl will think, we could have written like this to make our state as empty array but this will not work
            //here we are not modifying the state , we are adding a reference of [](empty array) to the state and immer wont work as expected behind the scene to create immutable state out of it
            //but Redux Toolkit say it is mandatory to mutate our state

            //let ry to understand why state = [] wont work
            //this state which is passed as paramter to reducer is a local state which will have reference of original state
            //for example original state = ["burger"] and state(local state) = ["burger"] ....here we are passing the reference of original state to local state
            // now if my I do state.items.length = 0 ...it will modify the original state
            // but we do state = [] , it means now we are passing the refernce of [] and reference to original state is lost , i.e this logic wont update the original state and only local state
            //as RTK say we have to mutate our state i.e we did like state.items.length = 0

            //inside reducer console.log does not work and it will show proxyobject in console
            //then how to debug ? redux provide a current() which will show the object properly in console.
            console.log('current state',current(state)) // like this we have write inside reducer to debugs state
            //check the console log for state = [] --> original state = { items: ["burger"] }
            // state.items.length = 0 --> original state = { items: [] }

            //now one more interesting point
            //RTK says either MUTATE THE STATE or return a NEW STATE
            //return { items: [] } --> this could have also worked because we are replacing a orignal state with a new state {items: [] }

        }
    }
});

//when we create a slice using createSlice , it returns a cart slice object
//and this cartSlice object will look like this
// { actions: { addItems, ...} ,  reducers }
console.log('cartSlice', cartSlice);

//now I want to export 2 things (actions and reducer)

//here we are destructing the actions from cartSlice.actions object
export const { addItem, removeItem, clearCart } = cartSlice.actions; // this is the syntax given by redux toolkit

export default cartSlice.reducer; //here we have mention reducer not reducers as we are exporting all reducers collectively as reducer