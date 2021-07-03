import React, { Component } from "react";
import {  Link } from 'react-router-dom';
// import styled from "styled-components";
import { DeviceConsumer} from "../Context";
import PropTypes from 'prop-types'

export default class Devices extends Component {

  
  render() {
    // const devicesItems = this.props.devices.map(device =>(
    //   <div className="col-md-6"  >
    //     <div className="thumbnail text-center">
    //       <a href={`#${device.id}`} onClick={this.props.handleAddCart}>
    //         <img src={`devices/${device.id}.jpg`} alt={device.title} />
    //         <p>
    //           {device.title}
    //         </p>
    //       </a>
    //       <div>
    //         <b>{device.price}</b>
    //         <button className="btn btn-primary" onClick={(e)=>this.props.handleAddCart(e,device)}>Add to Cart</button>
    //       </div>
    //     </div>
    //   </div>
    // ))
    const{id,title,price,inCart} = this.props.devices;
  

    return (
      
        // <div>
        //     {devicesItems}
        // </div>
      <div className="col-md-4">
        <div className="thumbnail text-center"  >
          <div className=" card ">
            <DeviceConsumer>
              {(value) => {
             return(
               <div>
                 <div className="img-container" onClick={() => value.handleDetail(id)}>
                   <Link to="/details">
                     <img src={`devices/${this.props.devices.id}.jpg`} />
                     <button className="details-btn btn-primary" hidden>Details</button>
                   </Link>
                 </div>
                 <h4>
                   {this.props.devices.title}
                 </h4>
                 <button className="btn btn-primary btn-lg " disabled={this.props.devices.inCart ? true : false} onClick={() => { value.addToCart(id)}} />
               </div>
             )
                
              }}
              {/* <div className="img-container" onClick={() => console.log('you clicked me on the image container')}>
                <Link to="/details">
                  <img src={`devices/${this.props.devices.id}.jpg`} />
                  <button className="details-btn btn-primary" hidden>Details</button>
                </Link>
              </div>
              <h4>
                {this.props.devices.title}
              </h4>
            <button className="cart-btn btn-primary " disabled={this.props.devices.inCart ? true : false} onClick={() => { console.log('addToCard') }} /> */}
            {/* {this.props.devices.inCart ? (<p className="text-capitalize mb-0" disabled> in inCart</p>) : (<i className="fas fa-cart-plus"/>)} */}
            
            </DeviceConsumer>
          </div>
        </div>
      </div>
    )
  }
}

Devices.propTypes={
  devices: PropTypes.shape({
    id:PropTypes.number,
    img:PropTypes.string,
    title:PropTypes.string,
    price:PropTypes.number,
    inCart:PropTypes.bool
  }).isRequired
}

// const DeviceWrapper = styled.div`
// .img-container{
//   position: relative;
//   overflow:hidden
// }
// .img-container:hover{
//   transform: scale(1.2)
// }
// `