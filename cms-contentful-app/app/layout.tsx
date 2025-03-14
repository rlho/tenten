import "./globals.css";
import { Inter } from "next/font/google";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import { CSSProperties } from "react";

export const metadata = {
  title: `TEN TEN`,
  description: `TEN TEN NYC - A vintage newspaper style website`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  // CSS for vintage paper texture
  const vintagePaperStyle: CSSProperties = {
    backgroundColor: '#e6ddc6',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d0c0a0' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <footer className="bg-[#e6ddc6]" style={vintagePaperStyle}>
      <div className="flex">
        {/* Social media links and Contact Us side by side */}
        <div className="w-1/6 flex">
          {/* Social media icons */}
          <div className="flex flex-col space-y-4 items-center py-4 px-2">
            {/* Instagram */}
            <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            {/* Facebook */}
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </div>
            {/* WhatsApp */}
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            {/* YouTube */}
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
          </div>
          
          {/* Contact Us box - next to social media icons */}
          <div className="flex items-center justify-center ml-4">
            <div className="w-32 h-32 bg-yellow-300 flex flex-col items-center justify-center">
              <h3 className="font-bold text-lg">CONTACT</h3>
              <h3 className="font-bold text-lg">US</h3>
            </div>
          </div>
        </div>
        
        {/* Magazine covers */}
        <div className="w-2/6 flex justify-center items-center">
          <div className="flex -space-x-6">
            <div className="w-32 h-48 border-2 border-white shadow-lg relative z-30">
              <img 
                src="/clip-path-group-21.png" 
                alt="Magazine cover 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-32 h-48 border-2 border-white shadow-lg relative z-20">
              <img 
                src="/clip-path-group-22.png" 
                alt="Magazine cover 2" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-32 h-48 border-2 border-white shadow-lg relative z-10">
              <img 
                src="/clip-path-group-23.png" 
                alt="Magazine cover 3" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Digital Gallery */}
        <div className="w-3/6 p-4">
          <div className="border-4 border-gray-800 p-2 bg-gray-900 rounded">
            <div className="relative bg-gray-200 h-48 flex items-center justify-center">
              <img 
                src="/digital_gallery.png" 
                alt="Digital Gallery" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl font-bold bg-black/50 text-white px-4 py-2">Digital Gallery</h2>
              </div>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                <div className="w-4 h-4 rounded-full bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sponsor logos */}
      <div className="p-4 border-t border-[#5d4b35]" style={vintagePaperStyle}>
        <div className="flex justify-center items-center space-x-6">
          <img src="/clip-path-group-16.png" alt="Sponsor 1" className="h-10 w-auto" />
          <img src="/clip-path-group-17.png" alt="Sponsor 2" className="h-10 w-auto" />
          <img src="/clip-path-group-18.png" alt="Sponsor 3" className="h-10 w-auto" />
          <img src="/clip-path-group-19.png" alt="Sponsor 4" className="h-10 w-auto" />
          <img src="/clip-path-group-20.png" alt="Sponsor 5" className="h-10 w-auto" />
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#e6ddc6]">
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
