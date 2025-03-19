import { NextRequest, NextResponse } from "next/server";
import { getAllArtists } from "../../../lib/artist-api";

export async function GET(request: NextRequest) {
  try {
    // Fetch all artists from Contentful
    const artists = await getAllArtists();

    return NextResponse.json({
      success: true,
      artists,
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}
