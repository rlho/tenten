"use client";

import { useCallback, useEffect, useState } from "react";

interface Artwork {
  sys: {
    id: string;
  };
  artistName: string;
  title: string;
  image: {
    url: string;
    width?: number;
    height?: number;
  };
  description: string;
}

export default function ClientSideTV({ artworks }: { artworks: Artwork[] }) {
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  const [imageError, setImageError] = useState(false);

  // Function to select a random artwork
  const selectRandomArtwork = useCallback(() => {
    if (artworks && artworks.length > 0) {
      const randomIndex = Math.floor(Math.random() * artworks.length);
      setCurrentArtwork(artworks[randomIndex]);
      setImageError(false); // リセット
    }
  }, [artworks]);

  // 画像読み込みエラー時の処理
  const handleImageError = () => {
    console.error("Image failed to load:", currentArtwork?.image?.url);
    setImageError(true);
  };

  // Initialize with a random artwork and set up interval to change it
  useEffect(() => {
    selectRandomArtwork();

    // Change artwork every 10 seconds
    const interval = setInterval(() => {
      selectRandomArtwork();
    }, 10000);

    return () => clearInterval(interval);
  }, [artworks, selectRandomArtwork]);

  if (!currentArtwork) {
    return <div className="text-center p-8">Loading artwork...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* TV with artwork */}
        <div className="relative mx-auto" style={{ maxWidth: "800px" }}>
          {/* テレビのスクリーン全体（白い部分も含む）を黒くする */}
          <div
            className="absolute"
            style={{
              top: "5%",
              left: "3%",
              width: "94%",
              height: "85%",
              zIndex: 15,
              backgroundColor: "#000",
              borderRadius: "55px / 50px",
            }}
          ></div>

          {/* テレビスクリーン中央部分の表示エリア */}
          <div
            className="absolute"
            style={{
              top: "9.5%",
              left: "12%",
              width: "76%",
              height: "64%",
              zIndex: 15,
              backgroundColor: "#000",
              borderRadius: "25px / 20px",
            }}
          ></div>

          {/* テレビの作品表示エリア - モニター中央に配置 */}
          <div
            className="absolute"
            style={{
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "50%",
              zIndex: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* 画像エリア */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                position: "relative",
              }}
            >
              <img
                src={
                  imageError || !currentArtwork.image?.url
                    ? "/sample_art.png"
                    : currentArtwork.image.url
                }
                alt={currentArtwork.title}
                className="object-cover w-full h-full"
                onError={handleImageError}
                style={{
                  display: "block",
                  objectPosition: "center", // 画像を中央に配置
                }}
              />
            </div>
          </div>

          {/* テレビフレーム（最上層に表示） */}
          <div className="relative" style={{ zIndex: 20 }}>
            <img
              src="/tv.png"
              alt="TV Frame"
              className="w-full h-auto relative"
            />
          </div>
        </div>

        {/* Artwork information */}
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">{currentArtwork.title}</h2>
          <h3 className="text-xl text-gray-700 mb-4">
            by {currentArtwork.artistName}
          </h3>
          <p className="text-gray-600">{currentArtwork.description}</p>
          {imageError && (
            <p className="text-amber-600 mt-2 text-sm">
              * 元の画像が見つからなかったため、サンプル画像を表示しています
            </p>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={selectRandomArtwork}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Another Artwork
          </button>
        </div>
      </div>
    </div>
  );
}
