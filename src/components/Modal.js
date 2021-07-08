import React, { Component } from 'react';
import styled from 'styled-components';
import { DeviceConsumer } from '../Context';
import { Link } from 'react-router-dom';

export default class Modals extends Component {
  render() {
    return (
      <DeviceConsumer>
        {(value) => {
          const { id, title, price, defaultPrice, color, capacity, info, inCart, colorName, totalAmount } = value.modalDevice;;
          const { selectedColor, selectedCapacity, handleChange, modalOpen, closeModal, } = value

          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container ">
                  <div className="row">
                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize">
                      <div class="modal-header">
                        <h5>Details About Device</h5>
                      </div>
                      <div class="modal-body">
                        <div>
                          <h1 className="text-center text-uppercase pb-10">{title}</h1>
                          <div className="row mt-5 pt-5">
                            <div className="col-10  col-md-6  ">
                              <img src={`devices/${id}.jpg`} className="img-fluid" height="200px" ></img>
                            </div>
                            <div className="col-10 col-md-6 mt-3 pt-3 text-capaitalize">
                              <h4>Model : {title}</h4>
                              {/* <h4 className="d-none d-xl-block">About Device<p>{info}</p></h4> */}
                              <h4>{color.map(result => (
                                <p >
                                  <input type="radio" value={result} name="colorValue" onChange={(e) => selectedColor(e)} />
                                  <b>{result}</b>
                                </p>

                              ))}
                              </h4>
                              <h4>Capacity:</h4>
                              <h4>{capacity.map(result => (
                                <p >
                                  <input type="radio" value={result} name="capacityValue" onChange={(e, id) => selectedCapacity(e, id)} />
                                  <b>{result}</b>
                                </p>

                              ))}
                              </h4>

                              <h4><strong>Price:<span>$</span>{defaultPrice}</strong></h4>
                              <a href="#" title="info" onClick={() => { value.openModal(id) }}>More Details</a>

                              <h4>{totalAmount.map(result => (
                                <p >
                                  <input type="radio" value={result} name="amountValue" onChange={(e, id) => handleChange(e, id)} />
                                  <b>{result}</b>
                                </p>

                              ))}
                              </h4>

                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="modal-footer">
                        <Link to='/'>
                          <button className="btn btn-primary" onClick={() => closeModal()} >Back to Devices</button>
                        </Link>
                        <button className="btn btn-success" hidden={inCart ? true : false} onClick={() => { value.addToCart(id) }
                        }>
                          {inCart ? "inCart" : "add to cart"}
                        </button>
                        <Link to='/cart'>
                          <button className="btn btn-info" onClick={() => closeModal()}>Checkout</button>
                        </Link>
                        <button className="btn btn-danger btn-md" onClick={() => closeModal()}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalContainer>

            )
          }
        }}
      </DeviceConsumer>
    )
  }
}


const ModalContainer = styled.div`
 position:fixed;
 top:0;
 left:0;
 right:0;
 bottom:0;
 background:rgba(0,0,0,0.3);
 background-color:##6c757d;
 display: flex;
 align-items: center;
 justify-content: center;
 #modal{
     backgraound:var(--mainWhite);
     background-color: #041e25;
 }
`