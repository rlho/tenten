"use client";

import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { useEffect, useState } from "react";

type Post = {
  title: string;
  coverImage: {
    url: string;
  };
  content: any;
};

type PostSliderProps = {
  posts: Post[];
};

// 画像のURLから縦長かどうかを判断する関数
const isVerticalImage = async (url: string): Promise<boolean> => {
  try {
    // 画像のサイズを取得
    const dimensions = await getImageDimensions(url);
    if (dimensions) {
      return dimensions.height > dimensions.width;
    }
  } catch (error) {
    console.error("Error getting image dimensions:", error);
  }

  // ファイル名に "vertical" や "portrait" が含まれている場合
  const filename = url.split("/").pop()?.toLowerCase() || "";
  if (filename.includes("vertical") || filename.includes("portrait")) {
    return true;
  }

  // デフォルトは横長と判断
  return false;
};

// 画像のURLからサイズを取得する関数
const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
};

export default function PostSlider({ posts }: PostSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (posts[currentIndex]?.coverImage?.url) {
      isVerticalImage(posts[currentIndex].coverImage.url).then(setIsVertical);
    }
  }, [currentIndex, posts]);

  if (!posts || posts.length === 0) {
    return (
      <div className="my-8 mb-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
          YOUR HEADLINE HERE
        </h2>
        <div className="border border-[#222] p-1 mb-4">
          <div className="w-full h-[200px] md:h-[400px] bg-[#222] text-[#e6ddc6] flex items-center justify-center">
            Your Image Here
          </div>
        </div>
        <div className="text-sm leading-relaxed mb-6">
          <p>Your text goes here</p>
        </div>
      </div>
    );
  }

  const currentPost = posts[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Render rich text content
  const renderContent = () => {
    // Check if content exists
    if (!currentPost.content) {
      return <p>No content available</p>;
    }

    try {
      // Contentfulの GraphQL APIから取得したリッチテキスト形式
      if (currentPost.content.json) {
        // リッチテキスト内の画像アセットを処理するための設定
        const options: Options = {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
              <p className="mb-4">{children}</p>
            ),
            [BLOCKS.HEADING_1]: (node, children) => (
              <h1 className="text-3xl font-bold mb-4">{children}</h1>
            ),
            [BLOCKS.HEADING_2]: (node, children) => (
              <h2 className="text-2xl font-bold mb-3">{children}</h2>
            ),
            [BLOCKS.HEADING_3]: (node, children) => (
              <h3 className="text-xl font-bold mb-2">{children}</h3>
            ),
            [BLOCKS.UL_LIST]: (node, children) => (
              <ul className="list-disc pl-5 mb-4">{children}</ul>
            ),
            [BLOCKS.OL_LIST]: (node, children) => (
              <ol className="list-decimal pl-5 mb-4">{children}</ol>
            ),
            [BLOCKS.LIST_ITEM]: (node, children) => (
              <li className="mb-1">{children}</li>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
              <a
                href={node.data.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {children}
              </a>
            ),
            // 埋め込み画像の処理
            [BLOCKS.EMBEDDED_ASSET]: async (node) => {
              // アセットIDを取得
              const assetId = node.data.target.sys.id;

              // リンクされたアセットを検索
              const asset = currentPost.content.links?.assets?.block?.find(
                (asset: any) => asset.sys.id === assetId
              );

              if (asset) {
                // APIから取得した時点で縦長かどうかを判断
                const isVertical = await isVerticalImage(asset.url);

                // 縦長画像の場合は横並びのレイアウト、それ以外は縦並びのレイアウト
                const containerClass = isVertical
                  ? "block md:flex md:flex-row md:gap-4 md:items-start"
                  : "block";

                const imageWrapperClass = isVertical
                  ? "w-full md:w-2/3 flex-shrink-0"
                  : "w-full";

                const textWrapperClass = isVertical
                  ? "w-full md:w-1/3 mt-2 md:mt-0 md:flex-1"
                  : "w-full mt-2";

                return (
                  <div className="my-4">
                    <div className={containerClass}>
                      <div className={imageWrapperClass}>
                        <div className="relative w-full h-full">
                          <img
                            src={asset.url}
                            alt={asset.description || ""}
                            className="w-full h-full object-cover block"
                            style={{
                              display: "block",
                              verticalAlign: "bottom",
                            }}
                          />
                        </div>
                      </div>
                      {asset.description && (
                        <div className={textWrapperClass}>
                          <p className="text-sm md:text-base">
                            {asset.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return <p>Missing asset</p>;
            },
          },
        };

        return documentToReactComponents(currentPost.content.json, options);
      }

      // 他の形式のチェック
      if (typeof currentPost.content === "string") {
        return <p>{currentPost.content}</p>;
      }

      if (
        currentPost.content &&
        typeof currentPost.content === "object" &&
        currentPost.content.nodeType === "document" &&
        Array.isArray(currentPost.content.content)
      ) {
        return documentToReactComponents(currentPost.content as Document, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
              <p className="mb-4">{children}</p>
            ),
            [BLOCKS.HEADING_1]: (node, children) => (
              <h1 className="text-3xl font-bold mb-4">{children}</h1>
            ),
            [BLOCKS.HEADING_2]: (node, children) => (
              <h2 className="text-2xl font-bold mb-3">{children}</h2>
            ),
            [BLOCKS.HEADING_3]: (node, children) => (
              <h3 className="text-xl font-bold mb-2">{children}</h3>
            ),
            [BLOCKS.UL_LIST]: (node, children) => (
              <ul className="list-disc pl-5 mb-4">{children}</ul>
            ),
            [BLOCKS.OL_LIST]: (node, children) => (
              <ol className="list-decimal pl-5 mb-4">{children}</ol>
            ),
            [BLOCKS.LIST_ITEM]: (node, children) => (
              <li className="mb-1">{children}</li>
            ),
          },
        });
      }

      // デバッグ情報を表示
      console.error(
        "Content structure:",
        JSON.stringify(currentPost.content, null, 2)
      );
      return <p>Content format is not supported</p>;
    } catch (error) {
      console.error("Error rendering rich text:", error);
      return (
        <p>
          Error rendering content:{" "}
          {error instanceof Error ? error.message : String(error)}
        </p>
      );
    }
  };

  return (
    <div className="my-8 mb-6 relative">
      {/* Left Arrow */}
      {posts.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 z-10 rounded-r-md hover:bg-opacity-70 transition-opacity"
          aria-label="Previous post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {posts.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 z-10 rounded-l-md hover:bg-opacity-70 transition-opacity"
          aria-label="Next post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Post Content */}
      <div className="transition-opacity duration-300">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
          {currentPost.title}
        </h2>

        {/* メインコンテンツエリア */}
        <div className="mb-6">
          {currentPost.coverImage ? (
            <div
              className={`flex flex-col md:flex-row md:gap-6 ${
                isVertical ? "md:flex-row" : "md:flex-col"
              }`}
            >
              {/* Main Image */}
              <div
                className={`border border-[#222] mb-4 md:mb-0 ${
                  isVertical ? "md:w-2/3" : "w-full"
                }`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={currentPost.coverImage.url}
                    alt={currentPost.title || "Featured image"}
                    className="w-full h-full object-cover block"
                    style={{ display: "block", verticalAlign: "bottom" }}
                  />
                </div>
              </div>

              {/* Post Content */}
              <div
                className={`text-sm leading-relaxed ${
                  isVertical ? "md:w-1/3 md:flex-1" : "w-full"
                }`}
              >
                {renderContent()}
              </div>
            </div>
          ) : (
            <div>
              <div className="border border-[#222] p-1 mb-4">
                <div className="w-full h-[200px] md:h-[400px] bg-[#222] text-[#e6ddc6] flex items-center justify-center">
                  Your Image Here
                </div>
              </div>
              <div className="text-sm leading-relaxed mb-6">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Indicator */}
      {posts.length > 1 && (
        <div className="flex justify-center mt-4">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
              aria-label={`Go to post ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
