import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Styled from "styled-components";
import heroStyles from "../components/hero.module.css";
import Layout from "../components/layout";
import { colors } from "../colors";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Layout>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <Share>
            <ShareLabel>Share this post</ShareLabel>
            <ShareSocial>
              <ShareItem>
                <ShareLink
                  href={`https://twitter.com/intent/tweet/?text=${
                    post.title
                  }&url=https://elliotpinson.com/blog/${
                    post.slug
                  }%2F&via=elliot__pinson `}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-twitter"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </span>
                  <LinkLabel>Share on Twitter</LinkLabel>
                </ShareLink>
              </ShareItem>
              <ShareItem>
                <ShareLink
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://elliotpinson.com/blog/${
                    post.slug
                  }`}
                  target="_blank"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </span>
                  <LinkLabel>Share on Facebook</LinkLabel>
                </ShareLink>
              </ShareItem>
              <ShareItem>
                <ShareLink
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://elliotpinson.com/blog/${
                    post.slug
                  }&title=${post.title}&source=${post.title}`}
                  target="_blank"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  <LinkLabel>Share on LinkedIn</LinkLabel>
                </ShareLink>
              </ShareItem>
            </ShareSocial>
          </Share>
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              sizes={post.heroImage.sizes}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block"
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      publishDate(formatString: "MMMM Do, YYYY")
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

const Share = Styled.section`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  padding-top: 5px;
`;

const ShareLabel = Styled.p`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 2px 0 0;
`;

const ShareSocial = Styled.ul`
  align-items: center;
  display: flex;
  flex-direction: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 1;
`;

const ShareItem = Styled.li`
  margin: 0 10px;
`;

const ShareLink = Styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${colors.white};
  border-radius: 50%;
  border: 1px solid ${colors.black};
  transition: border 0.3s ease-in-out;
  > span {
    height: 20px;
  }
  .icon {
    width: 20px;
    height: 20px;
    stroke: ${colors.black};
    fill: ${colors.black};
    transition: transform 0.2s ease-in-out;
  }
  &:hover,
  &:focus {
    border-color ${colors.darkerGray};
    .icon {
      transform: scale(1.2);
      stroke: ${colors.black};
      fill: ${colors.black};
    }
  }
`;
const LinkLabel = Styled.span`
// Hides elements from view but are still available
// to screen readers for accessbility purposes.
// sass-lint:disable no-important
  position: fixed !important;
  // keep it on viewport
  top: 0 !important;
  left: 0 !important;
  // give it non-zero size, VoiceOver on Safari requires at least 2 pixels
     before allowing buttons to be activated.
  width: 4px !important;
  height: 4px !important;
  // visually hide it with overflow and opacity
  opacity: 0 !important;
  overflow: hidden !important;
  // remove any margin or padding
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  // ensure no other style sets display to none
  display: block !important;
  visibility: visible !important;
  &.focusable:focus,
  &.focusable:active {
    position: static !important;
    width: auto !important;
    height: auto !important;
    opacity: 1 !important;
  }
`;
