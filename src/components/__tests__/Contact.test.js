import { render, screen } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom"
//this package will enable lot of cool method which we can use when we do expect(). or screen.

//Here we will test whether our contact us page loaded onto the DOM or not
test("Should load contact us component",()=>{

    //whenever you are testing a UI component in react, firstof all you will have to render that component into the jsdom
    render(<Contact/>)

    //Querying -> when we screen. something it means we are querying 
    const heading = screen.getByRole("heading") // a screen is rendered and I am trying to find my heading inside a rendered screen
    //getByRole will give me all the heading in our screen

    //Assertion
    expect(heading).toBeInTheDocument(); // it will check whether my header component is present in the document or not
    //if we run test till here, it will throw error because jsx is not enabled and our Contact.jsx cannot be render so we need to add a library (@babel/preset-react) to enable it
    //We also have to include @babel/preset-react inside my babel config like below
    //['@babel/preset-react', { runtime: "automatic" }]
    //@babel/preset-react is used to convert jsx code into html so that our testing library can read it properly
    // We need to install @testing-library/jest-dom to mske toBeInTheDocument() works as it is one of the fn provided by this package
    
    //Whenever we have to check something has loaded or not we use toBeInTheDocument()
    //for example -> we are checking whether this heading is present in the document , if yes i t means that our component has loaded successfully in the jsdom
})

test("Should load button inside Contact us component",()=>{

    render(<Contact/>)

    //const button = screen.getByRole("button")
    //what is these getByRole ?
    //There are many roles in the html and these roles are defined by jest in the testing library
    //for - heading , button etc..

    //there is another way to find button
    const button = screen.getByText("Submit") // if there is Submit text anywhere in my screen which means that submit wil be button

    //if we try to find any random thing which is not present in the screen , test case will fail
    //const button = screen.getByText("random") // reason -> Unable to find an element with the text
    //The beauty about the jest is it will show what is rendered in the terminal whenever your test case fails

    //Assertion
    expect(button).toBeInTheDocument();
})

test("Should load input name inside Contact us component",()=>{

    render(<Contact/>)

    
    const inputName = screen.getByPlaceholderText("name") ;
    //const inputName = screen.getByPlaceholderText("name1") ; // test case will detail explanation why it failed
    
    //Assertion
    expect(inputName).toBeInTheDocument();
})

test("should load 2 input boxes on the Contact component", () => {

    render(<Contact/>)

    //const inputBoxes = screen.getByRole("input"); //getByRole("input") is not correct coz there is no such role
    //But jest will suggest in you in the explanation of failure that you might be needing textbox role
    //paste the role error image
    //const inputBoxes = screen.getByRole("textbox"); // this throw an error bcoz with textbox role, jest found multiple elements .. we need to use getAllByRole()

    //Querying
    const inputBoxes = screen.getAllByRole("textbox") //this will give me all the input boxes in the inputBoxes

    //console.log(inputBoxes) //array of object
    //screen.getAllByRole("textbox") this returns a jsx element which is a react element i.e is a object (as we know react element at the end of day is a object)
    // jsx/react element/ react fibre node/ virtualdom object all these things are same thing
    //Once qyerying return the jsx/reactelement/react fibre node/ virtual dom object then we can do assertion on it to know whether these are true or not.

    //Assertion
    //as I want 2 boxes so our inputBoxes.length should be 2
    expect(inputBoxes.length).toBe(2)
    //we can use several other method for this case for ex - toBe, toBeGreaterThan,toBeFalsy etc..

    //expect(inputBoxes.length).not.toBe(3) // this will also pass -- not is like as ! mark

})

// describe("Contact us page test case", () => { //When you group together multiple test cases into a single block then that block is called describe

//these methods are provided by jest
//beforeAll(()=>{ console.log("before All")}) //--> It will before all the test case
//beforeEach(() =>{console.log("before Each")}) //-->It will run before each test case --- it is helpful for cleanup something
//afterAll(()=>{console.log("after All")}) //--> It will run after all test cases
//afterEach(()=>{console.log("after Each")}) //--> It will run aftfer test cases

//     test("Should load contact us component",()=>{

//         //whenever you are testing a UI component in react, firstof all you will have to render that component into the jsdom
//         render(<Contact/>)

//         //Querying -> when we screen. something it means we are querying 
//         const heading = screen.getByRole("heading") // a screen is rendered and I am trying to find my heading inside a rendered screen
//         //getByRole will give me all the heading in our screen

//         //Assertion
//         expect(heading).toBeInTheDocument(); // it will check whether my header component is present in the document or not
    
//         //Whenever we have to check something has loaded or not we use toBeInTheDocument()
//         //for example -> we are checking whether this heading is present in the document , if yes i t means that our component has loaded successfully in the jsdom
//     })

//     test("Should load button inside Contact us component",()=>{

//         render(<Contact/>)

//         //Querying
//         //const button = screen.getByRole("button")
//         //what is these getByRole ?
//         //There are many roles in the html and these roles are defined by jest in the testing library
//         //for - heading , button etc..

//         //there is another way to find button
//         const button = screen.getByText("Submit") // if there is Submit text anywhere in my screen which means that submit wil be button

//         //Assertion
//         expect(button).toBeInTheDocument();
//     })

//     test("Should load input name inside Contact us component",()=>{

//         render(<Contact/>)

//         //Querying
//         const inputName = screen.getByPlaceholderText("name") ;
//         //const inputName = screen.getByPlaceholderText("name1") ; // test case will detail explanation why it failed
    
//         //Assertion
//         expect(inputName).toBeInTheDocument();
//     })

//     //There is no difference it is just an alias of test , both are one and the samething
//     it("should load 2 input boxes on the Contact component", () => {

//         render(<Contact/>)

//         //const inputBoxes = screen.getByRole("input"); //getByRole("input") is not correct coz there is no such role
//         //But jest will suggest in you in the explanation of failure that you might be needing textbox role
//         //paste the role error image
//         //const inputBoxes = screen.getByRole("textbox"); // this throw an error bcoz with textbox role, jest found multiple elements .. we need to use getAllByRole()

//         //Querying
//         const inputBoxes = screen.getAllByRole("textbox") //this will give me all the input boxes in the inputBoxes

//         //Assertion
//         expect(inputBoxes.length).toBe(2)

//     })
// })