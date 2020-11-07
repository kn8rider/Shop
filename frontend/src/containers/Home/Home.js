import React, { Component } from "react";
import Header from "../../components/Icons/headers";
import { MDBRow, MDBContainer, MDBCol } from "mdbreact";
// import classes from "./Home.module.css";
import {connect} from 'react-redux';
import * as actions from '../../Store/Action/index';
import Clothes from "../../Cards/Clothes/Clothes";
import BabyProducts from "../../Cards/BabyProducts/BabyProducts";
import StaticCards from "../../Cards/StaticCards/StaticCards";
import Carousel from "../../components/carousel/carousel";
class Home extends Component {
  componentDidMount() {
    this.props.onFetchData();
  }

  changeUrl = (id) =>{
    this.props.history.push({
      pathname: '/details',
      hash: '#item',
      search: '?'+id
    })
  }
  render() {

    console.log(this.props.Data)
    return (
      <div>
        <Header />
        {/* <MDBView src={FrontImage} >
            <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
            </MDBMask>
          </MDBView> */}
        <MDBContainer className="mt-5">
          <MDBRow>
            <MDBCol lg="19" md="14" className="mb-4">
              <Carousel />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Clothes data={this.props.Data} change={this.changeUrl}/>
        <BabyProducts data={this.props.Data}/>
         <StaticCards data={this.props.Data}/>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return{
    signedUp: state.Login.signuped,
    Data: state.Login.Data,
    success: state.Login.FetchSuccess
  }
}
const mapDispatchToProps = (dispatch) =>{
 return{
    onFetchData: ()  => dispatch(actions.getData())
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
