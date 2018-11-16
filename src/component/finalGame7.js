import React, { Component } from 'react';
import '../css/reponsive.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// cai dat Bootstrap
import '../css/space.css';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

import { importAll } from '../common/common';
import {  convertVietnamese } from './process';
import {ShareFB} from '../component/loginFacebook';
import {  HOST } from './global';



const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class FinalGame7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            dataName: ''
        };

    }
    componentWillMount() {
        let data = JSON.parse(localStorage.getItem('dataUser'));
        this.setState({
            user: data,
        });
        this.changeNameJp();
    }

    changeNameJp() {
        fetch(HOST+"namejp")
            .then(res => res.json())
            .then(data => {
                let name = convertVietnamese(this.state.user.name);
                let names = name.toUpperCase();
                let nameJp = "";
                for (let i = 0; i < names.length; i++) {
                    if (name[i] === '-') {

                        nameJp += ' ';
                        continue;
                    }
                    let index = data.findIndex(x => x.vi.trim() === names[i].trim());

                    nameJp += data[index].jp.trim();
                }

                this.setState({
                    dataName: nameJp
                });

            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <Header />

                <div className="frame-body-content" align="center">
                    <div className="frame-content-game">

                        <h3 className="name-game-content">
                            {this.state.user.name}  tên bạn theo tiếng <strong>Nhật</strong> là
                            </h3>
                        <span className="name-japan">{this.state.dataName.toUpperCase()}</span>
                        <img className="img-game7-content-final" src={images['img-japan.jpg']} alt="image-game" />


                    </div>

                    <br />

                    <ShareFB/>


                </div>
                <br/>

                <div className="frame-back">
                    <a href="/" className="btn btn-primary "><strong className="redirect-home">trang chủ</strong></a>
                </div>
                
                <br/>
                <Footer />
            </div>
        );
    }


}
