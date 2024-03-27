import { createContext } from "react";

const UserContext = createContext({ // this how we create a context using createContext hook
    LoggedInUser: "Default value"
})

export default UserContext;