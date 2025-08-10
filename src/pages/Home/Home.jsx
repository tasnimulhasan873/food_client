import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; // Corrected 'react-router' to 'react-router-dom'
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import { AuthContext } from "../../context/AuthC";
import PulsingDotLoader from "../../components/PulsingDotLoader"; // Ensure this path is correct

import img1 from "../../assets/banner/i1.png";
import img2 from "../../assets/banner/i2.jpg";
import img3 from "../../assets/banner/i3.jpg";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true); // New loading state for featured foods

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      setLoadingFeatured(true); // Start loading
      try {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await axios.get(`${baseUrl}/featured-foods`);
        setFeaturedFoods(response.data);
      } catch (error) {
        console.error("Failed to fetch featured foods", error);
      } finally {
        setLoadingFeatured(false); // End loading
      }
    };
    fetchFeaturedFoods();
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      // Use navigate with state to redirect back after login if desired
      navigate("/login", { state: { from: `/food-details/${id}` } });
    } else {
      navigate(`/food-details/${id}`);
    }
  };

  return (
    <div className="px-4 space-y-20 max-w-7xl mx-auto mt-8 py-8 bg-custom min-h-screen">
      {" "}
      {/* Increased overall spacing */}
      {/* Hero / Banner Section */}
      <section className="relative">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          interval={5000}
          transitionTime={800}
          className="rounded-2xl shadow-2xl overflow-hidden border border-accent-custom"
        >
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              src={img1}
              alt="Community food sharing - People sharing meals together"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  Share Love Through Food
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-6 drop-shadow-md opacity-90">
                  Connect with your community by sharing surplus food and
                  reducing waste
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-primary-custom hover:bg-accent-custom text-secondary-custom font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Sharing
                  </button>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary-custom font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              src={img2}
              alt="Fresh healthy food options available for sharing"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  Join Our Food Community
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-6 drop-shadow-md opacity-90">
                  Discover fresh, healthy food options shared by neighbors near
                  you
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-primary-custom hover:bg-accent-custom text-secondary-custom font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Browse Foods
                  </button>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary-custom font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                    How It Works
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              src={img3}
              alt="Reducing food waste through community sharing"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  Zero Food Waste Mission
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-6 drop-shadow-md opacity-90">
                  Together we can eliminate food waste and help those in need
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-primary-custom hover:bg-accent-custom text-secondary-custom font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Make Impact
                  </button>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary-custom font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                    Our Mission
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </section>
      {/* Featured Foods Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          {" "}
          {/* Adjusted spacing */}
          <h2 className="text-4xl font-extrabold text-primary-custom">
            {" "}
            {/* Updated to use primary color */}
            🍱 Featured Foods
          </h2>
          <Link
            to="/available-foods"
            className="inline-flex items-center px-6 py-3 bg-primary-custom text-secondary-custom font-semibold rounded-lg shadow-md hover:bg-accent-custom transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-custom focus:ring-offset-2"
          >
            See All Foods
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {loadingFeatured ? (
          <PulsingDotLoader />
        ) : featuredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {featuredFoods.map((food) => (
              <motion.div
                key={food._id}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full w-full flex justify-center"
              >
                <Card
                  image={food.image}
                  title={food.name}
                  description={`Quantity: ${food.quantity}\nPickup: ${
                    food.pickupLocation
                  }\n${
                    food.additionalNotes || "No additional notes provided."
                  }`}
                  onSeeMore={() => handleViewDetails(food._id)}
                  buttonText="View Details"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-custom py-10 border border-dashed border-accent-custom rounded-lg p-6">
            No featured foods available at the moment. Please check back later!
          </p>
        )}
      </section>
      {/* Extra Section 1: How It Works */}
      <section className="bg-white/50 rounded-2xl p-10 shadow-xl border border-accent-custom">
        {" "}
        {/* Updated background for better contrast */}
        <h2 className="text-4xl font-extrabold text-primary-custom mb-10 text-center">
          {" "}
          {/* Updated to use primary color */}
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {" "}
          {/* Increased gap */}
          <motion.div
            className="space-y-4 p-6 bg-white rounded-xl shadow-md border border-accent-custom" // Updated border color
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-primary-custom/20 text-primary-custom text-4xl font-bold shadow-inner">
              {" "}
              {/* Updated colors */}1
            </div>
            <h3 className="text-2xl font-bold text-primary-custom">
              Share Food
            </h3>{" "}
            {/* Updated to use primary color */}
            <p className="text-custom text-lg leading-relaxed">
              {" "}
              {/* Updated to use custom text color */}
              Donors effortlessly add their surplus food items, providing
              details like quantity, pickup location, and expiry.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 p-6 bg-white rounded-xl shadow-md border border-accent-custom"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-primary-custom/20 text-primary-custom text-4xl font-bold shadow-inner">
              2
            </div>
            <h3 className="text-2xl font-bold text-primary-custom">
              Request Food
            </h3>
            <p className="text-custom text-lg leading-relaxed">
              Users browse available listings and submit requests for food items
              they'd like to pick up.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 p-6 bg-white rounded-xl shadow-md border border-accent-custom"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-primary-custom/20 text-primary-custom text-4xl font-bold shadow-inner">
              3
            </div>
            <h3 className="text-2xl font-bold text-primary-custom">
              Enjoy & Connect
            </h3>
            <p className="text-custom text-lg leading-relaxed">
              Pick up your food, savor it, and connect with fellow community
              members who share your values.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Extra Section 2: Community Testimonials */}
      <section className="bg-white/50 rounded-2xl p-10 shadow-xl border border-accent-custom mb-8">
        {" "}
        {/* Updated background and border */}
        <h2 className="text-4xl font-extrabold text-primary-custom mb-10 text-center">
          {" "}
          {/* Updated to use primary color */}
          What Our Community Says
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Fatima R."
            photo="https://randomuser.me/api/portraits/women/68.jpg"
            quote="Sharing food through this platform has connected me with so many wonderful people! It's truly making a difference."
          />
          <Testimonial
            name="Rahim H."
            photo="https://randomuser.me/api/portraits/men/75.jpg"
            quote="I love how easy it is to request food and give back to the community. The process is so straightforward and rewarding."
          />
          <Testimonial
            name="Sonia A."
            photo="https://randomuser.me/api/portraits/women/55.jpg"
            quote="The best way to reduce food waste and make new friends in the neighborhood. This platform is a brilliant idea!"
          />
        </div>
      </section>
    </div>
  );
};

const Testimonial = ({ name, photo, quote }) => (
  <motion.div
    className="bg-white rounded-xl p-8 shadow-md flex flex-col items-center text-center border border-accent-custom h-full" // Updated border
    whileHover={{ translateY: -5 }} // Subtle lift on hover
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={photo}
      alt={name}
      className="w-24 h-24 rounded-full mb-5 object-cover border-4 border-primary-custom shadow-md" // Updated border color
    />
    <p className="italic text-custom text-lg mb-4 leading-relaxed line-clamp-4">
      &quot;{quote}&quot;
    </p>{" "}
    {/* Updated text color */}
    <h4 className="font-bold text-primary-custom text-xl mt-auto">
      {name}
    </h4>{" "}
    {/* Updated text color */}
  </motion.div>
);

export default Home;
