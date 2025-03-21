"use client";

import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { useState } from "react";

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

export default function PostSlider({ posts }: PostSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              // アセットIDを取得
              const assetId = node.data.target.sys.id;

              // リンクされたアセットを検索
              const asset = currentPost.content.links?.assets?.block?.find(
                (asset: any) => asset.sys.id === assetId
              );

              if (asset) {
                return (
                  <div className="my-4">
                    <img
                      src={asset.url}
                      alt={asset.description || ""}
                      className="w-full h-auto border border-[#222] p-1"
                    />
                    {asset.description && (
                      <p className="text-xs text-center mt-1">
                        {asset.description}
                      </p>
                    )}
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

        {/* Main Image */}
        <div className="border border-[#222] p-1 mb-4">
          {currentPost.coverImage ? (
            <img
              src={currentPost.coverImage.url}
              alt={currentPost.title || "Featured image"}
              className="w-full h-[200px] md:h-[400px] object-cover"
            />
          ) : (
            <div className="w-full h-[200px] md:h-[400px] bg-[#222] text-[#e6ddc6] flex items-center justify-center">
              Your Image Here
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="text-sm leading-relaxed mb-6">{renderContent()}</div>
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
