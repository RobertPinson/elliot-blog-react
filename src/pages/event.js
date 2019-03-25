import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import EventPreview from '../components/event-preview'

class EventIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const events = get(this, 'props.data.allContentfulEvent.edges')

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>
          Events
        </div>
        <div className="wrapper">
          <h2 className="section-headline">Comming Events</h2>
          <ul className="event-list">
            {events.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <EventPreview eventPost={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default EventIndex

export const pageQuery = graphql`
  query EventIndexQuery {
    allContentfulEvent(sort: { fields: [eventDate], order: DESC }) {
      edges {
        node {
          title
          slug
          eventDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
