import PropTypes from 'prop-types';

const Infobox = ({ username = 'Default' }) => {
  console.log(username);
  return (
    <div>
      <div className="container flex lg:gap-[7vw] md:gap[15vw]] gap-10 items-center py-2 px-2 border-2 rounded-md border-solid border-gray-500 w-max">
        <img
          src="./testimage.jpg"
          className="w-11 h-11 rounded-full"
          loading="lazy"
        />
        <p className="text-slate-600">{username}</p>
      </div>
    </div>
  );
};

// This adds props validation to jsx maybe
Infobox.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Infobox;
