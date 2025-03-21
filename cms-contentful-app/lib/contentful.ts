import { cache } from "react";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_PREVIEW_ACCESS_TOKEN =
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

if (
  !CONTENTFUL_SPACE_ID ||
  !CONTENTFUL_ACCESS_TOKEN ||
  !CONTENTFUL_PREVIEW_ACCESS_TOKEN
) {
  throw new Error(
    "Please provide CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN and CONTENTFUL_PREVIEW_ACCESS_TOKEN environment variables"
  );
}

type FetchOptions = {
  preview?: boolean;
  tags?: string[];
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export const fetchGraphQL = cache(async function (
  query: string,
  options: FetchOptions = {}
): Promise<{ data: any }> {
  const {
    preview = false,
    tags,
    cache: cacheOption = "no-store",
    next,
  } = options;

  console.log("GraphQL Query:", query);
  console.log(`Making GraphQL request at ${new Date().toISOString()}`);

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
        cache: cacheOption,
        next: next || (tags ? { tags } : undefined),
      }
    );

    if (!response.ok) {
      console.error(
        "Contentful API Error:",
        response.status,
        response.statusText
      );
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error(JSON.stringify(json.errors, null, 2));
      throw new Error("Failed to fetch API");
    }

    console.log("GraphQL Response Data:", JSON.stringify(json.data));

    return json;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw error;
  }
});

export async function getBooks() {
  const query = `
    query {
      bookCollection {
        items {
          sys {
            id
          }
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  const { data } = await fetchGraphQL(query, { cache: "no-store" });
  return data.bookCollection.items;
}

export async function getAllArtists() {
  const query = `
    query {
      artistsCollection {
        items {
          sys {
            id
          }
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  const { data } = await fetchGraphQL(query, { cache: "no-store" });
  return data.artistsCollection.items;
}
