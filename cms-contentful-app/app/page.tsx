import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import PostSlider from "./post-slider";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);

  // デバッグ用にContentfulから取得したデータをログに出力
  if (allPosts && allPosts.length > 0) {
    console.log("Latest post content structure:", allPosts[0]?.content);
  }

  return (
    <div className="min-h-screen bg-[#e6ddc6] text-[#222] p-5">
      {/* Donation piggy bank with money overlay - fixed on left side when scrolling */}
      <div className="fixed left-[8%] top-2/3 z-40 lg:block hidden">
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

      {/* モバイル用の寄付リンク - 小さいサイズ */}
      <div className="fixed right-4 bottom-4 z-40 lg:hidden block">
        <a
          target="_blank"
          href="https://www.paypal.com/donate/?hosted_button_id=R5RAWLKU3U9XL"
        >
          <div className="relative">
            <img
              src="/donation.png"
              alt="Money"
              className="w-24 h-auto object-contain"
            />
            <img
              src="/clip-path-group-8.png"
              alt="Donation piggy bank"
              className="w-16 h-16 object-contain absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <span className="absolute bottom-4 left-1/2 top-1/4 transform -translate-x-1/2 text-white font-bold text-xs">
              donation
            </span>
          </div>
        </a>
      </div>

      <div className="">
        {/* Post Slider */}
        <PostSlider posts={allPosts || []} />

        {/* EXTRA! Section */}
        <div className="border-t-2 border-[#222] pt-4">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left Column */}
            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:min-w-80 text-[#e6ddc6] px-3 mb-4">
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {/* Left column - Vertical navigation with black labels */}
                    <div className="text-white">
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-xl md:text-2xl font-bold tracking-wider">
                          TEN TEN TEN
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-xl md:text-2xl font-bold tracking-wider">
                          SUBMITTIONS
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-xl md:text-2xl font-bold tracking-wider">
                          BLOG
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <h2 className="text-xl md:text-2xl font-bold tracking-wider">
                          ARCHIVE
                        </h2>
                      </div>
                      <div className="bg-[#222] p-3 my-1 flex items-center justify-center border-b border-gray-700">
                        <a href="/gallery">
                          <h2 className="text-xl md:text-2xl font-bold tracking-wider">
                            ART GALLERY
                          </h2>
                        </a>
                      </div>
                    </div>
                  </h3>
                </div>
                {/* Middle Column - ABOUT US */}
                <div className="w-full md:w-96 mx-auto md:mx-4 flex flex-col items-center mb-6">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
                    ABOUT US
                  </h1>
                  <p className="text-md leading-relaxed mb-3 px-4 md:px-0">
                    TEN TEN NYC is a 501(c)(3) arts nonprofit dedicated to
                    creating meaningful spaces that explore identity, mental
                    health, and the human experience through art and dialogue.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="p-1 flex flex-col justify-center items-center mb-6 md:mb-0">
                  <a href="https://tenten.nyc/shop-1" target="_blank">
                    <div className="flex items-center justify-center">
                      <h2 className="text-5xl md:text-7xl font-bold tracking-wider">
                        SHOP
                      </h2>
                    </div>
                    <img
                      src="/clip-path-group-9.png"
                      alt="Shop"
                      className="border border-[#222] w-56"
                    />
                  </a>
                </div>
                {/* Kawaii Fashion Challenge */}
                <div className="w-full md:w-50 h-auto mb-6 md:mb-0">
                  <img
                    src="/clip-path-group-11.png"
                    alt="Kawaii Fashion"
                    className="w-full h-auto max-w-xs md:max-w-full mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-auto mb-6 md:mb-0">
              {/* Artist section */}
              <div className="bg-[#ece5d4] flex flex-col items-center w-full p-2">
                <div className="">
                  <img
                    src="/clip-path-group-12.png"
                    alt="Colorful artwork"
                    className="w-full"
                  />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold">Artist</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t-2 border-[#222] pt-4"></div>
      </div>
    </div>
  );
}
