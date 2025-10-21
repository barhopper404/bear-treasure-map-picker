window.Banner = ({ onBannerClick }) => {
    return (
        <div className="w-full flex justify-center">
            <img
                src="utils/banner.png"
                alt="BEAR Guild Banner"
                className="max-w-xl w-full cursor-pointer hover:opacity-90 transition-opacity"
                onClick={onBannerClick}
            />
        </div>
    );
};
