Design
//components

- Header
  - Logo
    -Nav Items
- Body
  - search
  - Restaurant container
    - RestaurantCard
- Footer
  - Copyright
  - links
  - address
  - contact

#Parcel
-Dev Build
-Local Server
-HMR - Hot Module Replacement
-File Watching Algorithm - written in c++
-Caching - Faster Builds
-Image Optimization
-Minification
-Bundling
-Compress
-Consistent Hashing
-Code Splitting
-differential Bundling - support older browser
-Diagnostic
-Error Handling
-HTTPS
-Tree Shaking - remove unused code
-Different dev and prod bundles


#Redux toolkit
- install @reduxjs/toolkit react-redux
- Build our store
- connect our store to our app
- create Slice(cartSlice)
- dispatch(action)
- Selector

# Types of testing a developer can do :
  - Unit Testing
  - Integration Testing
  - End to End Testing - e2e testing

 # Setting up testing in our app
  - Install React Testing Library
  - Installed jest
  - Install Babel dependecies
  - Configure Babel
  - Configure parcel config file to disable default babel transpilation in parcel
  - jest configuration (npx jest --init)
  - install jsdom library
  - install @babel/preset-react - to make JSX work in test cases
  - Include @babel/preset-react inside my babel config
  - Install @testing-library/jest-dom to make my toBeInTheDocument() to work as this package provides this method