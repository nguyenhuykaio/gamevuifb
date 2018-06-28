import React, { Component } from 'react';
import  '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap
import '../css/space.css';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

import { importAll } from '../common/common';
import { convertDateMDY, valueMonthDay } from './process';
import {ShareFB} from '../component/loginFacebook';
import { HOST } from './global';


const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class FinalGame3 extends Component{
    constructor(props){
        super(props);
        let data = JSON.parse(localStorage.getItem('dataUser'));
        this.state={
            result: {},
            user: data
        };
    }
    componentWillMount(){
        let dt=convertDateMDY(this.state.user.birthday);
        let key=valueMonthDay(dt.getMonth(),dt.getDate());
        console.log(key)
        this.loadIDApi(key);
    }
    loadIDApi(key){
        fetch(HOST+"allZodiac")
        .then(res => {
            return res.json();
        }).then(data => {
            let arr = data.map(item => {
                console.log(item);
                let dtStartDate = item.startDate.split("/");
                let startDate=valueMonthDay(Number(dtStartDate[1])-1,Number(dtStartDate[0]));

                let dtEndDate=item.endDate.split("/");
                let endDate=valueMonthDay(Number(dtEndDate[1])-1,Number(dtEndDate[0]));

                item.startDate = startDate;
                item.endDate = endDate;
                return item
            })
            let res = arr.find(x => (x.startDate <= key) && (x.endDate >= key))
            this.setState({
                result: res
            })
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <Header/>
                
            <div className="frame-body-content" align="center">
                        <div className="frame-content-game">

                            <h3 className="name-game-content">
                                {this.state.user.name} cung hoàng của bạn là:
                            </h3>
                            <div className="frame-zodiac">
                            <div className="content-zodiac">     
                                <p className="name-text-zodiac">
                                    {this.state.result.name}
                                </p>
                                <p className="text-3">
                                <strong className="text-advice-3">{this.state.result.name}</strong> : {this.state.result.content}
                                </p>
                                <p className="text-3">
                                   <strong className="text-advice-3">Lời Khuyên</strong> {this.state.result.advice}
                                </p>
                            </div>
                            
                            <img className="img-game3-content-final"  src={images['img-zodiac.png']} alt="image-game" />
                            </div>
                            

                            
                        </div>

                <br/>

                <ShareFB/>

                
            </div>
            <br/>
                <div className="frame-back">
                    <a href="/" className="btn btn-primary "><strong className="redirect-home">trang chủ</strong></a>
                </div>
            <br/>
                <Footer/>
            </div>    
        );
    }


}
