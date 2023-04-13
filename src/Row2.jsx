import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Row2.css"
import { ArrowBackIos } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

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
  };

function Row2({ title, uid , query_string , Genere , row_category ,loggedin, isGrid }) {
  const [bookdata, setbookdata] = useState([]);
ANCHOR fetching data
  useEffect(() => {
    axios
      .get("http://localhost:3003/get/for_row", {
        params: {
          genere: Genere,
          row_category: row_category,
          query_string: query_string,
        },
      })
      .then((result) => {
        setbookdata(result.data);
      })
      .catch((err) => {
        console.log({ err_in_row: err });
      });
  }, []);
// ANCHOR MODAL
  
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
// ANCHOR order
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
  // ANCHOR card sliders
  let cardContainers = [...document.querySelectorAll(".card-container")];
  let preBtns = [...document.querySelectorAll(".pre-btn")];
  let nxtBtns = [...document.querySelectorAll(".nxt-btn")];

  cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtns[i].addEventListener("click", () => {
      item.scrollLeft += containerWidth - 150;
    });

    preBtns[i].addEventListener("click", () => {
      item.scrollLeft -= containerWidth + 110;
    });
  });
  return (
    <div>
      <h3 class="title">recommended</h3>
      <div class="movies-list">
        <Button variant="outlined" endIcon={<ArrowForwardIosIcon sx={{ color: "white" }}/>} class="nxt-btn" sx={{ backgroundColor : "black" }} ></Button>
        <Button variant="outlined" startIcon={<ArrowBackIosIcon sx={{ color: "white" }}/>} class="pre-btn" sx={{ backgroundColor : "black" , width : "5px" }} ></Button>

        <div class="card-container">
          {/* <div class="card"> */}
            {bookdata.map((item) => {
              let thumbnail = item.imageLink //item.img; //item.volumeInfo.imageLinks.thumbnail;

              return (
                <img
                  key={item.id}
                  onClick={() => {
                    handleOpen();
                    save(item);
                  }}
                  className="card-img"
                  src={thumbnail}
                  alt={thumbnail}
                />
              );
            })}
          {/* </div> */}
        </div>
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

export default Row2;
