import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import heroStyles from "../components/hero.module.css";
import Layout from "../components/layout";

class EventPostTemplate extends React.Component {
  render() {
    const event = get(this.props, "data.contentfulEvent");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Layout>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${event.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={event.title}
              sizes={event.heroImage.sizes}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{event.title}</h1>
            <p
              style={{
                display: "block"
              }}
            >
              {event.eventDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: event.body.childMarkdownRemark.html
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default EventPostTemplate;

export const pageQuery = graphql`
  query EventBySlug($slug: String!) {
    contentfulEvent(slug: { eq: $slug }) {
      title
      eventDate(formatString: "MMMM Do, YYYY")
      heroImage {
        sizes(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
