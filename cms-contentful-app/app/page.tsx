import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  
  // Get the first post for the news section
  const latestPost = allPosts && allPosts.length > 0 ? allPosts[0] : null;

  return (
    <div className="min-h-screen bg-[#f5f0e5]">
      {/* Main container */}
      <div className="relative">
        {/* Main content area with border and background color */}
        <div className="relative border-8 border-gray-300 bg-[#f5f0e5] mx-4 mt-12">
          {/* Top black bar with date and weather */}
          <div className="bg-black text-white p-2 flex justify-between items-center">
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
          
          {/* Sticky TEN TEN logo - positioned to overlap with the main content */}
          <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2">
            <img src="/logo.png" alt="TEN TEN" className="h-24 z-50" />
          </div>
          
          {/* Content area */}
          <div className="w-full relative p-6 h-[500px]">
            {/* Use the first post's cover image as the background */}
            {latestPost && latestPost.coverImage && (
              <img 
                src={latestPost.coverImage.url} 
                alt={latestPost.title || "Featured image"} 
                className="w-full h-full object-cover absolute inset-0"
              />
            )}
            
            {/* News section - no white background */}
            <div className="absolute bottom-12 right-8 w-1/3 text-right">
              <h2 className="text-2xl font-bold mb-2 text-black bg-white/80 p-2 inline-block">News</h2>
              <p className="text-sm leading-relaxed text-black bg-white/80 p-2">
                {latestPost ? latestPost.excerpt : "Sample sample samplesample sample samplesample sample samplesample"}
              </p>
            </div>

            {/* Donation piggy bank with money overlay - positioned to match reference */}
            <div className="absolute bottom-0 left-8 transform translate-y-1/4">
              <div className="relative">
                <img 
                  src="/donation.png" 
                  alt="Money" 
                  className="w-64 h-auto object-contain"
                />
                <img 
                  src="/clip-path-group-8.png" 
                  alt="Donation piggy bank" 
                  className="w-48 h-48 object-contain absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white font-bold">donation</span>
              </div>
            </div>
          </div>
          
          {/* New layout with vertical navigation and side-by-side sections */}
          <div className="flex">
            {/* Left column - Vertical navigation */}
            <div className="w-1/4 bg-black text-white">
              <div className="p-4 flex items-center justify-center border-b border-gray-700">
                <h2 className="text-xl font-bold">TEN TEN TEN</h2>
              </div>
              <div className="p-4 flex items-center justify-center border-b border-gray-700">
                <h2 className="text-xl font-bold">SUBMITTIONS</h2>
              </div>
              <div className="p-4 flex items-center justify-center">
                <h2 className="text-xl font-bold">SHOP</h2>
              </div>
            </div>
            
            {/* Right columns - About Us and Artists side by side */}
            <div className="w-3/4 flex">
              {/* About Us section */}
              <div className="w-1/2 bg-[#f5f0e5] p-6">
                <h3 className="text-xl font-bold mb-3">ABOUT US</h3>
                <p className="text-sm leading-relaxed">
                  TEN TEN NYC is a 501(c)(3) arts nonprofit dedicated to creating meaningful
                  spaces that explore identity, mental health, and the human experience through
                  art and dialogue.
                </p>
                <div className="my-3 border-t border-gray-300"></div>
                <h4 className="font-bold mb-2">Blog Archive</h4>
              </div>
              
              {/* Artists section - extends downward */}
              <div className="w-1/2 relative">
                <div className="h-64 bg-[#f5f0e5] p-6">
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
          
          {/* Bottom section with SHOP and Kawaii Fashion Challenge side by side */}
          <div className="flex">
            {/* Left section - SHOP and Kawaii Fashion Challenge */}
            <div className="w-3/4 flex">
              {/* SHOP image */}
              <div className="w-1/2 h-64 overflow-hidden relative">
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
              <div className="w-1/2 h-64 overflow-hidden relative">
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
            
            {/* Right section - continuation of Artists section */}
            <div className="w-1/4 bg-[#f5f0e5] p-6">
              <div className="h-full flex items-center justify-center">
                <img 
                  src="/clip-path-group-12.png" 
                  alt="More artist work" 
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Footer is now in layout.tsx */}
        </div>
      </div>
    </div>
  );
}
