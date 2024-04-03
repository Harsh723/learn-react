import { sum } from "../sum";


//1st argument --> tells the description of the test, what this test will do / what are we testing
//2nd argument --> write the implementation of test case
test("Sum function should calculate the sum of two numbers", () => { // test fn takes 2 arguments , 1st String & 2nd callback fn
    //here we are testing the sum function
    const result = sum(3,4)

    //below line is known as Assertion
    expect(result).toBe(7)
    //It is not mandatory to write assertion everytime , if we comment the above line then our test case will always pass because we are not expecting anything
    //Even if we dont write expect() and comment the sum() line then also it will pass because there is nothing to test
    //But it is a good practice to have expect statement , this assertion is important because without assertion there is no test
})