import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function LayoutPage() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  
  // Get the first post for the news section
  const latestPost = allPosts && allPosts.length > 0 ? allPosts[0] : null;
  
  // Get more posts for additional sections
  const morePosts = allPosts && allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-[#e6ddc6] text-[#222] font-serif p-5">
      <div className="max-w-6xl mx-auto border border-[#222] p-4">
        {/* Navigation */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-blue-800 underline">
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Layout Branch Design</h1>
          <div className="flex space-x-4">
            <Link href="/component" className="text-blue-800 underline">
              View Components
            </Link>
            <Link href="/layout1" className="text-blue-800 underline">
              View Layout1 Design
            </Link>
          </div>
        </div>

        {/* Newspaper Header */}
        <header className="text-center border-b-2 border-[#222] pb-2">
          <div className="flex justify-between text-xs mb-1">
            <div>TEN TEN NYC</div>
            <div>TOKYO, NEW YORK</div>
          </div>
          
          <h1 className="text-6xl font-bold my-4 tracking-wide">TEN TEN</h1>
          
          <div className="flex justify-between text-xs border-t border-b border-[#222] py-1">
            <div>VOL. 172 - NO. 59</div>
            <div>TOKYO, FRIDAY, JULY 21, 2023 - 8 PAGES IN 4 SECTION</div>
            <div>PRICE: 10 CENT</div>
          </div>
        </header>
        
        {/* Main Headline */}
        <div className="mt-8 mb-6">
          <h2 className="text-5xl font-bold text-center mb-2">
            {latestPost ? latestPost.title : "YOUR HEADLINE HERE"}
          </h2>
          <h3 className="text-2xl text-center font-normal mb-6">
            {latestPost ? latestPost.excerpt : "Short note goes here"}
          </h3>
          
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
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>
        </div>
        
        {/* EXTRA! Section */}
        <div className="border-t-2 border-[#222] pt-4">
          <h2 className="text-4xl font-bold mb-4">EXTRA! EXTRA!</h2>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-1">
              <div className="border border-[#222] p-1 mb-3">
                <img 
                  src="/clip-path-group-8.png" 
                  alt="Donation" 
                  className="w-full h-[150px] object-cover"
                />
              </div>
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
            
            {/* Middle Column */}
            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-2">TEN TEN TEN</h3>
              <p className="text-xs leading-relaxed mb-3">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.
              </p>
            </div>
            
            {/* Right Column */}
            <div className="col-span-1">
              <div className="bg-[#222] text-[#e6ddc6] p-3 mb-4">
                <h3 className="text-lg font-bold mb-2 text-center">IMPORTANT INFORMATION</h3>
                <p className="text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
              
              <div className="border border-[#222] p-1 mb-3">
                <img 
                  src="/clip-path-group-9.png" 
                  alt="Shop" 
                  className="w-full h-[100px] object-cover"
                />
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
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>
          </div>
          
          {/* Right Column */}
          <div className="col-span-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="text-sm font-bold mb-1">SUBMITTIONS</h4>
                <p className="text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.
                </p>
              </div>
              <div className="col-span-1">
                <h4 className="text-sm font-bold mb-1">SHOP</h4>
                <p className="text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
