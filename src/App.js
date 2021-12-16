import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';


function App() {
const [itemName, setItemName] = useState("");
const [amount, setAmount] = useState(0);
const [newItem, setItem] = useState("");
const [itemList, setItemList] = useState([]);

useEffect(()=>{
 
  Axios.get("http://localhost:3001/read").then((response)=>{
   
   setItemList(response.data);

  })

}, []);

const addToShop= () =>{

  Axios.post("http://localhost:3001/insert",{
   
   itemName: itemName,
   amount: amount,
  
 });

};

const updateItem = (id)=>{
  Axios.put("http://localhost:3001/update",{

    id:id,
    newItem: newItem,

  });
};

const deleteItem = (id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`);

};



  return (
    <div className="App">
      <h1>Shopping List App</h1>
     
      <label>Item Name:</label>
      <input 
      type="text"
      onChange={(event)=>{
        setItemName(event.target.value);
      }}
      />
      <label>Amount:</label>
      <input type="number"
      onChange={(event)=>{
        setAmount(event.target.value);
      }}/>
      
      <button onClick={addToShop}>Add To List</button>

      <h1> Shopping List </h1>

      {itemList.map((val, key)=>{
      
      return ( <div><h1>{val.foodName}</h1><h1>{val.amount}</h1>
      
      <input type="text" placeholder="New Item Name.."
      onChange={(event)=>{
        setItem(event.target.value);
      }}/>
      <button onClick={()=> updateItem(val._id)}>Update</button>
      <br></br>
      <button onClick={()=> deleteItem(val._id)}>Delete</button>
      </div>

      );
      
      })}

     
    </div>
  );
}

export default App;
