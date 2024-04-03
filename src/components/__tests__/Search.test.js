import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Body from "../Body"
import MOCK_DATA from "../mocks/mockResSearchListData.json"
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom"

//This is the example of integration testing , here we are testing search and top rated resturant functionality

//basically I am trying to make dummy fetch fn exactly like fetch fn that browser gives us
//We know that fetch returns a promise and that promise returns a json and that json again return us the promise, when we resolve that promise then we get the data
global.fetch = jest.fn(() => {
    return Promise.resolve({
        json : () => {
            return Promise.resolve(MOCK_DATA)
        }
    })
});

it("Should search res list for burger input", async() => {

    await act(async () => 
        render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>
        )
    );

    const searchBtn = screen.getByRole("button", { name: "Search"})

    expect(searchBtn).toBeInTheDocument()
    
    const cardsBeforesearch = screen.getAllByTestId("resCard")

    expect(cardsBeforesearch.length).toBe(20)

    //I have not provided any placeholder in input box or I dont want to use getByRole or any other or getting using these method andunable to figure out the reason
    //Then use getByTest() , this will always works. Just provide data-testid="value" to the element you want to track
    //This is another way to find something from screen
    const searchInputBox = screen.getByTestId("searchInput") //searchInput should be same as data-testid value in input box

    //console.log(searchInputBox)

    //event object is givent to us by broswer not javascript when we write on change event
    //now we need to mock the event object here like this way { target : { value : "searchvalue"}}
    //{ target : { value : "searchvalue"}} this is our mock event object
    fireEvent.change(searchInputBox, { target : { value : "burger"}} )

    // now we need to click on search button
    fireEvent.click(searchBtn)

    //Now what should I expect on click of search button ?
    // I am expecting a screen should load 5 restaurant cards

    const cardsAfterSearch = screen.getAllByTestId("resCard")

    expect(cardsAfterSearch.length).toBe(5)

})

it("Should filter top rated resturant", async () => {
    await act(async () => (
        render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>
        )
    ))

    const cardsBeforeFilter = screen.getAllByTestId("resCard")

    expect(cardsBeforeFilter.length).toBe(20)

    const filterButton = screen.getByRole( "button", { name : "Top Rated Restaurant"} )

    fireEvent.click(filterButton)

    const cardAfterFilter = screen.getAllByTestId("resCard")

    expect(cardAfterFilter.length).toBe(17)

})