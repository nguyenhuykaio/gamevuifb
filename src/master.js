import React, { Component } from 'react';

import { Header } from './layouts/Header';
import { Body } from './layouts/Body';
import { Footer } from './layouts/Footer';


export class Master extends Component {
    render() {
        return (
            <div className="frame-content">
                <Header/>
                <Body />
               <Footer/>
            </div>
        )
    }
}