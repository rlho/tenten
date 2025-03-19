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

// Function to fetch artwork from Contentful using GraphQL
async function fetchGraphQL(query: string, preview = false): Promise<any> {
  console.log("GraphQL Query:", query);

  // 環境変数のチェック
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  console.log("Contentful Space ID:", spaceId);
  console.log("Access Token available:", !!accessToken);
  console.log("Using Preview Token:", preview);

  // エンドポイントとヘッダーの構築
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  console.log("Contentful API Endpoint:", endpoint);
  console.log(
    "Headers:",
    JSON.stringify(headers, (key, value) =>
      key === "Authorization" ? "Bearer ***" : value
    )
  );

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(
        "Contentful API Error:",
        response.status,
        response.statusText
      );
      throw new Error(
        `Contentful API Error: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    console.log("GraphQL Response Status:", response.status);

    // エラーチェック
    if (json.errors) {
      console.error("GraphQL Errors:", JSON.stringify(json.errors));
      throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
    }

    console.log("GraphQL Response Data:", JSON.stringify(json.data));

    return json;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

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
    preview
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
    preview
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
