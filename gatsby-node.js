const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({
  graphql,
  boundActionCreators
}) => {
  const {
    createPage
  } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const eventPost = path.resolve(`./src/templates/event-post.js`)

    resolve(
      graphql(
        `{
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulEvent {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              path: `/blog/${post.node.slug}/`
            },
          })
        })

        const events = result.data.allContentfulEvent.edges
        events.forEach((event, index) => {
          createPage({
            path: `/event/${event.node.slug}/`,
            component: eventPost,
            context: {
              slug: event.node.slug,
              path: `/event/${event.node.slug}/`,
            },
          })
        })
      })
    )
  })
}