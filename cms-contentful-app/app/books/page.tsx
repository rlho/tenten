import GalleryWall from "@/app/components/gallery-wall";
import { getBooks } from "@/lib/contentful";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books | TENTEN",
  description: "TENTENの本のギャラリー",
};

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Books</h1>
        <GalleryWall items={books} title="Books" showName={false} />
      </div>
    </div>
  );
}
