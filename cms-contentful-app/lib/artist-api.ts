import { fetchGraphQL } from "./contentful";

// GraphQL fields for artists
const ARTIST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  bio
  image {
    url
    width
    height
  }
  slug
  createdAt
`;

// Extract a single artist from the response
function extractArtist(fetchResponse: any): any {
  return fetchResponse?.data?.artistsCollection?.items?.[0];
}

// Extract multiple artists from the response
function extractArtistEntries(fetchResponse: any): any[] {
  console.log("Extract Response:", JSON.stringify(fetchResponse?.data));
  return fetchResponse?.data?.artistsCollection?.items || [];
}

// Get all artists
export async function getAllArtists(
  isDraftMode: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      artistsCollection(order: name_ASC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview: isDraftMode }
  );
  return extractArtistEntries(entries);
}

// Get a single artist by ID
export async function getArtistById(
  id: string,
  preview: boolean = false
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      artistsCollection(where: { sys: { id: "${id}" } }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview }
  );
  return extractArtist(entry);
}

// Get a single artist by slug
export async function getArtistBySlug(
  slug: string,
  preview: boolean = false
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      artistsCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview }
  );
  return extractArtist(entry);
}

// Get a single artist by name
export async function getArtistByName(
  name: string,
  preview: boolean = false
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      artistsCollection(where: { name: "${name}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview }
  );
  return extractArtist(entry);
}

// Get artworks by artist ID
export async function getArtworksByArtistId(
  artistId: string,
  preview: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      artworksCollection(where: { artist: { sys: { id: "${artistId}" } } }, preview: ${
      preview ? "true" : "false"
    }) {
        items {
          sys {
            id
          }
          title
          image {
            url
            width
            height
          }
          description
          createdAt
        }
      }
    }`,
    { preview }
  );
  return entries?.data?.artworksCollection?.items || [];
}

// Get artworks by artist name
export async function getArtworksByArtistName(
  artistName: string,
  preview: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      artworksCollection(where: { artist: { name: "${artistName}" } }, preview: ${
      preview ? "true" : "false"
    }) {
        items {
          sys {
            id
          }
          title
          image {
            url
            width
            height
          }
          description
          createdAt
          artist {
            name
            slug
          }
        }
      }
    }`,
    { preview }
  );
  return entries?.data?.artworksCollection?.items || [];
}
