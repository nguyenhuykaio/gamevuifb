import React, { Component } from 'react';
import  '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap
import '../css/space.css';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

import { importAll } from '../common/common';
import {ShareFB} from '../component/loginFacebook';
import { convertDateMDY } from './process';
import { HOST_IMG, HOST } from './global';


const HOST_IMAGE = HOST_IMG+'game/';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class FinalGame2 extends Component{
    constructor(props){
        super(props);
        let data=JSON.parse(localStorage.getItem('dataUser'));
        this.state={
            user:data,
            firstKR:'',
            midKR:'',
            lastKR:'',
            namFullKR: undefined

        };
        
    }
     componentWillMount(){
        console.log('componentWillMount')
        this.createNameKr();
    }

    okBeo(y,m,d){
         fetch(HOST+"namekr/"+y+"/"+m+"/"+d)
        .then(res =>res.json())
        .then(dts => {
            // console.log("dts "+JSON.stringify(dts.firstName.firstname));
            let firstkr=dts.firstName.firstname;
            let midkr=dts.midName.midname;
            let lastkr=dts.lastName.lastname;
            // console.log(namekr);
            this.setState({
                firstKR:firstkr,
                midKR:midkr,
                lastKR:lastkr,
                namFullKR: {...dts}
            })
        })
    }
    createNameKr(){
        // console.log(this.state.user.birthday);
        let dt=convertDateMDY(this.state.user.birthday);
            console.log(dt.getFullYear().toString().substring(3,4),dt.getMonth()+1,dt.getDate());
            let y=dt.getFullYear().toString().substring(3,4);
            let m=dt.getMonth()+1;
            let d=dt.getDate();
            this.okBeo(y,m,d);
       
    }
    render(){
        console.log('render');
        
        if(this.state.namFullKR != undefined) {
            return(       
                <div>
                    <Header/>
                    
                    <div className="frame-body-content" align="center">
                            <div className="frame-content-game">
    
                                <h3 className="name-game-content">
                                  {this.state.user.name}  tên tiếng <strong>Hàn</strong> theo ngày tháng sinh của bạn là
                                </h3>
                                <span className="name-korea">
                                    {this.state.firstKR} { } 
                                    {this.state.midKR} { }
                                    {this.state.lastKR}
                                    {/* {this.state.namFullKR.firstName.firstname} */}
                                </span>
                                <img className="img-game2-content-final"  src={images['img-korea.png']} alt="image-game" />
    
                                
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
        else {
            return null
        }
    }


}
