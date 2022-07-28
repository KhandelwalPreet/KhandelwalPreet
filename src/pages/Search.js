import React from 'react';
import Nav from '../Nav';
import Row from '../Row';


function Search() {
  const mystyle ={
    backgroundColor : "#0F171E",
    height : "1000px",
    overflowX: "hidden",
  }
  
const book_title = window.sessionStorage.getItem('query');
console.log(book_title);

  return (
    <div style={mystyle}>
     <Nav/>
      <Row isGrid  query_string={book_title}/>
      
      <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
  )
}

export default Search