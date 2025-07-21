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

export const allAuthorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }
`;

export const authorBySlugQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio
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
