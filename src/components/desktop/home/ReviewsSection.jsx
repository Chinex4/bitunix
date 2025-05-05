import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    title: 'Bitunix Records All-Time Highest Trading Volume In October',
    media: 'BENZINGA Pro',
    bgColor: 'bg-[#1E1E1E]',
  },
  {
    title: 'Bitunix Exchange Now Supports Visa and Mastercard Payments',
    media: 'THENEWSCRYPTO',
    bgColor: 'bg-[#00B8F0]',
  },
  {
    title: 'Slater Says "Bitunix Prioritizes Compliance and User Education"',
    media: 'yahoo! finance',
    bgColor: 'bg-[#A855F7]',
  },
  {
    title: 'Bitunix at Blockchain Economy Summit Dubai 2023: Highlights of First Exhibit',
    media: 'NEWSBTC',
    bgColor: 'bg-[#00B8F0]',
  },
  {
    title: 'Bitunix at Blockchain Economy Summit Dubai 2023: Highlights of First Exhibit',
    media: 'NEWSBTC',
    bgColor: 'bg-[#00B8F0]',
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-black flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
      <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-left md:text-center leading-tight">
        Reviews of Bitunix from Worldwide Media
      </h2>

      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            0: {slidesPerView: 1.2},
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        //   navigation
        //   pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col h-72 rounded-xl overflow-hidden bg-[#121212] border border-gray-800 hover:shadow-xl transition">
                {/* Top (Media logo) */}
                <div className={`flex items-center justify-center p-6 ${review.bgColor} h-1/2`}>
                  <h3 className="text-white text-lg font-bold">{review.media}</h3>
                </div>

                {/* Middle (Review Text) */}
                <div className="flex flex-col justify-between flex-1 p-4">
                  <p className="text-white text-sm mb-4">{review.title}</p>

                  {/* Bottom (Details link) */}
                  <div className="flex items-center justify-between text-lime-400 text-xs cursor-pointer hover:underline">
                    <span>Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="h-4 w-4">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewsSection;
