export const allBlogsQuery = `
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    body,
    author->{name, image},
    _createdAt
  }
`;

export const blogBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    publishedAt,
    title,
    slug,
    mainImage,
    description,
    body,
    author->{name, image, slug},
    category,
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImage,
      noIndex
    }
  }
`;

// HOMEPAGE OPTIMIZED QUERIES

export const homepageBlogsQuery = `
  *[_type == "post"] | order(publishedAt  desc)[0...3] {
    _id,
    title,
    description,
    slug,
    mainImage,
    author->{name, image},
    _createdAt
  }
`;

export const homepageProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    overview
  }
`;
// some                         space
export const allAuthorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio,
    twitter,
    linkedin,
    github,
    instagram,
    tiktok,
    facebook
  }
`;

export const authorBySlugQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio,
    twitter,
    linkedin,
    github,
    instagram,
    tiktok,
    facebook
  }
`;

export const blogsByAuthorQuery = `
  *[_type == "post" && author->slug.current == $slug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    body,
    categories[]->{title, slug},
    _createdAt
  }
`;

export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

export const paginatedBlogsQuery = `
  *[_type == "post"$categoryFilter$searchFilter] | order(_createdAt desc) [$start...$end] {
    _id,
    title,
    slug,
    mainImage,
        description,

    body,
    author->{name, image, slug},
    categories[]->{title, slug},
    _createdAt
  }
`;

export const projects = `*[_type == "project"]{
  _id,
  title,
  slug,
  client,
  category,
   mainImage{
    asset->{
      url
    }
  },
  overview,
  challenge,
  solution,
  testimonial->{author, quote},
  webDetails{
    heroImage{
      asset->{
        url
      }
    },
    technologies,
    link
  },
  seoDetails,
  aiDetails
}`;

export const allProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    overview
  }
`;

export const projectsBySlug = `
  *[_type == "project" && slug.current == $slug][0] {

  _id,
  title,
  slug,
  client,
  category,
  mainImage{
    asset->{
      url
    }
  },
  overview,
  challenge,
  solution,
  testimonial->{author, quote},
  webDetails{
    heroImage{
      asset->{
        url
      }
    },
    technologies,
    link
  },
  seoDetails,
  aiDetails
}`;

export const allTestimoniaQuery = `
  *[_type == "testimonia"] | order(_createdAt desc) {
    _id,
    tag,
    desc,
    name,
    position,
    image,
    projectType,
    _createdAt
  }
`;

// Case Study Queries
export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    heroMedia,
    services,
    industry,
    location,
    publishedAt
  }
`;

export const homepageCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc, _createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    heroMedia,
    services,
    industry,
    location,
    publishedAt
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    shortDescription,
    heroMedia,
    services,
    industry,
    location,
    liveUrl,
    overview,
    highlights[]{title, description, image},
    screenshots[],
    results[]{label, value, delta},
    testimonial{quote, author, role, photo},
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImage,
      noIndex
    },
    publishedAt
  }
`;

export const testimoniaByNameQuery = `
  *[_type == "testimonia" && name == $name][0] {
    _id,
    tag,
    desc,
    name,
    position,
    image,
    _createdAt
  }
`;

// Website Listing Queries
export const homepageWebsiteListingsQuery = `
  *[_type == "websiteListing"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    type,
    price,
    availability,
    shortDescription,
    mainImage,
    category
  }
`;

export const allWebsiteListingsQuery = `
  *[_type == "websiteListing"] | order(_createdAt desc) {
    _id,
    _updatedAt,
    title,
    slug,
    type,
    price,
    availability,
    shortDescription,
    mainImage,
    category,
    techStack,
    liveUrl,
    loomVideoUrl
  }
`;

export const websiteListingBySlugQuery = `
  *[_type == "websiteListing" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    type,
    price,
    availability,
    shortDescription,
    loomVideoUrl,
    liveUrl,
    mainImage,
    screenshots[]{
      asset->{url},
      alt,
      caption
    },
    category,
    techStack,
    whatsIncluded,
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImage,
      noIndex
    }
  }
`;

export const allWebsiteListingSlugsQuery = `
  *[_type == "websiteListing" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`;
