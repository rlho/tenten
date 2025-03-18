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
`;

// Function to fetch artwork from Contentful using GraphQL
async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["artwork"] },
    }
  ).then((response) => response.json());
}

// Extract a single artwork from the response
function extractArtwork(fetchResponse: any): any {
  return fetchResponse?.data?.artworksCollection?.items?.[0];
}

// Extract multiple artworks from the response
function extractArtworkEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.artworksCollection?.items || [];
}

// Get all artwork
export async function getAllArtwork(
  isDraftMode: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      artworksCollection(order: createdAt_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${ARTWORK_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
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
    preview
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
