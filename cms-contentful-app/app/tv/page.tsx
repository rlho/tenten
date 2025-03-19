import { getAllArtwork } from "../../lib/artwork-api";
import ClientSideTV from "./ClientSideTV";

// Server component to fetch all artwork - キャッシュを完全に無効化
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function TVPage() {
  // Fetch artworks from Contentful
  let artworks = [];
  let fetchError = null;

  try {
    // キャッシュ無効化オプションを明示的に渡す
    artworks = await getAllArtwork(false);
    console.log(
      `Fetched artworks length: ${
        artworks.length
      } at ${new Date().toISOString()}`
    );
    if (artworks.length === 0) {
      console.log("No artworks were fetched from Contentful");
    }
  } catch (error) {
    console.error("Error fetching artworks:", error);
    fetchError = error;
  }

  // If no artworks were fetched, use mock data
  if (artworks.length === 0) {
    console.log("Using mock artworks data");
    artworks = [
      {
        sys: { id: "1" },
        artistName: "Jane Doe",
        title: "Abstract Dreams",
        image: {
          url: "https://source.unsplash.com/random/800x600/?abstract",
        },
        description: "A vibrant exploration of color and form.",
      },
      {
        sys: { id: "2" },
        artistName: "John Smith",
        title: "Urban Landscape",
        image: { url: "https://source.unsplash.com/random/800x600/?city" },
        description: "A study of modern city architecture.",
      },
      {
        sys: { id: "3" },
        artistName: "Alex Johnson",
        title: "Nature's Whisper",
        image: { url: "https://source.unsplash.com/random/800x600/?nature" },
        description: "Capturing the subtle beauty of natural landscapes.",
      },
      {
        sys: { id: "4" },
        artistName: "Sam Wilson",
        title: "Digital Dystopia",
        image: {
          url: "https://source.unsplash.com/random/800x600/?digital",
        },
        description: "A commentary on our relationship with technology.",
      },
    ];
  }

  return <ClientSideTV artworks={artworks} />;
}
