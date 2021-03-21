import React, { useContext, useEffect, useState } from 'react';
import {NavBar, Nav, NavItem} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
// import Data from './data.js';
import styled from 'styled-components';
import './Detail.scss';
import { 재고context } from './App.js';
import { connect } from 'react-redux';

let 박스 = styled.div`
  padding : 20px;
`;  // CSS를 미리 입혀놓은 컴포넌트, '박스'가 컴포넌트다.
let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 };
`;

function Detail(props) { 

  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState('');

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  let 재고 = useContext(재고context);

  useEffect(()=>{
    let 타이머 = setTimeout(() => {
      alert변경(false);
    console.log('안녕');
    return ()=>{ clearTimeout(타이머) };  // return function 어쩌구(){ 실행할 코드~~~~ } Detail 컴포넌트가 사라질 때 실행할 코드.
    }, 2000)
  }, [alert, inputData]); // useEffect훅4 대괄호 안에 실행조건을 넣을 수 있음.
  // 대괄호를 비워두면 업데이트 되지 않음!
  // useEffect는 여기에 여러번 쓸 수 있음(위부터 순서대로 실행)
  // 이 경우 타이머를 제거해줘야함

  let { id } = useParams(); // { id,id2,id3 } 이렇게 입력가능
  let history = useHistory(); //옛날 코드에는 사용하지 않았던 것.
  // Data.id = id;

  let selectedProduct = props.shoes.filter((product)=>{
    return product.id == id;
  });

  let 찾은상품 = props.shoes.find((상품)=> {
    return 상품.id == id;
  })

  console.log(selectedProduct);
  console.log(찾은상품);

  return(
    <div className="container">
      <박스>
        <제목 className="red">상세페이지</제목>
      </박스> {/* padding이 20px인 div */}

      <input onChange={ (e)=>{ inputData변경(e.target.value) } } />

      { 
      alert === true
      ? (<div className="my-alert">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>)
      : null
      }

      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes1.jpg`} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{ 찾은상품.title }</h4>
          <p>{ 찾은상품.content }</p>
          <p>{ 찾은상품.price }원</p>

          <Info 재고={props.재고} />

          {/* <button className="btn btn-danger" onClick={ ()=> { 
            props.재고변경([9,11,12]);
            props.dispatch({ type : '항목추가', payload : {id:2, name:'새로운상품', quan:1} });
            history.push('/cart');
          }}>주문하기</button>  */}

          <button className="btn btn-danger" onClick={ ()=> { 
            props.재고변경([9,11,12]);
            props.dispatch({ type : '항목추가', payload : {id:2, name:'새로운상품', quan:1} });
            history.push('/cart');
          }}>주문하기</button>



          <button className="btn btn-primary" onClick={ ()=> {
            history.goBack();   // 이런건 구글링해서 찾아야 함.
            // history.push('/') '/' 라는 경로로 이동해 주세요 라는 뜻
          }}>Back</button> 
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0) }}>상품설명</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1) }}>배송정보</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <CSSTransition in={스위치} classNames="wow" timeout={500}> 
        {/* in이 true일 때만 에니메이션이 동작 */}
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
      </CSSTransition>
      
      
    </div>
  )
}

function TabContent(props){

  useEffect(()=>{
    props.스위치변경(true); 
  })

  if(props.누른탭 === 0){
    return <div>0번째 내용입니다.</div>
  } else if(props.누른탭 === 1){
    return <div>1번째 내용입니다.</div>
  } else {
    return <div>2번째 내용입니다.</div>
  }
  
  
  

}


function Info(props){
  return(
    <p>재고 : { props.재고[0] }</p>
  )
}

function state를props화(state){ //redux store 데이터 가져와서 props로 변환해주는 함수.
  console.log(state);
  return {
    state : state.reducer,
    alert열렸니 : state.reducer2
  }
}

export default connect(state를props화)(Detail)
