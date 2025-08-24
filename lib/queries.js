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
    title,
    slug,
    mainImage,
    body,
    author->{name, image, slug},
    category,
    _createdAt
  }
`;

// HOMEPAGE OPTIMIZED QUERIES

export const homepageBlogsQuery = `
  *[_type == "post"] | order(_createdAt desc)[0...3] {
    _id,
    title,
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
