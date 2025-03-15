import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);

  // Get the first post for the news section
  const latestPost = allPosts && allPosts.length > 0 ? allPosts[0] : null;

  // Get more posts for additional sections
  const morePosts = allPosts && allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-[#e6ddc6] text-[#222] p-5">
      <div className="max-w-6xl mx-auto ">
        {/* Newspaper Header */}
        <header className="text-center border-b-2 border-[#222]">
          {/* Top black bar with date and weather */}
          <div className="bg-black text-white bg-[#222] p-3 my-1 flex justify-between items-center relative z-20">
            <div className="flex flex-col justify-start items-start text-xs border-t border-b border-[#222] py-1">
              <div>VOL. 172 - NO. 59</div>
              <div>TOKYO, FRIDAY, JULY 21, 2023</div>
              <div>PRICE: 10 CENT</div>
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

          <div className="absolute top-1 left-0 right-0 flex justify-center my-2">
            <img src="/logo.png" alt="TEN TEN" className="h-36 z-50" />
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

          {/* Main Article Text */}
          <p className="text-sm leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
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
        <div className="grid grid-cols-2 gap-6 mt-6 border-t-2 border-[#222] pt-4">
          {/* Left Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-2">RETRO BICYCLE</h3>
            <div className="flex items-center justify-center mb-2">
              <span className="text-lg">★</span>
              <span className="mx-2 text-sm font-bold">STAY HAPPY</span>
              <span className="text-lg">★</span>
            </div>
            <p className="text-xs leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>
          </div>

          {/* Right Column */}
          <div className="col-span-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="text-sm font-bold mb-1">SUBMITTIONS</h4>
                <p className="text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt.
                </p>
              </div>
              <div className="col-span-1">
                <h4 className="text-sm font-bold mb-1">SHOP</h4>
                <p className="text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
