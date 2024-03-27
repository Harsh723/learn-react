import UserContext from "../utils/UserContext";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor() {
    super();
    console.log("parent constructor called");
  }

  render() {
    console.log("parent render called");
    return (
      <div className="userClass">
        <h1>About</h1>
        <div>
            Logged in user
            {/* this is a consumer component to retrieve the data from context in CC */}
            <UserContext.Consumer> 
              {({LoggedInUser}) => <h1>{LoggedInUser}</h1>}
            </UserContext.Consumer>
        </div>
        <UserClass
          name={"xyz(class)"}
          location={"Bangalore(class)"}
          time={"first"}
        />
        {/* <UserClass
          name={"xyz(class)"}
          location={"Bangalore(class)"}
          time={"second"}
        /> */}
      </div>
    );
  }
}

export default About;
