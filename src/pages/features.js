import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import FeatureCard from 'components/FeatureCard'

const FeaturesTitle = styled('h1')`
  margin-bottom: 1em;
`

const Features = ({features, meta}) => (
  <>
    <Helmet
      title={`Features | InfraScript`}
      titleTemplate={`%s | Features | InfraScript`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: `Features | InfraScript`,
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
        {features.map((feature, i) => (
          <FeatureCard
            key={i}
            category={feature.node.feature_category}
            title={feature.node.feature_title}
            description={feature.node.feature_preview_description}
            thumbnail={feature.node.feature_preview_thumbnail}
            uid={feature.node._meta.uid}
          />
        ))}
      </>
    </Layout>
  </>
)

export default ({data}) => {
  const features = data.prismic.allFeatures.edges
  const meta = data.site.siteMetadata
  if (!features) return null

  return <Features features={features} meta={meta} />
}

Features.propTypes = {
  features: PropTypes.array.isRequired,
}

export const query = graphql`
  {
    prismic {
      allFeatures {
        edges {
          node {
            feature_title
            feature_preview_description
            feature_preview_thumbnail
            feature_category
            feature_post_date
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
