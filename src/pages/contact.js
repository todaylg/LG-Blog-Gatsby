import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Contact from "../components/Contact";
import Seo from "../components/Seo";

const ContactPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
         
            <Contact theme={theme} />
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ContactPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
