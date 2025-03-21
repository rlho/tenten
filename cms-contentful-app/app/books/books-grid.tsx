"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Book = {
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

type BooksGridProps = {
  books: Book[];
};

// Function to get random position values
function getRandomPosition() {
  const sizes = [
    { width: "w-52", height: "h-52" }, // 正方形（小）
    { width: "w-60", height: "h-48" }, // 横長（小）
    { width: "w-48", height: "h-60" }, // 縦長（小）
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

// Frame component to display book
function Frame({
  book,
  width = "w-52",
  height = "h-52",
  rotate = "rotate-0",
  zIndex = "z-10",
}: {
  book: Book;
  width?: string;
  height?: string;
  rotate?: string;
  zIndex?: string;
}) {
  return (
    <div
      className={`relative ${width} ${height} ${rotate} ${zIndex} transform transition-transform hover:scale-105 hover:z-20`}
    >
      <div className="absolute inset-0 bg-white shadow-lg border-8 border-white">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={book.image.url}
            alt={book.name}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function BooksGrid({ books }: BooksGridProps) {
  const [shuffledBooks, setShuffledBooks] = useState<Book[]>([]);
  const [gridLayout, setGridLayout] = useState<Array<{ x: number; y: number }>>(
    []
  );

  useEffect(() => {
    const shuffleArray = (array: Book[]) => {
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
            const xOffset = (Math.random() - 0.5) * 6; // ±3%のランダムなオフセット
            const yOffset = (Math.random() - 0.5) * 10; // ±5pxのランダムなオフセット

            positions.push({
              x: col * 28 + xOffset + 8, // 28%間隔で配置、左右に8%のマージン
              y: row * 280 + yOffset + 40, // 280px間隔で配置、上下に40pxのマージン
            });
          }
        }
      }

      // 位置をシャッフル
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }

      return positions;
    };

    const shuffledArray = shuffleArray(books);
    setShuffledBooks(shuffledArray);
    setGridLayout(generateGridLayout(shuffledArray.length));
  }, [books]);

  const booksWithPositions = shuffledBooks.map((book, index) => {
    const { width, height, rotation } = getRandomPosition();
    const position = gridLayout[index] || { x: 0, y: 0 };
    return { book, width, height, rotation, position };
  });

  return (
    <div
      className="relative mx-auto px-4"
      style={{ minHeight: `${Math.ceil(books.length / 3) * 280 + 80}px` }}
    >
      {booksWithPositions.map(
        ({ book, width, height, rotation, position }, index) => (
          <div
            key={book.sys.id}
            className="absolute transition-all duration-500"
            style={{
              left: `${position.x}%`,
              top: `${position.y}px`,
            }}
          >
            <Frame
              book={book}
              width={width}
              height={height}
              rotate={rotation}
              zIndex={`z-${index + 1}`}
            />
          </div>
        )
      )}
    </div>
  );
}
