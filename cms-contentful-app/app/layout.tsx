import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: `TEN TEN Newspaper`,
  description: `TEN TEN NYC - A vintage newspaper style website`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <footer className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Social media links - updated to Instagram, Facebook, WhatsApp, YouTube */}
        <div className="col-span-1 relative">
          <div className="flex flex-col z-20 justify-center content-between relative">
            <div className="absolute top-0 left-10 transform -translate-x-1/2 space-y-4 flex flex-col justify-between my-10 hidden md:flex">
              {/* Instagram */}
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                <a href="https://www.instagram.com/tenten.nyc/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
              {/* Facebook */}
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <a href="https://www.facebook.com/tenten.nyc/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
              {/* WhatsApp */}
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <a href="https://wa.me/message/YOCG6Z6IUGOJJ1" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
              {/* YouTube */}
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <a
                  href="https://www.youtube.com/channel/UCiWDyuE_W6eeTrda1u0ISHQ"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* モバイル用SNSアイコン */}
            <div className="flex justify-center items-center space-x-2 md:hidden mb-4">
              {/* Instagram */}
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                <a href="https://www.instagram.com/tenten.nyc/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
              {/* Facebook */}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <a href="https://www.instagram.com/tenten.nyc/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
              {/* WhatsApp */}
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <a href="https://wa.me/message/YOCG6Z6IUGOJJ1" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
              {/* YouTube */}
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <a
                  href="https://www.youtube.com/channel/UCiWDyuE_W6eeTrda1u0ISHQ"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <a href="mailto:info@tenten.nyc" title="Contact Us">
                <img
                  src="/contact.png"
                  alt="contact image"
                  className="w-full md:w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Magazine covers */}
        <div className="col-span-1 flex justify-center items-center m-4 md:m-8">
          <a href="/books" target="_blank">
            <img
              src="/magazines.png"
              alt="Magazine cover 1"
              className="w-full h-auto object-cover"
            />
          </a>
        </div>

        {/* Digital Gallery */}
        <div className="col-span-1 p-4 flex justify-center items-center">
          <a href="/tv" className="block w-full">
            <div className="border-4 border-gray-800 p-2 bg-gray-900 rounded hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="relative bg-gray-200 h-48 flex items-center justify-center">
                <img
                  src="/digital_gallery.png"
                  alt="Digital Gallery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold bg-black/50 text-white px-4 py-2">
                    Digital Gallery
                  </h2>
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                  <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Sponsor logos */}
      <div className="p-4 overflow-x-auto">
        <div className="flex justify-start md:justify-center items-center space-x-4 md:space-x-6 min-w-max">
          <img
            src="/sponsors/clip-path-group-16.png"
            alt="Sponsor 1"
            className="h-10 md:h-20 w-auto"
          />
          <img
            src="/sponsors/clip-path-group-17.png"
            alt="Sponsor 2"
            className="h-10 md:h-20 w-auto"
          />
          <img
            src="/sponsors/clip-path-group-18.png"
            alt="Sponsor 3"
            className="h-10 md:h-20 w-auto"
          />
          <img
            src="/sponsors/clip-path-group-19.png"
            alt="Sponsor 4"
            className="h-10 md:h-20 w-auto"
          />
          <img
            src="/sponsors/clip-path-group-20.png"
            alt="Sponsor 5"
            className="h-10 md:h-20 w-auto"
          />
          <img
            src="/sponsors/dokidoki.png"
            alt="Sponsor 6"
            className="h-10 md:h-20 w-auto"
          />
          <img
            src="/sponsors/sponsors1.png"
            alt="Sponsor 7"
            className="h-10 md:h-20 w-auto"
          />
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
        {/* 全てのページで固定表示されるロゴ */}
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 w-full pointer-events-none">
          <a href="/" className="pointer-events-auto">
            <img
              src="/logo.png"
              alt="TEN TEN"
              className="h-28 sm:h-36 md:h-36 mx-auto"
            />
          </a>
        </div>

        <section className="max-w-6xl mx-auto min-h-screen">
          {/* 共通ヘッダー部分 */}
          <header className="text-center border-b-2 border-[#222]">
            {/* Top black bar with date and weather */}
            <div className="bg-black text-white bg-[#222] p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-center relative z-10 border-t border-b border-gray-700">
              <div className="flex flex-col justify-start items-center sm:items-start text-xs border-t border-b border-[#222] py-1 w-full sm:w-auto">
                <div>VOL. 172 - NO. 59</div>
                <div>TOKYO, FRIDAY, JULY 21, 2023</div>
                <div>Sunny 70°F</div>
                <div>PRICE: FREE</div>
              </div>

              {/* Email and subscribe buttons */}
              <a
                href="https://mailchi.mp/f26243da7ffe/ten-ten-nyc"
                target="_blank"
                className="w-24 md:w-32 mt-2 sm:mt-0"
              >
                <img src="/subscribe.png" alt="Subscribe" className="w-full" />
              </a>
            </div>
            {/* ロゴは上部で固定表示済み */}
          </header>

          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
