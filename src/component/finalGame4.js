import React, { Component } from 'react';
import '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap
import '../css/space.css';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

import { importAll } from '../common/common';
import { convertDateMDY, convertVietnamese } from './process';
import {ShareFB} from '../component/loginFacebook';
import { HOST_IMG, HOST } from './global';


const HOST_IMAGE_GAME4 = HOST_IMG+'worldcup/';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class FinalGame4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            list: ''
        };

    }
    componentWillMount() {
        let data = JSON.parse(localStorage.getItem('dataUser'));
        this.setState({
            user: data,
        });
        this.worldcup();
    }

    worldcup() {
        fetch(HOST+"allworldcup")
            .then(res => res.json())
            .then(data => {
                var randomItem = data[Math.floor(Math.random() * data.length)];
                // console.log(randomItem);
                this.setState({
                    list: randomItem
                })
            })
            .catch(err => console.log(err))
    }
    render() {

        console.log(this.state.list)
        const pic = this.state.user.picture.data.url;
        return (
            <div>
                <Header />

                <div className="frame-body-content" align="center">
                    <div className="frame-content-game">

                        <img className="img-game1-content-final" src={pic} alt="image-game" />

                        <img className="img-game1-transfer-content-final" src={images['transfer.svg']} />

                        <img className="img-game1-content-final" src={HOST_IMAGE_GAME4 + this.state.list.picture} alt="image-game" />

                        <h3 className="name-game-content">
                            Sau World Cup này bạn sẽ  <strong className="strg-6">{this.state.list.content}</strong>
                        </h3>

                    </div>

                    <br />

                   <ShareFB/>


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
