import Image from "next/image";
import Navbar from "./Navbar"; // ✅ Import Navbar Here

const containerImages = [
  "/Images/Container/image1.png",
  "/Images/Container/image2.png",
  "/Images/Container/image3.png",
  "/Images/Container/image4.png",
];

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen  bg-[#141414] text-white">
      {/* Navbar - Overlays on Top */}
      <Navbar />

      {/* Top Shadow Effect */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10"></div>

      {/* Movie Containers */}
      <div className="relative w-full flex flex-col gap-4 px-4">
        {containerImages.map((src, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={src}
              alt={`Movie Container ${index + 1}`}
              width={1400}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Dark Gradient Overlay on Each Image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Hero Text Section */}
      <div className="absolute inset-x-0 bottom-0 text-center p-10 bg-gradient-to-t from-black via-black/70 to-transparent">
        <h1 className="text-4xl font-bold mb-4">
          Best viewing experience with Utsav
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Utsav is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere. With Utsav, you can
          enjoy a wide variety of content, including the latest blockbusters,
          classic movies, popular TV shows, and more.
        </p>
        <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition">
          Start Watching Now
        </button>
      </div>
    </section>
  );
}
