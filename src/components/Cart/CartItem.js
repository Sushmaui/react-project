import React from 'react'
import { Link } from 'react-router-dom';

export default function CartItem({item,value}) {
    const{id,title,img,price,color,total,count,capacity} = item;
    const{increment,decrement,removeItem,editDetails,colorName} = value
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-1">
                <img src={`devices/${id}.jpg`} style={{width:"5rem", height:"5rem"}} className="img-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <span className="d-lg-none">Device:</span>
                {title}
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <span className="d-lg-none">Color:</span>
                {colorName ? colorName : "Blue"}
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <span className="d-lg-none">Capacity:</span>
                {capacity ? capacity : "64GB"}
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <span className="d-lg-none">Price:</span>
                {price}
            </div>        
            <div className="col-10 mx-auto col-lg-1 my-2 my-lg-0">
                <div className="d-flex jusify-contet-center">
                    <div>
                        <span className="btn btn-secondary mx-1" onClick={()=>decrement(id)}>-</span>
                        <span className="btn btn-secondary mx-1">{count}</span>
                        <span className="btn btn-secondary mx-1" onClick={()=>increment(id)}>+</span>
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <div onClick={() => removeItem(id)}>
                <span className="glyphicon glyphicon-trash"></span>
                </div>
                
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <strong> total: ${total}</strong>
            </div>
            <div className="col-10 mx-auto col-lg-1">
                <Link to="/details">
                  <span className="glyphicon glyphicon-pencil text-info" type="button" onClick={()=>editDetails(id)}></span>
                </Link>
            </div>
        </div>
    )
}
