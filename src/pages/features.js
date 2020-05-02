import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import ProjectCard from 'components/ProjectCard'

const FeaturesTitle = styled('h1')`
  margin-bottom: 1em;
`

const Features = ({projects, meta}) => (
  <>
    <Helmet
      title={`Features | Prist, Gatsby & Prismic Starter`}
      titleTemplate={`%s | Features | Prist, Gatsby & Prismic Starter`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: `Features | Prist, Gatsby & Prismic Starter`,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat(meta)}
    />
    <Layout>
      <FeaturesTitle>Features</FeaturesTitle>
      <>
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            category={project.node.project_category}
            title={project.node.project_title}
            description={project.node.project_preview_description}
            thumbnail={project.node.project_preview_thumbnail}
            uid={project.node._meta.uid}
          />
        ))}
      </>
    </Layout>
  </>
)

export default ({data}) => {
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata
  if (!projects) return null

  return <Features projects={projects} meta={meta} />
}

Features.propTypes = {
  projects: PropTypes.array.isRequired,
}

export const query = graphql`
  {
    prismic {
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
