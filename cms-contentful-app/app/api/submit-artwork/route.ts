import { createClient } from "contentful-management";
import { NextRequest, NextResponse } from "next/server";
import { getArtistByName } from "../../../lib/artist-api";

// Note: For content management operations (creating/updating entries),
// we need a Management Token, not the regular Access Token
// The Access Token (CONTENTFUL_ACCESS_TOKEN) is only for reading content
const getClient = () => {
  return createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || "",
  });
};

// Helper function to create a slug from a name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-"); // Replace multiple hyphens with a single hyphen
};

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const createNewArtist = formData.get("createNewArtist") === "true";
    const artistName = formData.get("artistName") as string;
    const artistBio = createNewArtist ? (formData.get("artistBio") as string) || "" : "";
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const medium = (formData.get("medium") as string) || "";
    const year = (formData.get("year") as string) || "";
    const dimensions = (formData.get("dimensions") as string) || "";
    const imageFile = formData.get("image") as File;

    if (!artistName || !title || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Artwork submission:", {
      createNewArtist,
      artistName,
      artistBio,
      title,
      description,
      medium,
      year,
      dimensions,
      imageFileName: imageFile.name,
      imageFileSize: imageFile.size,
    });

    const client = getClient();
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || "");
    const environment = await space.getEnvironment("master");

    // Upload the image
    const arrayBuffer = await imageFile.arrayBuffer();
    const uploadedAsset = await environment.createAssetFromFiles({
      fields: {
        title: {
          "en-US": title,
        },
        description: {
          "en-US": description,
        },
        file: {
          "en-US": {
            contentType: imageFile.type,
            fileName: imageFile.name,
            file: arrayBuffer,
          },
        },
      },
    });

    // Process and publish the asset
    const processedAsset = await uploadedAsset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();

    // Handle artist creation or lookup
    let artistEntry;
    let artistId;
    
    if (createNewArtist) {
      // Create a new artist entry
      const artistSlug = createSlug(artistName);
      
      artistEntry = await environment.createEntry("artists", {
        fields: {
          name: {
            "en-US": artistName,
          },
          bio: {
            "en-US": artistBio,
          },
          slug: {
            "en-US": artistSlug,
          },
        },
      });
      
      // Publish the artist entry
      const publishedArtistEntry = await artistEntry.publish();
      artistId = publishedArtistEntry.sys.id;
    } else {
      // Find existing artist
      const existingArtist = await getArtistByName(artistName);
      
      if (!existingArtist) {
        return NextResponse.json(
          { error: "Selected artist not found" },
          { status: 404 }
        );
      }
      
      artistId = existingArtist.sys.id;
    }

    // Create the artwork entry using the "Artworks" content model
    const artworkEntry = await environment.createEntry("artworks", {
      fields: {
        title: {
          "en-US": title,
        },
        description: {
          "en-US": description,
        },
        medium: {
          "en-US": medium,
        },
        year: {
          "en-US": year,
        },
        dimensions: {
          "en-US": dimensions,
        },
        image: {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: publishedAsset.sys.id,
            },
          },
        },
        artist: {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: artistId,
            },
          },
        },
      },
    });

    // Publish the artwork entry
    const publishedArtworkEntry = await artworkEntry.publish();

    return NextResponse.json({
      success: true,
      message: "Artwork submitted successfully",
      id: publishedArtworkEntry.sys.id,
    });
  } catch (error) {
    console.error("Error submitting artwork:", error);
    return NextResponse.json(
      { error: "Failed to submit artwork" },
      { status: 500 }
    );
  }
}
