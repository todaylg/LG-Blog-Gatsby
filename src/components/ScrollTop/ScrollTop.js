import React from "react";
import PropTypes from "prop-types";
import reciveImg from '../../images/png/recive.png';
import lineImg from '../../images/png/line.png';

class ScrollTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTop: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }
    handleScroll() {
        if (window.scrollY > 200) {
            this.setState({
                isShowTop:true
            });
            let windowHeight = window.innerHeight;
            //calc不能同时满足浏览器窗口过大和过小两种情况，所以先用js TODO Rewrite
            if (windowHeight < 1050) {//图片太长时
                document.querySelector('#backToTop').style.top = -(900 - (windowHeight - 150)) + 'px';
            } else {//图片不够长啦
                document.querySelector('#backToTop').style.top = 0;
            }
        } else {
            this.setState({
                isShowTop:false
            });
            document.querySelector('#backToTop').style.top = -900 + 'px';
        }
    }
    gotop() {
        let start = 0, from = window.scrollY, to = 0, duration = 500 / 17, value;
        function step() {
            value = start / duration * (to - from) + from;
            start++;
            if (start <= duration) {
                window.scrollTo(0, value);
                window.requestAnimationFrame(step);//递归
            } else {
                window.scrollTo(0, 0);
            }
        }
        step();
    }
    render() {
        const { isShowTop } = this.state;
        return (
            <React.Fragment>
                <div>
                    <div id="backToTop"></div>
                    <div onClick={this.gotop} className={`gotop ${isShowTop ? 'isShowTop' : ''}`}>
                        <img src={reciveImg} width="100px" />
                    </div>
                </div>
                {/* --- STYLES --- */}
                <style jsx>{`
                    .gotop {
                        position: fixed;
                        right: 20px;
                        bottom: -10px;
                        transition: all 1s;
                        cursor: pointer;
                    }
                    
                    .gotop.isShowTop{
                        opacity:1;
                        transform:translateY(0);
                    }
                    
                    .gotop{
                        opacity:0;
                        transform:translateY(100%);
                    }
                    
                    .gotop:hover {
                        transform:rotate(1deg);
                    }
                    
                    #backToTop {
                        position: fixed;
                        right: 0px;
                        top: -900px;
                        width: 70px;
                        height: 900px;
                        background: url(${lineImg});
                        transition: all .5s ease-in-out;
                    }
                `}</style>
            </React.Fragment>
        )
    }
}
export default ScrollTop;