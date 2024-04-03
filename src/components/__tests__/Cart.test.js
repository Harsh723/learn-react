import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import RestaurantMenu from "../RestaurantMenu"
import MOCK_DATA from "../mocks/mockResMenu.json"
import { Provider } from "react-redux"
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom"
import Header from "../Header"
import Cart from "../Cart"
import "@testing-library/jest-dom"

global.fetch = jest.fn(() =>{
    return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA)
    })
})
//test case - on click of add+ button it updates the no of item in carts in header and also update the cart page and to update the cart page we need to render RestaurantMenU component as well
it("Should load Restaurant Menu Component", async () => {
    //as per test case cart page and header component will update it means we need to render both and render RestaurantMenU component as well
    await act(async () => render(
            <BrowserRouter>
                <Provider store={appStore}> 
                    <Header/>
                    <RestaurantMenu/>
                    <Cart/>
                </Provider>
            </BrowserRouter>
            )
        )

    //as we have render Header , RestaurantMenu & Cart component our screen will have all the component
    //to reach to add+ button , before we need to click any of the accordion .. right now all accordion are collapsed
    const accordionHeader = screen.getByText("Chocolate Sundaes (9)")

    fireEvent.click(accordionHeader)

    //now I need to test whether my accordion got expanded or not
    //how ? lets put testid to item list
    expect(screen.getAllByTestId("foodItems").length).toBe(9)

    //if we are it means our accordion got expanded and now I cac click on add+ button

    const addBtns = screen.getAllByRole("button", { name : "Add +"})

    //before clicking on add button, my header should have Cart-(0 items)

    expect(screen.getByText("Cart-(0 items)")).toBeInTheDocument()
    
    //there would be 9 Add + button , let me click on 1st button
    fireEvent.click(addBtns[0])

    //on click of Add + button , my header should change to Cart-(1 items)
    expect(screen.getByText("Cart-(1 items)")).toBeInTheDocument()

    fireEvent.click(addBtns[1])

    expect(screen.getByText("Cart-(2 items)")).toBeInTheDocument()

    //now we need to test cart page whether it has 2 items or not
    //In the Cart component ItemList component is beiing reused where have already added testid = "foodItems"
    //It means now we need to expect that foodItems testid should be 11 (9 from RestaurantMenu page & 2 Cart page)

    expect(screen.getAllByTestId("foodItems").length).toBe(11)

    //lets clear cart items
    fireEvent.click(screen.getByRole("button", { name: "Clear cart"}))

    expect(screen.getAllByTestId("foodItems").length).toBe(9)
})