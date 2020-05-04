import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import styled from '@emotion/styled'
import colors from 'styles/colors'
import {Link, graphql} from 'gatsby'
import {RichText} from 'prismic-reactjs'
import Button from 'components/_ui/Button'
import Layout from 'components/Layout'

const FeatureHeroContainer = styled('div')`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  img {
    max-width: 600px;
  }
`

const FeatureTitle = styled('div')`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`

const FeatureBody = styled('div')`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`

const FeaturesLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Feature = ({feature, meta}) => {
  return (
    <>
      <Helmet
        title={`${feature.feature_title[0].text} | InfraScript`}
        titleTemplate={`%s | ${meta.title}`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${feature.feature_title[0].text} | InfraScript`,
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
        <FeatureTitle>{RichText.render(feature.feature_title)}</FeatureTitle>
        {feature.feature_hero_image && (
          <FeatureHeroContainer>
            <img src={feature.feature_hero_image.url} alt="bees" />
          </FeatureHeroContainer>
        )}
        <FeatureBody>
          {RichText.render(feature.feature_description)}
          <FeaturesLink to={'/features'}>
            <Button className="Button--secondary">See other features</Button>
          </FeaturesLink>
        </FeatureBody>
      </Layout>
    </>
  )
}

export default ({data}) => {
  const featureContent = data.prismic.allFeatures.edges[0].node
  const meta = data.site.siteMetadata
  return <Feature feature={featureContent} meta={meta} />
}

Feature.propTypes = {
  feature: PropTypes.object.isRequired,
}

export const query = graphql`
  query FeatureQuery($uid: String) {
    prismic {
      allFeatures(uid: $uid) {
        edges {
          node {
            feature_title
            feature_preview_description
            feature_preview_thumbnail
            feature_category
            feature_post_date
            feature_hero_image
            feature_description
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
