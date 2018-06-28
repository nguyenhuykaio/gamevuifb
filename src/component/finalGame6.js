import React, { Component } from 'react';
import  '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap
import '../css/space.css';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

import { importAll } from '../common/common';
import { convertDateMDY } from './process';
import {ShareFB} from '../component/loginFacebook';
import { HOST } from './global';


const HOST_IMAGE = 'http://localhost:2000/laravel/gamefunny-master/img/game/';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class FinalGame6 extends Component{
    constructor(props){
        super(props);
        this.state={
            user:null,
            newdata: new Object,
            dataMonth:'',
            dataGenitive:'',
            dataJob:'',
            dataLove:''

        };
    }
    componentWillMount(){
        let data=JSON.parse(localStorage.getItem('dataUser'));
        this.setState({
            user:data
        })
        this.checkMonthOfBirth();
    }
    checkMonthOfBirth(){
        fetch(HOST+"monthofbirth")
        .then(res=>res.json())
        .then(data =>{
            let dt=convertDateMDY(this.state.user.birthday);
            let checkBD=dt.getMonth()+1;
            let month=null;
            data.forEach(items =>{
                if(items.month==checkBD){
                    month=checkBD;           
                }               
            })
        fetch(HOST+"monthofbirth/"+month)
            .then(res => res.json())
            .then(list =>{
                    console.log("listdata "+JSON.stringify (list) );
                    let datagenitive=list.genitive;
                    let datajob=list.job;
                    let datalove=list.love;
                    this.setState({
                        newdata: list,
                        dataGenitive:datagenitive,
                        dataJob:datajob,
                        dataLove:datalove
                    })
                    // console.log("listdata "+JSON.stringify (listdata) );
            }) 
            this.setState({
                dataMonth:month
            })
            console.log(data);
            
        })
    }

    render(){
        console.log(this.state.user);
        console.log("aaa "+JSON.stringify(this.state.newdata.job));
        
        return(

            <div>
                <Header/>
                
            <div className="frame-body-content" align="center">
                        <div className="frame-content-game">

                            <h3 className="name-game-content">
                                {this.state.user.name} bạn sinh vào tháng {this.state.dataMonth}
                            </h3>
                            
                                <img className="img-game6-data-fb" src={this.state.user.picture.data.url} />
                            
                                <div className="content-birthday">
                                    <p className="text-6">
                                       <strong className="strg-6">Tính cách:</strong> {this.state.dataGenitive}
                                    </p >
                                    <p className="text-6">
                                      <strong className="strg-6">Công việc:</strong>  {this.state.dataJob}
                                    </p>
                                    <p className="text-6">
                                    <strong className="strg-6">Tình yêu:</strong> {this.state.dataLove}
                                    </p>
                                </div>
                            
                            <img className="img-game6-content-final"  src={images['img-birthday.jpg']} alt="image-game" />

                            
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
