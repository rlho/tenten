import { NextResponse } from "next/server";
import { getAllArtwork } from "../../../lib/artwork-api";

export async function GET() {
  try {
    // データ取得
    const artworks = await getAllArtwork();

    // 環境変数情報（トークンは安全に処理）
    const envInfo = {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN_SET: !!process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_PREVIEW_ACCESS_TOKEN_SET:
        !!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    };

    // レスポンスの構築
    return NextResponse.json({
      success: true,
      envInfo,
      artworksCount: artworks.length,
      artworks,
    });
  } catch (error) {
    console.error("API Debug Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : null,
      },
      { status: 500 }
    );
  }
}
