import React, { Component } from 'react';
import  '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap

import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { importAll } from '../common/common';
import {Facebook} from '../component/loginFacebook'
import { HOST_IMG,HOST_WEB } from './global';

const HOST_IMAGE = HOST_IMG+'game/';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class Game4 extends Component{
    constructor(props){
        super(props);
        this.state={
            listData:[]
        };
    }
    componentDidMount(){
        this.loadIDApi();
    }
    loadIDApi(){
        fetch(HOST_WEB+"allgame/4")
        .then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            this.setState({
                listData:data
            });
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
            <Header/>
            
            <div className="frame-body-content" align="center">
            {
                this.state.listData.map( items => (
                    <div key={items.id} className="frame-content-game">
                        <img className="img-game-content"  src={HOST_IMAGE+items.picture} alt="image-game" />
                        <h3 className="name-game-content">{items.name}</h3>
                    </div>
                ))
            }
            <br/>
            <Facebook {...this.props}/> 


        </div>

            <Footer/>
        </div>    
        );
    }
}