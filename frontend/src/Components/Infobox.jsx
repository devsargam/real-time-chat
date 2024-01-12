const Infobox = () => {
  return (
    <div>
      <div className="container flex lg:gap-[7vw] md:gap[15vw]] gap-10 items-center py-2 px-2 border-2 rounded-md border-solid border-gray-500 w-max">
        <img
          src="./testimage.jpg"
          className="w-10 h-11 rounded-full"
          loading="lazy"
        />
        <p className="text-slate-600">Sargam</p>
      </div>
    </div>
  );
};

export default Infobox;
