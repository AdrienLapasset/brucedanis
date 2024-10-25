import { groq } from "next-sanity";

export const ILLUSTRATIONS_QUERY = groq`*[_type == "illustrationsBlock"] | order(number desc){
  "id": _id,
  number,
  "illustrations": *[_type == "illustration" && defined(slug) && references(^._id)] | order(orderRank) {
    title,
    slug,
    position,
    mainImage {
      asset->{
        ...,
        metadata
      }
    },
    gifImage {
      asset->{
        ...,
        metadata
      }
    },
      "blockRef": illustrationsBlock->_id
    }
}`;

export const ILLUSTRATIONS_SLUG_QUERY = groq`*[_type == "illustration" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export const ILLUSTRATION_QUERY = groq`*[_type == "illustration" && slug.current == $slug][0]{
  title,
  category,
  description,
  titleImage {
    asset->{
      ...,
      metadata
    }
  },
  "formats": formats[]{
    image {
        asset->{
          ...,
      metadata
        }
      },
    technique,
    dimensions,
    price,
    paymentUrl,
    soldOut,
  },
  "prev": *[_type == 'illustration' && category._ref == ^.category._ref && _createdAt < ^._createdAt] | order(_createdAt desc)[0]{
    "slug": slug.current
  },
  "next": *[_type == 'illustration' && category._ref == ^.category._ref && _createdAt > ^._createdAt] | order(_createdAt asc)[0]{
    "slug": slug.current
  },
  "last": *[_type == 'illustration' && category._ref == ^.category._ref ] | order(_createdAt desc)[0]{
    "slug": slug.current
  },
  "first": *[_type == 'illustration' && category._ref == ^.category._ref ] | order(_createdAt asc)[0]{
    "slug": slug.current
  },
  "categoryCount": count(*[_type == 'illustration' && category._ref == ^.category._ref ])
}`;

export const EVENTS_QUERY = groq`*[_type == "event"]`;

export const VACATION_QUERY = groq`*[_type == "vacation"]`;
