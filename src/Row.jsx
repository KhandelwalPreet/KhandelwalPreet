import React from "react";
import "./Row.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const style = {
  position: "absolute",
  top: "85%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "grid",
  backgroundColor : "#0F171E",
  // background : "linear-gradient(180deg, #0F171E 59.29%, #495057 100%)",
};

function Row({ title, uid , query_string , Genere , row_category ,loggedin, isGrid }) {
  // *** book data ***
  const [bookdata, setbookdata] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/books/v1/users/117093074988142843015/bookshelves/1001/volumes?key=AIzaSyBaXf6bQbSAnat2QIcMWgRDSziJ4l3oAyI"
    )
      .then((res) => res.json())
      .then((data) => setbookdata(data.items))
      .then(() => {
        console.log(bookdata);
      });

  }, []);

  useEffect(() => {
    axios.get("http://localhost:3003/get/for_row", {
      params: {
        genere: Genere,
        row_category : row_category,
        query_string : query_string 
      },
    })
    .then((result)=>{
       setbookdata(result.data);
    })
    .catch((err)=>{
      console.log({'err_in_row' : err});
    })
  
  },[] );
  
  // *** Modal open close **
  const [modal_data, setModal_data] = useState([]); // modal data
  //  setting modal data
  const save = (info) => {
    setModal_data(info);
    console.log(modal_data);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();

  const order = () => {
    const current_stock =  modal_data.stock;
    let  set_stock = current_stock -  1 ;
    console.log(set_stock);
    // todo if(loggedin && user.paid && user.reading == false || user.clicked_on_return == true )
    if (loggedin ) { // and primiunm or trial
      // navigate("/pay");
      axios.post("http://localhost:3003/order" , {
       
              user_id : uid,
              item_id : modal_data.id,
              stock : set_stock ,
        
      })
      .then((result)=>{
        // sucessfull
        console.log({"sucess" : result});
      })
      .catch((err)=>{
        // unsucessful
        console.log({"unsucessful" : err});
      })
    } else {
      navigate("/signup");
    }
  };
 
  return (
    <div className="row">
      <h3 className="title">{title}</h3>

      <div className={`row_posters ${isGrid && "gridRow"}`}>
        
        {bookdata.map((item) => {
          let thumbnail = item.img;//item.volumeInfo.imageLinks.thumbnail;

          return (
            <img
               key = {item.id}
              onClick={() => {
                handleOpen();
                save(item);

              }}
              className="row_poster"
              src={thumbnail}
              alt={thumbnail}
            />
          );
          
        })}
        
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
             className="row_poster"
            src={modal_data.img}
            alt = {modal_data.title}
          ></img>
          <Button variant="contained" onClick={order}>
            order
          </Button>

          <Typography id="description" sx={{ mt: 2 }} color={"white"}>
            {modal_data.title}
          </Typography>

          <Typography id="description" sx={{ mt: 2 }}>
            {modal_data.pageCount}
          </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}

export default Row;
