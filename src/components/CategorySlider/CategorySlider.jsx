import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return (
      <div className='py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-center py-12'>
            <i className='fa fa-spinner fa-spin text-green-600 text-4xl'></i>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-8 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Shop by Category
          </h2>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            Browse our popular categories
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {categories.map((cat) => (
            <div key={cat._id} className='px-2'>
              <div className='group cursor-pointer'>
                <div className='relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300'>
                  <img 
                    className='w-full h-[200px] object-cover transform group-hover:scale-110 transition-transform duration-300' 
                    src={cat.image} 
                    alt={cat.name}
                    loading="lazy"
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  
                  {/* Category Name Overlay on Hover */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <span className='text-white font-bold text-lg px-4 py-2 bg-green-600 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                      {cat.name}
                    </span>
                  </div>
                </div>
                
                {/* Category Name Below Image */}
                <h3 className='mt-3 text-center font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors duration-300 truncate'>
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slick-prev,
        .slick-next {
          z-index: 10;
          width: 40px;
          height: 40px;
        }
        
        .slick-prev:before,
        .slick-next:before {
          font-size: 35px;
          color: #16a34a;
          opacity: 0.7;
        }
        
        .slick-prev:hover:before,
        .slick-next:hover:before {
          opacity: 1;
        }
        
        .slick-prev {
          left: -15px;
        }
        
        .slick-next {
          right: -15px;
        }

        @media (max-width: 640px) {
          .slick-prev {
            left: -5px;
          }
          
          .slick-next {
            right: -5px;
          }

          .slick-prev:before,
          .slick-next:before {
            font-size: 25px;
          }
        }
      `}</style>
    </div>
  );
}