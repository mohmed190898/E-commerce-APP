import style from './MainSlider.module.css'
import sliderImage1 from '../../assets/finalProject assets/images/slider-image-1.jpeg'
import sliderImage2 from '../../assets/finalProject assets/images/slider-image-2.jpeg'
import sliderImage3 from '../../assets/finalProject assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplayspeed: 1000,

  };
  return <>
      <div className="md:flex mt-16 ">
        <div className="md:w-3/4 ">
          <Slider {...settings}>
            <div><img src={sliderImage1} className='w-full h-[400px]' alt="" /></div>
            <div><img src={sliderImage2} className='w-full h-[400px] ' alt="" /></div>
            <div><img src={sliderImage3} className='w-full h-[400px] ' alt="" /></div>
          </Slider>
        </div>
        <div className="md:w-1/4">
            <img src={sliderImage1} alt="" className='w-full h-[200px]' />
            <img src={sliderImage2} alt="" className='w-full h-[200px]' />
        </div>
      </div>

  </>
}
