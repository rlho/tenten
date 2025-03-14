import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function ComponentPage() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  
  // Get the first post for the news section
  const latestPost = allPosts && allPosts.length > 0 ? allPosts[0] : null;

  return (
    <div className="min-h-screen bg-[#e6ddc6] text-[#222] p-5">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <Link href="/" className="text-blue-800 underline">
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Component Branch Design</h1>
        <Link href="/layout" className="text-blue-800 underline">
          View Layout Design
        </Link>
      </div>

      <div className="max-w-6xl mx-auto border-8 border-[#5d4b35] p-2">
        <div className="border-2 border-[#5d4b35]">
          {/* Top black bar with date and weather */}
          <div className="bg-black text-white p-2 flex justify-between items-center relative z-20">
            <div>Updated date, weather mark</div>
            
            {/* Email and subscribe buttons */}
            <div className="flex items-center space-x-2">
              <button className="bg-white rounded-full p-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="bg-black text-white border border-white rounded-full px-4 py-1 text-sm font-bold">
                <img src="/subscribe.svg" alt="Subscribe" className="h-6" />
              </button>
            </div>
          </div>
          
          {/* Sticky TEN TEN logo - positioned to be on top and sticky when scrolling */}
          <div className="sticky top-0 left-0 right-0 flex justify-center z-30 -mt-10 mb-4">
            <img src="/logo.png" alt="TEN TEN" className="h-24" />
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-12 gap-0">
            {/* Left column - Vertical navigation with black labels */}
            <div className="col-span-3 bg-black text-white">
              <div className="p-8 flex items-center justify-center border-b border-gray-700">
                <h2 className="text-xl font-bold tracking-wider">TEN TEN TEN</h2>
              </div>
              <div className="p-8 flex items-center justify-center border-b border-gray-700">
                <h2 className="text-xl font-bold tracking-wider">SUBMITTIONS</h2>
              </div>
              <div className="p-8 flex items-center justify-center">
                <h2 className="text-xl font-bold tracking-wider">SHOP</h2>
              </div>
            </div>
            
            {/* Right column - Main content area with newspaper style */}
            <div className="col-span-9 relative">
              {/* Main image area with News */}
              <div className="relative h-[500px]">
                {latestPost && latestPost.coverImage ? (
                  <img 
                    src={latestPost.coverImage.url} 
                    alt={latestPost.title || "Featured image"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
                
                {/* Donation piggy bank with money overlay */}
                <div className="absolute bottom-0 left-8 transform translate-y-1/4">
                  <div className="relative">
                    <img 
                      src="/donation.png" 
                      alt="Money" 
                      className="w-64 h-auto object-contain"
                    />
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-white font-bold block mb-1">donation</span>
                      <img 
                        src="/clip-path-group-8.png" 
                        alt="Donation piggy bank" 
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* News section */}
                <div className="absolute bottom-12 right-8 w-1/3 text-right">
                  <h2 className="text-2xl font-bold mb-2 text-black">News</h2>
                  <p className="text-sm leading-relaxed text-black">
                    {latestPost ? latestPost.excerpt : "Sample sample samplesample sample samplesample sample samplesample"}
                  </p>
                </div>
              </div>
              
              {/* About Us and Artist sections */}
              <div className="grid grid-cols-2 border-t-2 border-[#5d4b35]">
                {/* About Us section */}
                <div className="p-6 border-r-2 border-[#5d4b35]">
                  <h3 className="text-xl font-bold mb-3">ABOUT US</h3>
                  <p className="text-sm leading-relaxed">
                    TEN TEN NYC is a 501(c)(3) arts nonprofit dedicated to creating meaningful
                    spaces that explore identity, mental health, and the human experience through
                    art and dialogue.
                  </p>
                  <div className="my-3 border-t border-gray-300"></div>
                  <h4 className="font-bold mb-2">Blog Archive</h4>
                </div>
                
                {/* Artist section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Artist</h3>
                  <div className="mt-3">
                    <img 
                      src="/clip-path-group-12.png" 
                      alt="Colorful artwork" 
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section with SHOP and Kawaii Fashion Challenge */}
          <div className="grid grid-cols-2 border-t-2 border-[#5d4b35]">
            {/* SHOP image */}
            <div className="h-64 overflow-hidden relative border-r-2 border-[#5d4b35]">
              <img 
                src="/clip-path-group-9.png" 
                alt="SHOP" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2">
                <h3 className="text-xl font-bold text-white text-center">SHOP</h3>
              </div>
            </div>
            
            {/* Kawaii Fashion Challenge */}
            <div className="h-64 overflow-hidden relative">
              <img 
                src="/clip-path-group-11.png" 
                alt="Kawaii Fashion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-0 w-full text-center">
                <h3 className="text-xl font-bold text-pink-500 bg-white/80 py-1 px-4 inline-block">
                  KAWAII FASHION CHALLENGE
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
