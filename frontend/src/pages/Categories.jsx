import React from 'react'
import bgGradient2 from "../assets/images/bg-gradient-2.png";
import cultureImg from "../assets/images/culture-category.jpg";
import musicImg from "../assets/images/music-category.jpg";
import natureImg from "../assets/images/nature-category.jpg";
import technologyImg from "../assets/images/technology-category.jpg";
import businessImg from "../assets/images/business-image.webp";
import sustainabilityImg from "../assets/images/sustianability-image.webp";
import entertainmentImg from "../assets/images/entertainment-image.jpg";
import lifeStyleImg from "../assets/images/lifestyle-image.avif";
import sportImg from "../assets/images/sport-image.avif";
import productivityAndSelfDevelopmentImg from "../assets/images/selfdevelopment-and-productivity.png";
import healthAndFitnessImg from "../assets/images/health-and-fitness.webp";
import gamingImg from "../assets/images/gaming-image.webp";
import newsImg from "../assets/images/news-image.webp";
import foodAndCookingImg from "../assets/images/food-and-cooking.jpg";
import travelImg from "../assets/images/travel.webp";
import personalblogImg from "../assets/images/personal-image.webp";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Categories = () => {

     const categoryCard = [
        {
          image: cultureImg,
          title: "Culture",
          slogan: "Explore the World",
        },
    
        {
          image: musicImg,
          title: "Music",
          slogan: "Food for the Soul",
        },
        {
          image: natureImg,
          title: "Nature",
          slogan: "Breathtaking Beauty",
        },
        {
          image: technologyImg,
          title: "Technology",
          slogan: "Discover the future",
        },
        {
          image: businessImg,
          title: "Business",
          slogan: "Strategies & Growth",
        },
        {
          image: sustainabilityImg,
          title: "Sustainablity",
          slogan: "Protecting Tomorrow",
        },
        {
          image: entertainmentImg,
          title: "Entertainment",
          slogan: "Movies, Music & More",
        },
        {
          image: lifeStyleImg,
          title: "LifeStyle",
          slogan: "Everyday Inspiration",
        },
        {
          image: sportImg,
          title: "Sport",
          slogan: "Scores & Stories",
        },
        {
          image: productivityAndSelfDevelopmentImg,
          title: "Productivity and Self-Development",
          slogan: "Level Up Your Life",
        },
        {
          image: healthAndFitnessImg,
          title: "Health and Fitness",
          slogan: "Stronger Every Day",
        },
        {
          image: gamingImg,
          title: "Gaming",
          slogan: "Conquer. Repeat.",
        },
        {
          image: newsImg,
          title: "News and Politics",
          slogan: "Stay Informed, Stay Ahead",
        },
        {
          image: foodAndCookingImg,
          title: "Food and Cooking",
          slogan: "Taste the Creativity",
        },
        {
          image: travelImg,
          title: "Travel",
          slogan: "Explore Beyond Borders",
        },
        {
          image: personalblogImg,
          title: "Personal Blog",
          slogan: "Your Voice, Your Story",
        },
      ];
    

  return (
    <>
    <Header />
      <section className="categories py-5 bg-cover bg-no-repeat bg-indigo-950 w-full h-full " style={{backgroundImage: `url(${bgGradient2})`}}>
          <div className="container mx-auto px-5 lg:max-w-7xl">
            <div className="title flex items-center justify-between mb-10">
              <span className="border-b-1 border-white w-full" />
              <h2 className="text-4xl text-white font-extrabold w-300 text-center">
                Featured Categories
              </h2>
              <span className="border-b-1 border-white w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {categoryCard.map((card, index) => {
                const { image, title, slogan } = card;

                return (
                  <Link
                    key={index}
                    to={`/Blogs?category=${encodeURIComponent(title)}`}
                    className="category-item h-50 overflow-hidden rounded-4xl"
                  >
                    <div className="card hover:scale-102 duration-300 transition-all bg-cover bg-center w-full h-full" style={{backgroundImage: `url(${image})`}}>
                      <div className="w-full h-full flex items-end bg-gradient-to-t from-black to-transparent">
                        <div className="content p-5 mx-auto text-center">
                          <p className="text-2xl font-medium text-white">
                            {title}
                          </p>
                          <p className="text-lg font-medium text-gray-500">
                            {slogan}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <Footer />
    </>
  )
}

export default Categories
