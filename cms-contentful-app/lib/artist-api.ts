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

// Function to fetch artists from Contentful using GraphQL
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
    isDraftMode
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
    preview
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
    preview
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
    preview
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
    preview
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
    preview
  );
  return entries?.data?.artworksCollection?.items || [];
}
