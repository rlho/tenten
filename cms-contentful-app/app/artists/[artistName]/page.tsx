import Link from "next/link";
import ClientLogger from "../../components/ClientLogger";

// Frame component to display artwork (same as in gallery page)
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
            <p>
              {artwork.artistName || (artwork.artist && artwork.artist.name)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// モックアーティストデータ
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

// モックアートワークデータ
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

export default async function ArtistGalleryPage({
  params,
}: {
  params: { artistName: string };
}) {
  const artistName = decodeURIComponent(params.artistName);

  // アーティスト情報と作品を取得
  let artist = null;
  let artworks: any[] = [];

  try {
    // 一時的にContentfulからのデータ取得はコメントアウト
    // artist = await getArtistByName(artistName);
    // if (artist) {
    //   artworks = await getArtworkByArtistName(artistName);
    //   console.log("Fetched artworks length:", artworks.length);
    // } else {
    //   console.log("Artist not found:", artistName);
    // }
  } catch (error) {
    console.error("Error fetching artist data:", error);
    // エラーメッセージは表示せず、コンソールのみにログを残す
  }

  // モックデータから対応するアーティスト情報を取得
  if (!artist) {
    artist = mockArtists.find((a) => a.name === artistName);
    console.log("Using mock artist data for:", artistName);
  }

  // モックデータから対応する作品を取得
  if (artworks.length === 0) {
    artworks = mockArtworks.filter(
      (artwork) => artwork.artistName === artistName
    );
    console.log("Using mock artwork data, count:", artworks.length);
  }

  // 作品の位置情報を生成
  const artworksWithPositions = artworks.map((artwork) => {
    const { size, rotation } = getRandomPosition();
    const [width, height] = size.split(" ");
    return { artwork, width, height, rotation };
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Link
            href="/gallery"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            &larr; Back to All Artists
          </Link>

          <h1 className="text-4xl font-bold mb-2">{artistName}</h1>

          {artist && artist.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About the Artist</h2>
              <p className="text-gray-700">{artist.bio}</p>
            </div>
          )}
        </div>

        {/* 作品がない場合のメッセージ */}
        {artworks.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p>No artworks found for this artist.</p>
          </div>
        )}

        {/* Gallery Wall */}
        {artworks.length > 0 && (
          <div className="relative bg-gray-200 min-h-[600px] p-8 rounded-lg shadow-inner">
            {/* Artist Name */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
              <h2 className="text-3xl font-bold bg-white px-4 py-2 rounded-lg shadow-md">
                {artistName}
              </h2>
            </div>

            {/* Artwork Frames */}
            <div className="relative mt-16">
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
            {artist && artist.bio && (
              <div className="absolute bottom-4 right-4 max-w-md bg-white/80 p-4 text-sm">
                <p className="font-bold">Artist Statement</p>
                <p>{artist.bio}</p>
              </div>
            )}
          </div>
        )}

        {/* デバッグ情報 */}
        <ClientLogger
          data={{
            artistName,
            artistFound: !!artist,
            artworksLength: artworks.length,
          }}
        />
      </div>
    </div>
  );
}
