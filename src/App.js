/* eslint-disable */

import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import './App.css';
import React, { useState, useContext } from "react";
import Data from './data.js';
import Detail from './Detail.js'
import axios from 'axios';
import Loading from './Loading.js'
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Cart from "./Cart.js";
// import { name, name2 } from './data.js';

export let 재고context = React.createContext();  // 같은 변수값을 공유할 범위 생성.

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [loading, loading변경] = useState(true);
  let [재고, 재고변경] = useState([10,11,12]);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {/* <Nav.Link> <Link to="/">Home</Link> </Nav.Link> */}
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Switch>
      

      <Route exact path="/">
        <Jumbotron className="background">
          <h1>Yes! Yes!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <div className="container">
          <재고context.Provider value={재고}>   {/* value={공유하고 싶은 데이터} */}
          <div className="row">
            {
              shoes.map( (product, i)=>{ 
                return (
                  <Card shoes={shoes[i]} i={i+1} key={i}  />
                  // <Card shoes={ a } i={i+1} key={i}  />
                )
              })
            }
          </div>
          </재고context.Provider>
          <button className="btn btn-primary" onClick={ ()=>{

            // axios.post('서버URL', { id : 'codingapple', pw : '1234' }).then(); + 요청시의 header 설정도 가능
            
            // 로딩중 UI 띄움
            <Loading />

            axios.get('https://codingapple1.github.io/shop/data2.json')  // 어디다 요청할지 내가 어케앎? -서버쟁이에게 물어보십쇼
            .then((result)=>{
              loading변경( false );
              console.log(result.data);
              shoes변경( [...shoes, ...result.data] ) // shoes의 카피본 만들기
              // shoes변경( [ {},{},{},  {},{},{} ] ) 이런 뜻
            })
            .catch(()=>{
              loading변경( false );
              console.log('실패했어요');
            });
            
          }}>더보기</button>
        </div>
      </Route>

      <Route path="/detail/:id">
        <재고context.Provider value={재고}>
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </재고context.Provider>
      </Route>
      {/* <Route path="/어쩌구" component={Modal}></Route> 이렇게도 가능 */}

      <Route path="/cart">
        <Cart />
      </Route>

      <Route path="/:id">
        <div>아무거나 적었을 때 이거 보여주셈</div>
      </Route>
  
    </Switch>
      

    </div>
  );
} 



function Card(props) {

  let 재고 = useContext(재고context);
  let history = useHistory();

  return(
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id) }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
      <Test />
    </div>
  )
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고[0]}</p>
}

export default App;
