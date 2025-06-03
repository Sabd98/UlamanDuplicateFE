import Image from "next/image";

const LocationInfo = () => {
  return (
    <div className="text-white flex justify-between items-center my-10">
      <div className="w-2xl">
        <h1 className="text-xl md:text-3xl font-serif mb-6">
          Tucked Within Majestic Balinese Nature.
        </h1>
        <p className="mb-8 text-teal-900 text-sm line-clamp-3">
          Strategically located near popular areas like Canggu and Ubud,
          experience tranquil nature and luxury. With endless activities, you'll
          never want to leave Ulaman.
        </p>
      </div>

      <div className="relative h-[40rem] w-1/3 overflow-hidden">
        <Image
          src="/ZpDw3R5LeNNTxF2w_ulaman-bali.avif"
          alt="Peaceful eco retreat meditation space"
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 80vw"
       
        />
      </div>
    </div>
  );
};

export default LocationInfo;
