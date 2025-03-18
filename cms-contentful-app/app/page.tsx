import { getAllPosts } from "@/lib/api";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { draftMode } from "next/headers";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);

  // Get the first post for the news section
  const latestPost = allPosts && allPosts.length > 0 ? allPosts[0] : null;

  // デバッグ用にContentfulから取得したデータをログに出力
  console.log("Latest post content structure:", latestPost?.content);

  // Get more posts for additional sections
  const morePosts = allPosts && allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-[#e6ddc6] text-[#222] p-5">
      {/* Donation piggy bank with money overlay - fixed on left side when scrolling */}
      <div className="fixed left-80 top-2/3 z-40">
        <a
          target="_blank"
          href="https://www.paypal.com/donate/?hosted_button_id=R5RAWLKU3U9XL"
        >
          <div className="relative">
            <img
              src="/donation.png"
              alt="Money"
              className="w-64 h-auto object-contain"
            />
            <img
              src="/clip-path-group-8.png"
              alt="Donation piggy bank"
              className="w-48 h-48 object-contain absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <span className="absolute bottom-8 left-1/2 top-1/4 transform -translate-x-1/2 text-white font-bold">
              donation
            </span>
          </div>
        </a>
      </div>
      <div className=" ">
        {/* Newspaper Header */}
        <header className="text-center border-b-2 border-[#222]">
          {/* Top black bar with date and weather */}
          <div className="bg-black text-white bg-[#222] p-3 my-1 flex justify-between items-center relative z-20">
            <div className="flex flex-col justify-start items-start text-xs border-t border-b border-[#222] py-1">
              <div>VOL. 172 - NO. 59</div>
              <div>TOKYO, FRIDAY, JULY 21, 2023</div>
              <div>Sunny 70°F</div>
              <div>PRICE: FREE</div>
            </div>

            {/* Email and subscribe buttons */}
            <a
              href="https://mailchi.mp/f26243da7ffe/ten-ten-nyc"
              target="_blank"
              className="w-32"
            >
              <img src="/subscribe.svg" alt="Subscribe" className="w-full" />
            </a>
          </div>
          {/* Logo - fixed when scrolling */}
          <div className="fixed top-1 left-0 right-0 flex justify-center my-2 z-50">
            <img src="/logo.png" alt="TEN TEN" className="h-36" />
          </div>
        </header>

        {/* Main Headline */}
        <div className="my-8 mb-6">
          <h2 className="text-5xl font-bold text-center mb-6">
            {latestPost ? latestPost.title : "YOUR HEADLINE HERE"}
          </h2>

          {/* Main Image */}
          <div className="border border-[#222] p-1 mb-4">
            {latestPost && latestPost.coverImage ? (
              <img
                src={latestPost.coverImage.url}
                alt={latestPost.title || "Featured image"}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] bg-[#222] text-[#e6ddc6] flex items-center justify-center">
                Your Image Here
              </div>
            )}
          </div>

          {/* Main Article Text - Rich Text Content */}
          <div className="text-sm leading-relaxed mb-6">
            {latestPost ? (
              (() => {
                // Check if content exists
                if (!latestPost.content) {
                  return <p>No content available</p>;
                }

                try {
                  // Contentfulの GraphQL APIから取得したリッチテキスト形式
                  if (latestPost.content.json) {
                    // リッチテキスト内の画像アセットを処理するための設定
                    const options: Options = {
                      renderNode: {
                        [BLOCKS.PARAGRAPH]: (node, children) => (
                          <p className="mb-4">{children}</p>
                        ),
                        [BLOCKS.HEADING_1]: (node, children) => (
                          <h1 className="text-3xl font-bold mb-4">
                            {children}
                          </h1>
                        ),
                        [BLOCKS.HEADING_2]: (node, children) => (
                          <h2 className="text-2xl font-bold mb-3">
                            {children}
                          </h2>
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
                          const asset =
                            latestPost.content.links?.assets?.block?.find(
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

                    return documentToReactComponents(
                      latestPost.content.json,
                      options
                    );
                  }

                  // 他の形式のチェック
                  if (typeof latestPost.content === "string") {
                    return <p>{latestPost.content}</p>;
                  }

                  if (
                    latestPost.content &&
                    typeof latestPost.content === "object" &&
                    latestPost.content.nodeType === "document" &&
                    Array.isArray(latestPost.content.content)
                  ) {
                    return documentToReactComponents(
                      latestPost.content as Document,
                      {
                        renderNode: {
                          [BLOCKS.PARAGRAPH]: (node, children) => (
                            <p className="mb-4">{children}</p>
                          ),
                          [BLOCKS.HEADING_1]: (node, children) => (
                            <h1 className="text-3xl font-bold mb-4">
                              {children}
                            </h1>
                          ),
                          [BLOCKS.HEADING_2]: (node, children) => (
                            <h2 className="text-2xl font-bold mb-3">
                              {children}
                            </h2>
                          ),
                          [BLOCKS.HEADING_3]: (node, children) => (
                            <h3 className="text-xl font-bold mb-2">
                              {children}
                            </h3>
                          ),
                          [BLOCKS.UL_LIST]: (node, children) => (
                            <ul className="list-disc pl-5 mb-4">{children}</ul>
                          ),
                          [BLOCKS.OL_LIST]: (node, children) => (
                            <ol className="list-decimal pl-5 mb-4">
                              {children}
                            </ol>
                          ),
                          [BLOCKS.LIST_ITEM]: (node, children) => (
                            <li className="mb-1">{children}</li>
                          ),
                        },
                      }
                    );
                  }

                  // デバッグ情報を表示
                  console.error(
                    "Content structure:",
                    JSON.stringify(latestPost.content, null, 2)
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
              })()
            ) : (
              <p>Your text goes here</p>
            )}
          </div>
        </div>

        {/* EXTRA! Section */}
        <div className="border-t-2 border-[#222] pt-4">
          <div className="flex justify-between">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div className="min-w-80  text-[#e6ddc6] px-3 mb-4">
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {/* Left column - Vertical navigation with black labels */}
                    <div className="text-white">
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-2xl font-bold tracking-wider">
                          TEN TEN TEN
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-2xl font-bold tracking-wider">
                          SUBMITTIONS
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-2xl font-bold tracking-wider">
                          BLOG
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-2xl font-bold tracking-wider">
                          ARCHIVE
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <a href="/gallery">
                          <h2 className="text-2xl font-bold tracking-wider">
                            ART GALLERY
                          </h2>
                        </a>
                      </div>
                    </div>
                  </h3>
                </div>
                {/* Middle Column */}
                <div className="w-96 mx-4 flex flex-col items-center ">
                  <h1 className="text-7xl font-bold mb-4 ">ABOUT US</h1>
                  <p className="text-md leading-relaxed mb-3">
                    TEN TEN NYC is a 501(c)(3) arts nonprofit dedicated to
                    creating meaningful spaces that explore identity, mental
                    health, and the human experience through art and dialogue.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="p-1 flex flex-col justify-center items-center">
                  <div className="flex items-center justify-center">
                    <h2 className="text-7xl font-bold tracking-wider">SHOP</h2>
                  </div>
                  <img
                    src="/clip-path-group-9.png"
                    alt="Shop"
                    className="border border-[#222] w-56"
                  />
                </div>
                {/* Kawaii Fashion Challenge */}
                <div className="w-50 h-auto">
                  <img
                    src="/clip-path-group-11.png"
                    alt="Kawaii Fashion"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}

            <div className="">
              {/* Artist section */}
              <div className="bg-[#ece5d4] flex flex-col items-center w-100 p-2">
                <div className="">
                  <img
                    src="/clip-path-group-12.png"
                    alt="Colorful artwork"
                    className="w-full"
                  />
                </div>
                <h1 className="text-7xl font-bold">Artist</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6 mt-6 border-t-2 border-[#222] pt-4"></div>
      </div>
    </div>
  );
}
