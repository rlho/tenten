import { getAllArtwork } from "../../lib/artwork-api";

export default async function DebugPage() {
  let artworks: any[] = [];
  let error: Error | null = null;

  try {
    artworks = await getAllArtwork();
  } catch (e) {
    error = e instanceof Error ? e : new Error(String(e));
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contentful Debug Page</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {`CONTENTFUL_SPACE_ID: ${process.env.CONTENTFUL_SPACE_ID || "Not set"}
CONTENTFUL_ACCESS_TOKEN: ${
            process.env.CONTENTFUL_ACCESS_TOKEN
              ? "****" + process.env.CONTENTFUL_ACCESS_TOKEN.slice(-4)
              : "Not set"
          }
CONTENTFUL_PREVIEW_ACCESS_TOKEN: ${
            process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              ? "****" + process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN.slice(-4)
              : "Not set"
          }`}
        </pre>
      </div>

      {error && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
          <pre className="bg-red-100 p-4 rounded overflow-auto text-red-900">
            {error.message || error.toString()}
          </pre>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Artworks (Count: {artworks.length})
        </h2>
        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworks.map((artwork) => (
              <div
                key={artwork.sys.id}
                className="bg-white p-4 rounded shadow-md"
              >
                <h3 className="text-lg font-semibold">{artwork.title}</h3>
                <p className="text-sm text-gray-600">By {artwork.artistName}</p>
                {artwork.image?.url && (
                  <img
                    src={artwork.image.url}
                    alt={artwork.title}
                    className="w-full h-40 object-cover mt-2 rounded"
                  />
                )}
                {artwork.description && (
                  <p className="mt-2 text-sm">{artwork.description}</p>
                )}
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(artwork, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600">No artworks found</p>
        )}
      </div>
    </div>
  );
}
