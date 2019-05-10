import React from "react";
import PropTypes from "prop-types";

import yzImg from "../../images/png/yz.png";
import bzImg from "../../images/png/bz.png";

const Hero = props => {
  const { backgrounds, theme } = props;

  return (
    <React.Fragment>
      <section className="hero">
        <img id="yz" src={yzImg} />
        <img id='bz' src={bzImg} />
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        @keyframes yzImgMove{
          from {
            filter:blur(4px);
            transform:translateX(10px);
          }
          to {
            filter:blur(0);
            transform:translateX(-10px);
          }
        }
        @keyframes bzImgMove{
          from {
            filter:blur(4px);
            transform:translateX(-10px);
          }
          to {
            filter:blur(0);
            transform:translateX(10px);
          }
        }
        
        .hero {
          align-items: center;
          background: ${theme.hero.background} no-repeat;
          background-image: url(${backgrounds.mobile});
          background-size: cover;
          color: ${theme.text.color.primary.inverse};
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 100vh;
          height: 100px;
          padding: ${theme.space.inset.l};
          padding-top: ${theme.header.height.homepage};
        }
        
        #yz{
          width: 35%;
          position: absolute;
          bottom: 0;
          left: 10%;
          filter:blur(4px);
          transform:translateX(-10px);
          animation:yzImgMove 2.5s ease-in normal 1 forwards;
        }
        
        
        
        #bz{
          width: 42%;
          position: absolute;
          bottom: 0;
          right: 10%;
          filter:blur(4px);
          transform:translateX(-10px);
          animation:bzImgMove 2.5s ease-in normal 1 forwards;
        }
        

        h1 {
          text-align: center;
          font-size: ${theme.hero.h1.size};
          margin: ${theme.space.stack.l};
          color: ${theme.hero.h1.color};
          line-height: ${theme.hero.h1.lineHeight};
          text-remove-gap: both 0 "Open Sans";

          :global(strong) {
            position: relative;

            &::after,
            &::before {
              content: "›";
              color: ${theme.text.color.attention};
              margin: 0 ${theme.space.xs} 0 0;
              text-shadow: 0 0 ${theme.space.s} ${theme.color.neutral.gray.k};
            }
            &::after {
              content: "‹";
              margin: 0 0 0 ${theme.space.xs};
            }
          }
        }

        @from-width tablet {
          .hero {
            background-image: url(${backgrounds.tablet});
          }

          h1 {
            max-width: 90%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
          }

          button {
            font-size: ${theme.font.size.l};
          }
        }

        @from-width desktop {
          .hero {
            background-image: url(${backgrounds.desktop});
          }

          h1 {
            max-width: 80%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
          }

          button {
            font-size: ${theme.font.size.xl};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
