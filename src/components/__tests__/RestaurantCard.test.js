import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard"
import MOCK_CARD from "../mocks/resCardMock.json"
import "@testing-library/jest-dom"

it("Should render Restaurant card component with props Data", ()=>{

    render(<RestaurantCard resData={MOCK_CARD}/>)

    const restroName = screen.getByText("California Burrito")

    expect(restroName).toBeInTheDocument();
    
    //write test case for Promoted label (withPromotedLabel HOC)
})