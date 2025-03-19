"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DetailedSubmitPage() {
  const router = useRouter();
  const [artistName, setArtistName] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [existingArtist, setExistingArtist] = useState(false);
  const [artists, setArtists] = useState<any[]>([]);
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);

  // Fetch artists on component mount
  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch('/api/artists');
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        setArtists(data.artists || []);
      } catch (err) {
        console.error('Error fetching artists:', err);
      } finally {
        setIsLoadingArtists(false);
      }
    }

    fetchArtists();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArtistName = e.target.value;
    setArtistName(selectedArtistName);
    
    if (selectedArtistName === "new") {
      setExistingArtist(false);
      setArtistName("");
      setArtistBio("");
    } else {
      setExistingArtist(true);
      // Find the selected artist to get their bio
      const selectedArtist = artists.find(artist => artist.name === selectedArtistName);
      if (selectedArtist) {
        setArtistBio(selectedArtist.bio || "");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((!existingArtist && !artistName) || !title || !image) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // If creating a new artist
      if (!existingArtist) {
        formData.append("createNewArtist", "true");
        formData.append("artistName", artistName);
        formData.append("artistBio", artistBio);
      } else {
        formData.append("createNewArtist", "false");
        formData.append("artistName", artistName);
      }
      
      formData.append("title", title);
      formData.append("description", description);
      formData.append("medium", medium);
      formData.append("year", year);
      formData.append("dimensions", dimensions);
      formData.append("image", image);

      const response = await fetch("/api/submit-artwork", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit artwork");
      }

      setSuccess(true);

      // Reset form after successful submission
      setArtistName("");
      setArtistBio("");
      setExistingArtist(false);
      settitle("");
      setDescription("");
      setMedium("");
      setYear("");
      setDimensions("");
      setImage(null);
      setImagePreview(null);

      // Redirect to gallery after a short delay
      setTimeout(() => {
        router.push("/gallery");
      }, 2000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Detailed Artwork Submission</h1>
        <p className="text-lg">
          Share your art with the TEN TEN community with detailed information
        </p>
        <div className="mt-4">
          <Link
            href="/gallery/submit/simple"
            className="text-blue-600 hover:underline"
          >
            Prefer a simpler form? Use our basic submission form
          </Link>
        </div>
      </div>

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>
            Your artwork has been submitted successfully! Redirecting to
            gallery...
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="artistSelect"
                className="block text-gray-700 font-bold mb-2"
              >
                Artist *
              </label>
              {isLoadingArtists ? (
                <div className="animate-pulse bg-gray-200 h-10 rounded"></div>
              ) : (
                <select
                  id="artistSelect"
                  value={existingArtist ? artistName : "new"}
                  onChange={handleArtistChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="new">-- Create New Artist --</option>
                  {artists.map((artist) => (
                    <option key={artist.sys?.id || artist.name} value={artist.name}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {!existingArtist && (
              <>
                <div>
                  <label
                    htmlFor="artistName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Artist Name *
                  </label>
                  <input
                    type="text"
                    id="artistName"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="artistBio"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Artist Bio
                  </label>
                  <textarea
                    id="artistBio"
                    value={artistBio}
                    onChange={(e) => setArtistBio(e.target.value)}
                    rows={3}
                    placeholder="Tell us about the artist..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Artwork Name *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label
                htmlFor="medium"
                className="block text-gray-700 font-bold mb-2"
              >
                Medium
              </label>
              <input
                type="text"
                id="medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="e.g., Oil on canvas, Digital, Photography"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-gray-700 font-bold mb-2"
              >
                Year Created
              </label>
              <input
                type="text"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2023"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label
                htmlFor="dimensions"
                className="block text-gray-700 font-bold mb-2"
              >
                Dimensions
              </label>
              <input
                type="text"
                id="dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g., 24 x 36 inches"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Artwork Image *
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tell us about your artwork..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          {imagePreview && (
            <div className="mt-6">
              <p className="text-gray-700 font-bold mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-auto max-h-64 border"
              />
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Artwork"}
            </button>
            <Link href="/gallery" className="text-blue-600 hover:underline">
              Back to Gallery
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
