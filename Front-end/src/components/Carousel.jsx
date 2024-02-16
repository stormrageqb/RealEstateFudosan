import { useEffect, React } from "react";
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

const Carousel = (props) => {
    const { images } = props;
    useEffect(() => {
        const config = {
            type: 'carousel',
            startAt: 0,
            perView: 4,
            gap: 10,
            breakpoints: {
                1280: {
                    perView: 3,
                },
                1024: {
                    perView: 2,
                },
                768: {
                    perView: 1,
                },
            },
        };

        new Glide('.glide', config).mount();
    }, []);

    return (
        <div className="glide flex items-center justify-center w-full h-[350px] bg-[#ECECEC] mt-0">
            <div className="glide__track w-[90%] pl-[30px]" data-glide-el="track">
                <ul className="glide__slides">
                    {images.map((image, index) => {
                        const imageUrl = image.replace('../../../Back-end/uploads/', '');
                        return (
                            <li key={index} className="glide__slide">
                                <img src={process.env.REACT_APP_API_BASE_URL + '/downloads/?filename='+imageUrl} alt={`Slide ${index + 1}`} className="w-[350px] h-[250px]" />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
                <button className="absolute glide__arrow--left left-6 bottom-1/2 transform translate-y-1/2" data-glide-dir="<">
                    <div className=" flex justify-center items-center my-auto ">
                        <FaChevronLeft className="text-black text-[40px]" />
                        {/* <i className="fa-solid fa-circle-left text-white text-2xl"></i> */}
                    </div>
                </button>
                <button className="absolute glide__arrow--right right-6 bottom-1/2 transform translate-y-1/2" data-glide-dir=">">
                    <div className="h-9 w-9 flex justify-center items-center my-auto ">
                        {/* <i className="fa-solid fa-circle-right text-white text-2xl"></i> */}
                        <FaChevronRight className="text-black text-[40px]" />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Carousel;