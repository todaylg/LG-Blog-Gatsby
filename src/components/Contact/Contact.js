/* eslint no-unused-vars: 0 */

import React from "react";
import bz_yz_1 from "../../images/about/about_yz.png";
import bz_yz_2 from "../../images/about/about_yz_q1.png";
import bz_yz_3 from "../../images/about/about_bz_s.png";
import bz_yz_4 from "../../images/about/about_yz_q2.png";
import bz_yz_5 from "../../images/about/about_bz.png";
import bz_yz_6 from "../../images/about/about_bz_lh.png";
import bz_yz_7 from "../../images/about/about_bz_q.png";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="about">
          <div className="bz_yz">
            <div className="bz_yz_Box">
              <img className='bz_yz_Img' id="bz_yz_1" src={bz_yz_1} />
              <img className='bz_yz_Img' id="bz_yz_2" src={bz_yz_2} />
              <img className='bz_yz_Img' id="bz_yz_3" src={bz_yz_3} />
              <img className='bz_yz_Img' id="bz_yz_4" src={bz_yz_4} />
              <img className='bz_yz_Img' id="bz_yz_5" src={bz_yz_5}/>
              <img className='bz_yz_Img' id="bz_yz_6" src={bz_yz_6} />
              <img className='bz_yz_Img' id="bz_yz_7" src={bz_yz_7}/>
            </div>
            <h1 className="toMyself">『勿忘初心』</h1>
            <div className="intro">
              <h2>关于LG：</h2>
              <p>Web3D学习中</p>
              <p>啊!大脑在颤抖!</p>
              <p>阿宅</p>
              <p>Umika</p>
              <p> <a title="Find Me" target="_blank" href="https://github.com/todaylg">Github</a>/<a title="Find Me" target="_blank" href="https://twitter.com/WebAMV">Twitter</a></p>
            </div>
          </div>
        </div>
        {/* --- STYLES --- */}
        <style jsx>{`
        .about{
          width: 100%;
          background-color: #fff;
          .bz_yz{
            position: relative;
            width: 1000px;
            height: 600px;
            margin: 0 auto;
            margin-top:80px;
            .bz_yz_Box{
              position:absolute;
              left:200px;
              top:0px;
              width:600px;
              height:546px;
            .bz_yz_Img{
              position:absolute;
              top:0;
              left:0;
              width:100%;
              opacity:0;
            }
            }
          }
        }
        .toMyself{
          opacity:0;
          position: absolute;
          top: 200px;
          right: 50px;
          font-weight: normal;
          font-size: 24px;
          color: #666;
        }
        .intro{
          opacity:0;
          position: absolute;
          top: 0px;
          left: 0px;
          width: 180px;
          padding: 10px;
          font-size: 14px;
          color: #666;
          h2,p{
            font-size: 16px;
            color: #666;
            font-weight: normal;
            border-bottom: solid 1px #e0e0e0;
          }
          p{
            text-align:center;
            a{
              &:hover{
                color:#e0e0e0;
                cursor: pointer;
              }
            }
          }
        }
        @keyframes opacityChange{
          from {
            opacity:0;
          }
          to {
            opacity:1;
          }
        }
        #bz_yz_1{
          animation:opacityChange 2s ease-in normal 1 forwards;
        }
        #bz_yz_2{
          animation:opacityChange 0.6s ease-in 1s normal 1 forwards;
        }
        #bz_yz_3{
          animation:opacityChange 0.6s ease-in 2.2s normal 1 forwards;
        }
        #bz_yz_4{
          animation:opacityChange 0.6s ease-in 2.5s normal 1 forwards;
        }
        #bz_yz_5{
          animation:opacityChange 0.6s ease-in 3.5s normal 1 forwards;
        }
        #bz_yz_6{
          animation:opacityChange 0.6s ease-in 3.5s normal 1 forwards;
        }
        #bz_yz_7{
          animation:opacityChange 0.6s ease-in 3.5s normal 1 forwards;
        }

        @keyframes introAnime{
          from {
            opacity:0;
            transform:translateX(-100px);
          }
          to {
            opacity:1;
            transform:translateX(0px);
          }
        }
        .intro{
          animation:introAnime 1s ease-out 4.2s normal 1 forwards;
        }

        @keyframes wordsAnime{
          from {
            opacity:0;
            transform:translateX(100px);
          }
          to {
            opacity:1;
            transform:translateX(0px);
          }
        }
        .toMyself{
          animation:wordsAnime 1s ease-out 5.5s normal 1 forwards;
        }
        
        `}</style>
      </React.Fragment>
    );
  }
}
export default About;
