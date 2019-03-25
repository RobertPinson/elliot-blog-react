import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './event-preview.module.css'

export default ({ eventPost }) => (
  <div className={styles.preview}>
    <Img alt="" sizes={eventPost.heroImage.sizes} />
    <h3 className={eventPost.previewTitle}>
      <Link to={`/event/${eventPost.slug}`}>{eventPost.title}</Link>
    </h3>
    <small>{eventPost.date}</small>
    <p
      dangerouslySetInnerHTML={{        
        __html: `PREVIEW ${eventPost.description.childMarkdownRemark.html}`,
      }}
    />
  </div>
)
