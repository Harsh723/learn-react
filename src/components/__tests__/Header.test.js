import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../Header"
import { Provider } from "react-redux"
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render a Header component with a login button", ()=>{

    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header/>
            </Provider>
        </BrowserRouter>    
    )

    //There are many ways to query my login button
    //const loginButton =  screen.getByRole("button") //good way to find
    //const loginButton =  screen.getByText("Login") //not a good way

    //suppose there a multiple button and I want to check specifically for login button
    const loginButton =  screen.getByRole("button", { name: "Login"} )

    //Assertion
    expect(loginButton).toBeInTheDocument()

})

it("Should render a Header component with a cart items 0", ()=>{

    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header/>
            </Provider>
        </BrowserRouter>    
    )

    //Querying
    const cartItems =  screen.getByText("Cart-(0 items)")

    //Assertion
    expect(cartItems).toBeInTheDocument()

})

it("Should render a Header component with a cart items ", ()=>{ //I want to check only cart items , doesnot matter number of items 

    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header/>
            </Provider>
        </BrowserRouter>    
    )

    //Querying
    const cartItems =  screen.getByText(/Cart/) //we can also use regex here when we are using getByText

    //Assertion
    expect(cartItems).toBeInTheDocument()

})

it("Should change login button to logout on click", ()=>{ // test click event

    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header/>
            </Provider>
        </BrowserRouter>    
    )

    //Querying
    const loginButton =  screen.getByRole("button", { name: "Login"} )

    //how will I stimulate click event ? -- using fireEvent
    fireEvent.click(loginButton) // this way we can fire the click event and expect something to be in the document

    //Now as we know on click of login button , button text will change to logout button , so now we will try to find the logout button in the app
    const logoutButton = screen.getByRole("button", { name: "Logout"} )

    //Assertion
    //now I would expect my logout button to be in the document 
    expect(logoutButton).toBeInTheDocument()

}) 