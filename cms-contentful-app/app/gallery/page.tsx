import GalleryWall from "@/app/components/gallery-wall";
import { getAllArtists } from "@/lib/contentful";
import { Metadata } from "next";

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
            <div className="w-full h-full flex items-center justify-center">
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
const mockArtists = [
  {
    name: "Jane Doe",
    bio: "Contemporary artist focusing on abstract expressionism.",
    slug: "jane-doe",
  },
  {
    name: "John Smith",
    bio: "Urban landscape photographer with a focus on architecture.",
    slug: "john-smith",
  },
  {
    name: "Alex Johnson",
    bio: "Nature-inspired painter working primarily with watercolors.",
    slug: "alex-johnson",
  },
  {
    name: "Sam Wilson",
    bio: "Digital artist exploring themes of technology and humanity.",
    slug: "sam-wilson",
  },
  {
    name: "Taylor Reed",
    bio: "Mixed media artist specializing in emotional expression.",
    slug: "taylor-reed",
  },
  {
    name: "Jordan Lee",
    bio: "Geometric abstract artist with a background in mathematics.",
    slug: "jordan-lee",
  },
  {
    name: "Casey Morgan",
    bio: "Sculptor and installation artist focused on movement and flow.",
    slug: "casey-morgan",
  },
  {
    name: "Riley Parker",
    bio: "Cultural artist drawing inspiration from global traditions.",
    slug: "riley-parker",
  },
];

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

export const metadata: Metadata = {
  title: "Gallery | TENTEN",
  description: "TENTEN artists",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const artists = await getAllArtists();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <GalleryWall items={artists} title="Artists" />
      </div>
    </div>
  );
}
