import PropTypes from "prop-types";
import React from "react";

import Item from "./Item";

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    posts: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  };
  render(){
    const { posts, theme, fixed } = this.props;
    return (
      <React.Fragment>
        <main className={`main ${fixed?'bgFixed':''}`}>
          <ul>
            {posts.map(post => {
              const {
                node,
                node: {
                  fields: { slug }
                }
              } = post;
              return <Item key={slug} post={node} theme={theme} />;
            })}
          </ul>
        </main>
  
        {/* --- STYLES --- */}
        <style jsx>{`
          .main {
            padding: 0 ${theme.space.inset.default};
            opacity:0;
            transform:translateY(400px);
            transition: all 1.5s ease-in-out;
          }
          .main.bgFixed{
            opacity:1;
	          transform:translateY(-600px);
          }
          ul {
            list-style: none;
            margin: 0 auto;
            padding: ${`calc(${theme.space.default} * 1.5) 0 calc(${theme.space.default} * 0.5)`};
          }
  
          @above tablet {
            .main {
              padding: 0 ${`0 calc(${theme.space.default} * 1.5)`};
            }
            ul {
              max-width: ${theme.text.maxWidth.tablet};
            }
          }
          @above desktop {
            ul {
              max-width: ${theme.text.maxWidth.desktop};
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}
export default Blog;
