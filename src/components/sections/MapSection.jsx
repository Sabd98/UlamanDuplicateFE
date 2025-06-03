import Image from "next/image";

const MapSection = () => {
  return (
    <div className="relative py-20 ">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Discover Ulaman From Above
          </h2>
          <p className="text-xl">Tap On an Icon</p>
        </div>
      </div>

      <div className="relative h-[1000px] w-full overflow-hidden">
        <Image
          src="/map_section.jpg"
          alt="Peaceful eco retreat meditation space"
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
        
        />
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              No. 7 / 9th Nautical School
            </h3>
            <p>Tabanan, Bali</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              No. 7 / 10th North Sydney
            </h3>
            <p>Sydney, Australia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
