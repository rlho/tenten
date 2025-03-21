import { fetchGraphQL } from "./contentful";

const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items || [];
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview: true }
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  try {
    const entries = await fetchGraphQL(
      `query {
        postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
      { preview: isDraftMode, tags: ["posts"] }
    );

    const posts = extractPostEntries(entries);
    if (!posts || posts.length === 0) {
      console.warn("No posts found in Contentful");
    }
    return posts;
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<any> {
  try {
    const entry = await fetchGraphQL(
      `query {
        postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
      { preview }
    );
    const entries = await fetchGraphQL(
      `query {
        postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
      { preview }
    );

    const post = extractPost(entry);
    if (!post) {
      console.warn(`Post with slug "${slug}" not found`);
    }

    return {
      post: post || null,
      morePosts: extractPostEntries(entries),
    };
  } catch (error) {
    console.error(`Error getting post with slug "${slug}":`, error);
    return {
      post: null,
      morePosts: [],
    };
  }
}
