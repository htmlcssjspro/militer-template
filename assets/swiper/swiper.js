import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper';
// Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);


const slider = () => {
    const swiper = new Swiper('.swiper', {
        modules:        [Navigation, Pagination, Autoplay, Scrollbar],
        speed:          500,
        // direction: 'vertical',
        // slidesPerView: 1,
        // spaceBetween:  30,
        centeredSlides: true,
        loop:           true,
        autoplay:       {
            delay:                2500,
            disableOnInteraction: false,
        },
        pagination: {
            el:        '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
};

export default slider;
