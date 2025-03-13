import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

export const Wireframe = (): JSX.Element => {
  // Data for the main sections
  const mainSections = [
    { id: 1, title: "TEN TEN TEN", type: "header" },
    { id: 2, title: "SUBMISSIONS", type: "nav" },
    { id: 3, title: "SHOP", type: "nav" },
  ];

  // Data for the social media links
  const socialLinks = [
    { id: 1, name: "Instagram", color: "bg-pink-500" },
    { id: 2, name: "Facebook", color: "bg-blue-500" },
    { id: 3, name: "WhatsApp", color: "bg-green-500" },
    { id: 4, name: "YouTube", color: "bg-red-500" },
  ];

  // Data for partner logos
  const partnerLogos = [
    { id: 1, alt: "Ideal Studios" },
    { id: 2, alt: "Cat Logo" },
    { id: 3, alt: "Blue Circle" },
    { id: 4, alt: "Black Logo" },
    { id: 5, alt: "Pink Logo" },
    { id: 6, alt: "Tannery" },
    { id: 7, alt: "Colorful Logo" },
  ];

  return (
    <main className="flex flex-col items-center relative bg-white">
      <section className="relative w-full max-w-[1440px] overflow-hidden">
        {/* Main content area */}
        <div className="relative w-full bg-[url(vector.svg)] bg-cover">
          {/* Main featured image */}
          <div className="relative mx-auto max-w-[1440px]">
            <img
              className="w-full h-auto"
              alt="Featured interior"
              src="clip-path-group.png"
            />

            {/* Overlay elements */}
            <div className="absolute top-8 left-8 flex items-center">
              <span className="text-sm text-white">
                Updated date, weather mark
              </span>
            </div>

            {/* TEN TEN Logo */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
              <img
                className="h-16 w-auto"
                alt="TEN TEN Logo"
                src="clip-path-group-4.png"
              />
            </div>

            {/* Email and Subscribe buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="outline" className="bg-white rounded-full p-2">
                <img className="w-6 h-6" alt="Email" src="vector-2.svg" />
              </Button>
              <Button className="bg-black text-white rounded-full">
                SUBSCRIBE
              </Button>
            </div>

            {/* Donation piggy bank */}
            <div className="absolute top-1/2 left-16">
              <img
                className="w-32 h-32"
                alt="Donation piggy bank"
                src="clip-path-group-8.png"
              />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                donation
              </span>
            </div>

            {/* News/Sample text area */}
            <div className="absolute top-1/2 right-16 w-1/3 text-right">
              <h2 className="text-xl font-bold mb-2">News</h2>
              <p className="text-sm">
                Sample sample samplesample sample samplesample sample
                samplesamplesample sample samplesample sample samplesample
                sample samplesample sample samplesample sample sample
              </p>
            </div>
          </div>

          {/* Main navigation sections */}
          <div className="grid grid-cols-3 gap-0 mt-4">
            {mainSections.map((section) => (
              <Card
                key={section.id}
                className="rounded-none border-0 bg-black text-white"
              >
                <CardContent className="flex items-center justify-center p-4 h-16">
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Middle content section */}
          <div className="grid grid-cols-3 gap-0">
            {/* Left column - Clothing image */}
            <Card className="rounded-none border-0 h-48 overflow-hidden">
              <CardContent className="p-0 h-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Clothing submissions"
                  src="clip-path-group-9.png"
                />
              </CardContent>
            </Card>

            {/* Middle column - Kawaii Fashion Challenge */}
            <Card className="rounded-none border-0 h-48 overflow-hidden">
              <CardContent className="p-0 h-full relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Kawaii Fashion"
                  src="clip-path-group-11.png"
                />
                <div className="absolute top-4 left-0 w-full text-center">
                  <h3 className="text-xl font-bold text-pink-500">
                    KAWAII FASHION CHALLENGE
                  </h3>
                </div>
              </CardContent>
            </Card>

            {/* Right column - About Us */}
            <Card className="rounded-none border-0 h-48 overflow-hidden">
              <CardContent className="p-4 h-full bg-gray-100">
                <h3 className="text-xl font-bold mb-2">ABOUT US</h3>
                <p className="text-xs">
                  TEN TEN TEN is a non-profit dedicated to creating meaningful
                  spaces that explore identity, connect health and art to
                  community, and promote creativity and discourse.
                </p>
                <Separator className="my-2" />
                <h4 className="font-bold mb-1">Blog Archive</h4>

                {/* Artist section */}
                <div className="mt-2 flex items-center justify-between">
                  <img
                    className="w-24 h-24 object-cover"
                    alt="Colorful artwork"
                    src="clip-path-group-12.png"
                  />
                  <h3 className="text-xl font-bold">Artist</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="w-full mt-8">
        <div className="flex justify-between items-start max-w-[1440px] mx-auto">
          {/* Social media links */}
          <div className="flex flex-col space-y-2">
            {socialLinks.map((link) => (
              <div
                key={link.id}
                className={`w-8 h-8 rounded-full ${link.color}`}
              ></div>
            ))}
            <Card className="w-32 h-32 bg-yellow-300 flex flex-col items-center justify-center">
              <CardContent className="p-2 text-center">
                <h3 className="font-bold">CONTACT</h3>
                <h3 className="font-bold">US</h3>
              </CardContent>
            </Card>
          </div>

          {/* Magazine covers */}
          <div className="flex -space-x-4">
            <img
              className="w-32 h-48 object-cover border-2 border-white"
              alt="Magazine cover 1"
              src="clip-path-group-21.png"
            />
            <img
              className="w-32 h-48 object-cover border-2 border-white"
              alt="Magazine cover 2"
              src="clip-path-group-22.png"
            />
            <img
              className="w-32 h-48 object-cover border-2 border-white"
              alt="Magazine cover 3"
              src="clip-path-group-23.png"
            />
          </div>

          {/* Featured image thumbnail */}
          <div className="border-4 border-gray-200 p-1">
            <div className="relative">
              <img
                className="w-48 h-32 object-cover"
                alt="Featured interior thumbnail"
                src="clip-path-group.png"
              />
              <div className="absolute top-1 right-1 text-xs">Updated date</div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <img
                  className="h-6 w-auto"
                  alt="TEN TEN Logo small"
                  src="clip-path-group-4.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="flex justify-center items-center space-x-4 mt-4 max-w-[1440px] mx-auto">
          {partnerLogos.map((logo) => (
            <div
              key={logo.id}
              className="w-12 h-12 bg-gray-200 rounded-full"
            ></div>
          ))}
        </div>
      </section>
    </main>
  );
};
