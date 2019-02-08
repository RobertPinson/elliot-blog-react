import React from 'react'
import Link from 'gatsby-link'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">News</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/sponsors/">History</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/sponsors/">Sponsors</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/sponsors/">Contact</Link>
      </li>
    </ul>
  </nav>
)
