import Link from "next/link";
import { getAllArtwork } from "../../lib/artwork-api";
import ClientLogger from "../components/ClientLogger";

// Frame component to display artwork
function Frame({
  artwork,
  width = "w-64",
  height = "h-64",
  rotate = "rotate-0",
  zIndex = "z-10",
}: {
  artwork: any;
  width?: string;
  height?: string;
  rotate?: string;
  zIndex?: string;
}) {
  // Debug artwork object structure
  console.log("Frame received artwork id:", artwork?.sys?.id);
  console.log("Frame received artwork title:", artwork?.title);
  console.log("Frame received artwork image url:", artwork?.image?.url);

  return (
    <div
      className={`relative ${width} ${height} ${rotate} ${zIndex} transform transition-transform hover:scale-105 hover:z-20`}
    >
      <div className="absolute inset-0 bg-white p-2 shadow-lg border-8 border-white">
        <div className="relative w-full h-full overflow-hidden">
          {artwork.image?.url ? (
            <img
              src={artwork.image.url}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500 text-center p-4">
                {artwork.title || "Artwork"}
              </p>
            </div>
          )}
          <div className="absolute bottom-0 right-0 p-2 bg-black bg-opacity-70 text-white text-xs max-w-[80%]">
            <p className="font-bold">{artwork.title}</p>
            <p>{artwork.artistName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data for testing (will be replaced with real data from Contentful)
const mockArtworks = [
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
  {
    sys: { id: "5" },
    artistName: "Taylor Reed",
    title: "Emotional Spectrum",
    image: {
      url: "https://source.unsplash.com/random/800x600/?emotion",
    },
    description: "Exploring the range of human emotions through color.",
  },
  {
    sys: { id: "6" },
    artistName: "Jordan Lee",
    title: "Geometric Harmony",
    image: {
      url: "https://source.unsplash.com/random/800x600/?geometric",
    },
    description: "Finding balance in mathematical precision.",
  },
  {
    sys: { id: "7" },
    artistName: "Casey Morgan",
    title: "Fluid Expressions",
    image: { url: "https://source.unsplash.com/random/800x600/?fluid" },
    description: "The beauty of movement captured in still form.",
  },
  {
    sys: { id: "8" },
    artistName: "Riley Parker",
    title: "Cultural Tapestry",
    image: {
      url: "https://source.unsplash.com/random/800x600/?culture",
    },
    description: "A celebration of diverse cultural influences.",
  },
];

// Function to get random position values
function getRandomPosition() {
  const sizes = [
    "w-48 h-48",
    "w-64 h-64",
    "w-72 h-56",
    "w-56 h-72",
    "w-80 h-64",
    "w-64 h-80",
  ];
  const rotations = [
    "rotate-0",
    "rotate-1",
    "rotate-[-1deg]",
    "rotate-2",
    "rotate-[-2deg]",
  ];

  return {
    size: sizes[Math.floor(Math.random() * sizes.length)],
    rotation: rotations[Math.floor(Math.random() * rotations.length)],
  };
}

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Fetch artwork from Contentful
  let artworks = [];
  let fetchError = null;

  try {
    artworks = await getAllArtwork();
    console.log("Fetched artworks length:", artworks.length);

    if (artworks.length > 0) {
      console.log("Sample artwork[0]:", JSON.stringify(artworks[0]));
      // Check if the structure matches what Frame component expects
      console.log("Artwork has sys.id:", !!artworks[0]?.sys?.id);
      console.log("Artwork has title:", !!artworks[0]?.title);
      console.log("Artwork has artistName:", !!artworks[0]?.artistName);
      console.log("Artwork has image.url:", !!artworks[0]?.image?.url);
    } else {
      console.log("No artworks were fetched from Contentful");
    }
  } catch (error) {
    console.error("Error fetching artwork:", error);
    fetchError = error;
    // Use mock data in case of error
    artworks = [];
  }

  // If no artworks are found, use mock data for demonstration
  console.log("Using mock data:", artworks.length === 0);
  const displayArtworks = artworks.length > 0 ? artworks : mockArtworks;
  console.log("displayArtworks length:", displayArtworks.length);

  if (displayArtworks.length > 0) {
    console.log(
      "Sample displayArtwork[0]:",
      JSON.stringify(displayArtworks[0])
    );
  }

  // Generate random positions for each artwork
  const artworksWithPositions = displayArtworks.map((artwork) => {
    const { size, rotation } = getRandomPosition();
    const [width, height] = size.split(" ");
    return { artwork, width, height, rotation };
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 text-center">
          <p className="text-xl mb-6">
            Showcasing the creativity of our community
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/gallery/submit/simple"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Your Artwork
            </Link>
            <Link
              href="/gallery/submit/detailed"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Detailed Submission
            </Link>
          </div>
        </div>

        {/* Gallery Wall */}
        <div className="relative bg-gray-200 min-h-[600px] p-8 rounded-lg shadow-inner">
          {/* TEN TEN Logo */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 text-transparent bg-clip-text p-2 rounded-lg"></h2>
          </div>

          {/* Artwork Frames */}
          <div className="relative mt-16">
            {/* This is where we'll position our frames in a gallery wall style */}
            <div className="flex flex-wrap justify-center gap-4">
              {artworksWithPositions.map(
                ({ artwork, width, height, rotation }, index) => (
                  <Frame
                    key={artwork.sys.id}
                    artwork={artwork}
                    width={width}
                    height={height}
                    rotate={rotation}
                    zIndex={`z-${10 + index}`}
                  />
                )
              )}
            </div>
          </div>

          {/* Artist Statement */}
          <div className="absolute bottom-4 right-4 max-w-md bg-white/80 p-4 text-sm">
            <p className="font-bold">Artist Statement</p>
            <p>
              Selected artwork from our community showcases diverse styles and
              perspectives. Each piece tells a unique story and reflects the
              artist's vision and creativity.
            </p>
          </div>
        </div>

        {/* デバッグ情報 */}
        <ClientLogger
          data={{
            artworksLength: artworks.length,
            firstArtwork: artworks[0] || null,
          }}
        />
      </div>
    </div>
  );
}
