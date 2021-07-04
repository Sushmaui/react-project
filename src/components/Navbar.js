import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary px-sm-5">
                <Link to='/'>
                    <span className="glyphicon glyphicon-home btn-lg text-info" ></span>
                </Link>
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-12 text-capitalize text-right">
                    <Link to='/cart'>
                        <span className="glyphicon glyphicon-shopping-cart text-info"></span>
                    </Link>
                </div>
            </nav>
        )
    }
}
