console.log(React);
// const parent = React.createElement("div" , 
// 		{id : "parent"} ,
// 		React.createElement("div" , 
// 			{id : "child"} ,
// 			React.createElement("h1" , {}, "I'm h1 tag")
// 			)
// 		);

//multiple child syntax
const parent = React.createElement("div" , 
		{id : "parent"} ,[
		React.createElement("div" , 
			{id : "child"} ,[
			React.createElement("h1" , {}, "I'm h1 tag above"),
			React.createElement("h2" , {}, "I'm h2 tag above")
		]),
		React.createElement('div', {id: "child2"},[
				React.createElement("h1", {}, "I am h1 tag below"),
				React.createElement("h2" , {}, "I'm h2 tag below")
		])	
		]);

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(root);
console.log(parent); // object not html element 
root.render(parent);
// render() - it is converting our parent object into html Element and putting into div element whose id = "root"

