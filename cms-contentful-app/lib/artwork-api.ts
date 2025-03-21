import { fetchGraphQL } from "./contentful";

// GraphQL fields for artwork
const ARTWORK_GRAPHQL_FIELDS = `
  sys {
    id
  }
  artistName
  title
  image {
    url
    width
    height
  }
  description
  createdAt
  artist {
    sys {
      id
    }
    name
    slug
  }
`;

// Extract a single artwork from the response
function extractArtwork(fetchResponse: any): any {
  return fetchResponse?.data?.artworksCollection?.items?.[0];
}

// Extract multiple artworks from the response
function extractArtworkEntries(fetchResponse: any): any[] {
  console.log("Extract Response:", JSON.stringify(fetchResponse?.data));
  return fetchResponse?.data?.artworksCollection?.items || [];
}

// Get all artwork
export async function getAllArtwork(
  isDraftMode: boolean = false
): Promise<any[]> {
  console.log(
    `Getting all artwork at ${new Date().toISOString()}, isDraftMode: ${isDraftMode}`
  );

  // タイムスタンプを付加してキャッシュバスティングを確実にする
  const timestamp = Date.now();

  const entries = await fetchGraphQL(
    `query {
      artworksCollection(order: createdAt_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }, limit: 100) {
        items {
          ${ARTWORK_GRAPHQL_FIELDS}
        }
      }
    }` + `# cache-bust: ${timestamp}`,
    { preview: isDraftMode, cache: "no-store" }
  );

  const artworks = extractArtworkEntries(entries);
  console.log(`Found ${artworks.length} artworks`);
  return artworks;
}

// Get artwork by artist ID
export async function getArtworkByArtistId(
  artistId: string,
  preview: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      artworksCollection(where: { artist: { sys: { id: "${artistId}" } } }, preview: ${
      preview ? "true" : "false"
    }) {
        items {
          ${ARTWORK_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview }
  );
  return extractArtworkEntries(entries);
}

// Get artwork by artist name
export async function getArtworkByArtistName(
  artistName: string,
  preview: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      artworksCollection(where: { artist: { name: "${artistName}" } }, preview: ${
      preview ? "true" : "false"
    }) {
        items {
          ${ARTWORK_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview }
  );
  return extractArtworkEntries(entries);
}

// Get a single artwork by ID
export async function getArtworkById(
  id: string,
  preview: boolean = false
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      artworksCollection(where: { sys: { id: "${id}" } }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ARTWORK_GRAPHQL_FIELDS}
        }
      }
    }`,
    { preview }
  );
  return extractArtwork(entry);
}

// Submit new artwork to Contentful
export async function submitArtwork(
  artistName: string,
  title: string,
  imageFile: File,
  description: string = ""
): Promise<any> {
  // This function will be implemented on the client side
  // as it requires handling file uploads and authentication

  // In a real implementation, you would:
  // 1. Upload the image to Contentful
  // 2. Create a new artwork entry with the image reference
  // 3. Return the created artwork

  // For now, we'll just return a placeholder
  return {
    success: true,
    message: "Artwork submitted successfully",
  };
}
