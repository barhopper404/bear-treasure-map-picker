window.Banner = ({ onBannerClick }) => {
    return (
        <div className="w-full flex justify-center mb-4">
            <img
                src="utils/banner.png"
                alt="BEAR Guild Banner"
                className="max-w-2xl w-full cursor-pointer hover:opacity-90 transition-opacity"
                onClick={onBannerClick}
            />
        </div>
    );
};
