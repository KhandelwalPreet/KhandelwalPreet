import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Button } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyBY_gnlBU1zh5rya-tC7e03Gv8937DVRRc",
  authDomain: "paper-reed.firebaseapp.com",
  projectId: "paper-reed",
  storageBucket: "paper-reed.appspot.com",
  messagingSenderId: "984882080850",
  appId: "1:984882080850:web:c4063f4ed8c78eef86c38b",
  measurementId: "G-4BXHKKGTF6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function AccountsPage() {
  const [loggedin, setLoggedin] = useState(false);
  const [userID, setuserID] = useState([]);
  const [my_orders_dataset, setmy_orders_dataset] = useState([]);

  // ANCHOR getting the user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setLoggedin(true);
      setuserID(uid);
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("logout");
    }
  });

  // ANCHOR GET MY ORDER
  useEffect(() => {
    axios
      .get("http://localhost:3003/get/myOrders", {
        params: {
          user_id: userID,
        },
      })
      .then((result) => {
        setmy_orders_dataset(result.data[0]);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID]);

  function cancel_or_return(action) {
    // action == return or cancel
    let return_date = new Date().toISOString().slice(0, 10);
    axios.put("http://localhost:3003/cancel/return/order", {
      status: action,
      oder_id: my_orders_dataset.id,
      return_clicked_on: return_date,
    });
  }

  return (
    <div style={{display : "flex"  , justifyContent  : "center" , justifyItems : "center" }}>
    <div class="card mb-3" style = {{maxWidth : "540px" , maxHeight : "200px" , justifyContent  : "center" , backgroundColor: "black" }}>
      
      
      <div class="row g-0">
        <div class="col-md-4">
          <img
            key={my_orders_dataset.id}
            src={"http://books.google.com/books/content?id=G0kPNQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"}
            class="img-fluid rounded-start"
            alt="..."
          ></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title" style = {{ color: "white" }}>{my_orders_dataset.odered_on}</h5>
            <p class="card-text" style = {{ color: "white" }} >
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <Button onClick={cancel_or_return((my_orders_dataset.status == "odered" | "dispatched")
          ? "cancel"
          : "Return")}>
        {(my_orders_dataset.status == "odered" | "dispatched")
          ? "cancel"
          : "Return"}
      </Button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AccountsPage;
