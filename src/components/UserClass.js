import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    //console.log("class props", props);
    this.state = {
      // count: 0,
      // count2: 1,
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    console.log(this.props.time + "child constructor called");
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/akshaymarch27");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
    console.log(this.props.time + "child mount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      //logic1
    }

    if (this.state.count2 !== prevState.count2) {
      //logic1
    }
    console.log("component did update");
  }

  componentWillUnmount() {
    console.log("component will unmount");
  }

  render() {
    //debugger;
    console.log(this.props.time + "child render called");
    const { name, location } = this.props;
    const { count } = this.state;
    return (
      <div>
        {console.log(this.props.time + "child return called")}
        <h2>Name: {name}</h2>
        <h2>Location: {location}</h2>
        <h2>Count: {count}</h2>
        <button
          onClick={() => {
            //NEVER UPDATE THE STATE VARIABLE DIRECTLY LIKE BELOW
            //this.state.count = this.state.count + 1 it will not update the state and create inconsistency in your program
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h2>Count2: {this.state.count2}</h2>
      </div>
    );
  }
}

export default UserClass;
