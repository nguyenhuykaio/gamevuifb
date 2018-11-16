import React, { Component } from 'react';
import '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap
import '../css/space.css';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

import { importAll } from '../common/common';
import { lowerBound, upperBound, valueMonthDay, myPair, convertDateMDY } from './process';
import { ShareFB } from '../component/loginFacebook';
import { HOST, HOST_IMG } from './global';



const HOST_IMAGE_GAME1 = HOST_IMG + 'artist/';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class FinalGame1 extends Component {
    constructor(props) {
        super(props);
        let data = JSON.parse(localStorage.getItem('dataUser'));
        this.state = {
            user: data,
            listResult: {}
        };
    }
    componentWillMount() {

        // let dt = convertDateMDY(this.state.user.birthday);
        let dt = convertDateMDY("09/09/1996");
        let key = valueMonthDay(dt.getMonth(), dt.getDate());

        this.getArtists(key);

    }

    getArtists(key) {
        fetch(HOST + "artist")
            .then(res => res.json())
            .then(data => {
                let list = [];
                data.forEach(item => {
                    let dt = new Date(item.birthday);

                    let resvalue = valueMonthDay(dt.getMonth(), dt.getDate());
                    let res = new myPair(item.id, resvalue);
                    list.push(res);

                });

                list.sort(function (a, b) {
                    return a.value - b.value;
                });

                let temp1 = lowerBound(list, key);

                let temp2 = upperBound(list, key);
                let result;
                if (list[temp1].value - key < list[temp2].value) {
                    result = data[list[temp1].key];
                }
                else {
                    result = data[list[temp2].key];
                }

                this.setState({
                    listResult: result
                });

            })
            .catch(err => console.log(err))
    }

    render() {
        const pic = this.state.user.picture.data.url;
        return (
            <div>
                <Header />

                <div className="frame-body-content" align="center">

                    <div className="frame-content-game">

                        <img className="img-game1-content-final" src={pic} alt="image-game" />

                        <img className="img-game1-transfer-content-final" src={images['transfer.svg']} />

                        <img className="img-game1-content-final" src={HOST_IMAGE_GAME1 + this.state.listResult.picture} alt="image-game" />

                        <h3 className="name-game-content">
                            {this.state.user.name} {} sinh vào ngày gần giống {this.state.listResult.job}
                            <strong className="name-final-game1"> {this.state.listResult.stage_name}</strong>{" - "}
                            {this.state.listResult.name}
                        </h3>

                    </div>

                    <br />

                    <ShareFB />

                </div>
                <br />
                <div className="frame-back">
                    <a href="/" className="btn btn-primary "><strong className="redirect-home">trang chủ</strong></a>
                </div>
                <br />


                <Footer />
            </div>
        );
    }


}

