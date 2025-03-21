"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryItem = {
  sys: {
    id: string;
  };
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

type GalleryWallProps = {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

// Function to get random position values
function getRandomPosition() {
  const sizes = [
    { width: "w-64", height: "h-64" }, // 正方形（中）
    { width: "w-72", height: "h-56" }, // 横長（中）
    { width: "w-56", height: "h-72" }, // 縦長（中）
    { width: "w-80", height: "h-64" }, // 横長（大）
    { width: "w-64", height: "h-80" }, // 縦長（大）
  ];
  const rotations = [
    "rotate-0",
    "rotate-1",
    "rotate-[-1deg]",
    "rotate-2",
    "rotate-[-2deg]",
  ];

  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  return {
    ...randomSize,
    rotation: rotations[Math.floor(Math.random() * rotations.length)],
  };
}

// Frame component to display item
function Frame({
  item,
  width = "w-64",
  height = "h-64",
  rotate = "rotate-0",
  zIndex = "z-10",
}: {
  item: GalleryItem;
  width?: string;
  height?: string;
  rotate?: string;
  zIndex?: string;
}) {
  return (
    <div
      className={`relative ${width} ${height} ${rotate} ${zIndex} transform transition-all duration-300 hover:scale-105 hover:z-50`}
    >
      <div className="absolute inset-0 bg-white rounded-sm p-3 shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_3px_rgba(0,0,0,0.05)]">
        {/* マットボーダー */}
        <div className="relative w-full h-full bg-gray-50 p-2">
          {/* 画像コンテナ */}
          <div className="relative w-full h-[85%] overflow-hidden">
            {item.image?.url ? (
              <Image
                src={item.image.url}
                alt={item.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-lg">{item.name}</span>
              </div>
            )}
          </div>
          {/* アーティスト名 */}
          <div className="h-[15%] flex items-center justify-center mt-2">
            <span className="text-gray-800 text-sm font-medium text-center">
              {item.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryWall({
  items,
  title,
  subtitle,
  className = "",
}: GalleryWallProps) {
  const [shuffledItems, setShuffledItems] = useState<GalleryItem[]>([]);
  const [gridLayout, setGridLayout] = useState<Array<{ x: number; y: number }>>(
    []
  );

  useEffect(() => {
    const shuffleArray = (array: GalleryItem[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    // グリッドレイアウトの生成
    const generateGridLayout = (count: number) => {
      const cols = 3; // グリッドの列数を3に維持
      const rows = Math.ceil(count / cols);
      const positions: Array<{ x: number; y: number }> = [];

      // 各行・列に対して位置を生成
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (positions.length < count) {
            // より小さなランダムオフセットを設定
            const xOffset = (Math.random() - 0.5) * 8; // ±4%のランダムなオフセット
            const yOffset = (Math.random() - 0.5) * 20; // ±10pxのランダムなオフセット

            positions.push({
              x: col * 31 + xOffset + 3, // 31%間隔で配置（3%のマージン）
              y: row * 320 + yOffset + 40, // 320px間隔で配置、上下に40pxのマージン
            });
          }
        }
      }

      return positions;
    };

    const shuffledArray = shuffleArray(items);
    setShuffledItems(shuffledArray);
    setGridLayout(generateGridLayout(shuffledArray.length));
  }, [items]);

  const itemsWithPositions = shuffledItems.map((item, index) => {
    const { width, height, rotation } = getRandomPosition();
    const position = gridLayout[index] || { x: 0, y: 0 };
    return { item, width, height, rotation, position };
  });

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-100 to-gray-200 min-h-[600px] p-8 rounded-lg shadow-inner ${className}`}
    >
      {/* Items Grid */}
      <div className="relative">
        <div
          className="relative mx-auto"
          style={{ minHeight: `${Math.ceil(items.length / 3) * 320 + 80}px` }}
        >
          {itemsWithPositions.map(
            ({ item, width, height, rotation, position }, index) => (
              <div
                key={item.sys.id}
                className="absolute transition-all duration-500"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}px`,
                }}
              >
                <Frame
                  item={item}
                  width={width}
                  height={height}
                  rotate={rotation}
                  zIndex={`z-${index + 1}`}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="absolute bottom-4 right-4 max-w-md bg-white/80 p-4 text-sm rounded-lg shadow-md">
          <p>{subtitle}</p>
        </div>
      )}
    </div>
  );
}
