import React from "react";
import errorImg from "../images/png/404.png";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div className="NotFound">
      </div>
       {/* --- STYLES --- */}
       <style jsx>{`
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:url(${errorImg}) top center no-repeat;
        background-size:cover;
      `}</style>
    </React.Fragment>
    
  );
}

export default NotFoundPage;
