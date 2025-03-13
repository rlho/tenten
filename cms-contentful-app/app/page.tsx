import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import Link from "next/link";
// Note: Using regular img tags instead of Next.js Image component

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);

  return (
    <div className="min-h-screen bg-white">
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with email and subscribe */}
        <div className="flex justify-end items-center py-4 space-x-3">
          <button className="bg-white rounded-full p-2 border border-gray-300 hover:bg-gray-100 transition-colors">
            <img src="/vector-2.svg" alt="Email" className="w-6 h-6" />
          </button>
          <button className="bg-black text-white rounded-full px-6 py-2 text-sm font-bold hover:bg-gray-800 transition-colors">
            SUBSCRIBE
          </button>
        </div>

        {/* Logo section */}
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-3">TEN TEN TEN</h1>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
              <span>ESTABLISHED 2023</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span>VOLUME 1, ISSUE 1</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span>NEXT.JS EDITION</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="grid grid-cols-3 gap-0 mt-6 border-t border-b border-gray-200">
          <div className="bg-black text-white flex items-center justify-center p-5 h-16">
            <h2 className="text-xl font-bold tracking-wide">TEN TEN TEN</h2>
          </div>
          <div className="bg-black text-white flex items-center justify-center p-5 h-16">
            <h2 className="text-xl font-bold tracking-wide">SUBMISSIONS</h2>
          </div>
          <div className="bg-black text-white flex items-center justify-center p-5 h-16">
            <h2 className="text-xl font-bold tracking-wide">SHOP</h2>
          </div>
        </div>

        {/* Featured content section */}
        <div className="relative w-full overflow-hidden mt-6">
          <div className="w-full h-[550px] bg-gray-100 relative">
            {/* Using a background color as fallback for the image */}
            <div className="w-full h-full bg-gray-200"></div>
            
            {/* News/Sample text area */}
            <div className="w-1/3 text-right p-6 bg-white/90 rounded shadow-md absolute top-1/2 right-16 transform -translate-y-1/2">
              <h2 className="text-2xl font-bold mb-3">News</h2>
              <p className="text-sm leading-relaxed">
                Sample sample samplesample sample samplesample sample
                samplesamplesample sample samplesample sample samplesample
                sample samplesample sample samplesample sample sample
              </p>
            </div>

            {/* Donation piggy bank */}
            <div className="absolute top-1/2 left-16 transform -translate-y-1/2 bg-black/80 p-5 rounded shadow-md text-center">
              <div className="w-32 h-32 mx-auto flex items-center justify-center">
                {/* Placeholder for the donation image */}
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-white font-bold mt-2 block">DONATION</span>
            </div>
          </div>
        </div>

        {/* Middle content section */}
        <div className="grid grid-cols-3 gap-0 border-b border-gray-200">
          {/* Left column - Clothing image */}
          <div className="h-64 overflow-hidden border-r border-gray-200">
            <div className="h-full bg-gray-200 flex items-center justify-center">
              {/* Placeholder for the clothing image */}
              <p className="text-gray-500 font-medium">Clothing Submissions</p>
            </div>
          </div>

          {/* Middle column - Kawaii Fashion Challenge */}
          <div className="h-64 overflow-hidden relative border-r border-gray-200">
            <div className="h-full bg-gray-100 flex items-center justify-center">
              {/* Placeholder for the fashion image */}
              <div className="absolute top-6 left-0 w-full text-center">
                <h3 className="text-xl font-bold text-pink-500 bg-white/80 py-1 px-4 inline-block">
                  KAWAII FASHION CHALLENGE
                </h3>
              </div>
            </div>
          </div>

          {/* Right column - About Us */}
          <div className="h-64 overflow-hidden bg-gray-50 p-6">
            <h3 className="text-xl font-bold mb-3">ABOUT US</h3>
            <p className="text-sm leading-relaxed">
              TEN TEN TEN is a non-profit dedicated to creating meaningful
              spaces that explore identity, connect health and art to
              community, and promote creativity and discourse.
            </p>
            <div className="my-3 border-t border-gray-300"></div>
            <h4 className="font-bold mb-2">Blog Archive</h4>

            {/* Artist section */}
            <div className="mt-3 flex items-center justify-between">
              <div className="w-20 h-20 bg-gray-300 rounded"></div>
              <h3 className="text-xl font-bold">Artist</h3>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="mt-12 mb-16 px-4">
          <div className="flex justify-between items-start">
            {/* Social media links */}
            <div className="flex flex-col space-y-3">
              <div className="w-10 h-10 rounded-full bg-pink-500 cursor-pointer hover:bg-pink-600 transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"></div>
              <div className="w-32 h-32 bg-yellow-300 flex flex-col items-center justify-center mt-3 shadow-md hover:bg-yellow-400 transition-colors cursor-pointer">
                <h3 className="font-bold text-lg">CONTACT</h3>
                <h3 className="font-bold text-lg">US</h3>
              </div>
            </div>

            {/* Magazine covers */}
            <div className="flex -space-x-6">
              <div className="w-36 h-52 border-2 border-white shadow-lg bg-gray-200 relative z-30">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div className="w-36 h-52 border-2 border-white shadow-lg bg-gray-200 relative z-20">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div className="w-36 h-52 border-2 border-white shadow-lg bg-gray-200 relative z-10">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
            </div>

            {/* Featured image thumbnail */}
            <div className="border-4 border-gray-200 p-1 shadow-md">
              <div className="w-48 h-32 relative bg-gray-200">
                <div className="absolute top-1 right-1 text-xs bg-white/80 px-1 py-0.5 rounded">Updated date</div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <h3 className="text-xs font-bold bg-white/80 px-2 py-0.5 rounded">TEN TEN</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Partner logos */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
