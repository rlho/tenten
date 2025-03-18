import { createClient } from "contentful-management";
import { NextRequest, NextResponse } from "next/server";

// Note: For content management operations (creating/updating entries),
// we need a Management Token, not the regular Access Token
// The Access Token (CONTENTFUL_ACCESS_TOKEN) is only for reading content
const getClient = () => {
  return createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || "",
  });
};

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const artistName = formData.get("artistName") as string;
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const imageFile = formData.get("image") as File;

    if (!artistName || !title || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // For demonstration purposes, we'll log the submission details
    // In a real implementation, you would:
    // 1. Upload the image to Contentful
    // 2. Create a new artwork entry with the image reference

    console.log("Artwork submission:", {
      artistName,
      title,
      description,
      imageFileName: imageFile.name,
      imageFileSize: imageFile.size,
    });

    // Since we don't have a valid CONTENTFUL_MANAGEMENT_TOKEN in the .env.local file,
    // we'll just return a success response for demonstration.
    // Note: The CONTENTFUL_ACCESS_TOKEN cannot be used for creating entries,
    // it can only be used for reading content.
    //return NextResponse.json({
    //  success: true,
    //  message: "Artwork submitted successfully",
    //});

    // This is how you would implement it with a management token:

    const client = getClient();
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || "");
    const environment = await space.getEnvironment("master");

    // Upload the image
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
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
            file: imageBuffer,
          },
        },
      },
    });

    // Process and publish the asset
    const processedAsset = await uploadedAsset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();

    // Create the artwork entry using the "Artworks" content model
    const entry = await environment.createEntry("artworks", {
      fields: {
        artistName: {
          "en-US": artistName,
        },
        title: {
          "en-US": title,
        },
        description: {
          "en-US": description,
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
      },
    });

    // Publish the entry
    const publishedEntry = await entry.publish();

    return NextResponse.json({
      success: true,
      message: "Artwork submitted successfully",
      id: publishedEntry.sys.id,
    });
  } catch (error) {
    console.error("Error submitting artwork:", error);
    return NextResponse.json(
      { error: "Failed to submit artwork" },
      { status: 500 }
    );
  }
}
