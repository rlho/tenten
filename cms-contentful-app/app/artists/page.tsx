import Link from "next/link";
import ClientLogger from "../components/ClientLogger";

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

export const dynamic = "force-dynamic";

export default async function ArtistsPage() {
  // 常にモックデータを使用
  const artists = mockArtists;
  console.log("Using mock artists data");

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Artists</h1>
          <p className="text-lg mb-6">
            Explore the creative minds behind our gallery
          </p>
        </div>

        {/* アーティスト一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {artists.map((artist) => (
            <Link
              key={artist.name}
              href={`/artists/${encodeURIComponent(artist.name)}`}
              className="block transform transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border border-gray-200">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-16"></div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3">{artist.name}</h2>
                  <p className="text-gray-600 mb-4">{artist.bio}</p>
                  <div className="text-blue-600 hover:text-blue-800 flex items-center justify-between">
                    <span>View Artist Gallery</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ギャラリーページへのリンク */}
        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Visit Our Gallery
          </Link>
        </div>

        {/* デバッグ情報 */}
        <ClientLogger
          data={{
            artistsCount: artists.length,
          }}
        />
      </div>
    </div>
  );
}
