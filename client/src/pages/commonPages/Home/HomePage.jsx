import React, { useEffect, useState } from "react";
import "./style.css";
import Filterbox from "../../../components/Filter-box/Filter-box";
import CarCard from "../../../components/carCard/CarCard";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import { setCarList } from "../../../Redux/features/carSlice";
import newsletterImg from "../../../assets/newsletter-img.jpg"
import carImg from "../../../assets/carimage.jpg"
import howItWork from "../../../assets/how-work-car.png"

const HomePage = () => {

const {carList} = useSelector((state) => state.car);
const dispatch = useDispatch()



const fetchCars = async()=>{
  try {
      const response = await axiosInstance.get('/car/list')
      const CarsData = response.data
      dispatch(setCarList(CarsData.data))
  } catch (error) {
  }
}

useEffect(()=>{
  fetchCars()
}, [])



const generateCarouselItems = (items) => {
  const chunkSize = 3;
  const chunks = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks.map((chunk, index) => (
    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
      <div className="row mt-5">
        {chunk.map((car, carIndex) => (
          <div key={carIndex} className="col-12 col-md-6 col-lg-4">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  ));
};




  return (
    <>
      <div className="hero-sec">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={newsletterImg}
                className="d-block w-100"
                alt="..."
              />
              <div className="hero-content">
                 <h1>RENT YOUR <br />FAVOURITE CAR</h1>
                 <h4>FAST & EASY WAY | BETTER DRIVE</h4>
                 <button>LEARN MORE</button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={carImg}
                className="d-block w-100"
                alt="..."
              />
               <div className="hero-content">
                 <h1>RENT YOUR <br />FAVOURITE CAR</h1>
                 <h4>FAST & EASY WAY | BETTER DRIVE</h4>
                 <button>LEARN MORE</button>
              </div>
            </div>
            
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="filter-sec">
        <div className="container">
          <Filterbox carList={carList}/>
        </div>
      </div>

      <section className="latest-offers">
        <div className="container">
          <div className="latest-head">
            <h2>LATEST OFFERS</h2>
            <hr />
          </div>
          <div id="carouselOffers" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {carList && carList.length > 0 && generateCarouselItems(carList).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselOffers"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="carousel-inner">
              {carList && carList.length > 0 && generateCarouselItems(carList)}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselOffers"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselOffers"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      
      <section className="newsletter">
         <div className="container">

           <div className="newsletter-head">
              <h2>LOOKING FOR A BETTER DRIVE</h2>
              <p>Subscribe to our application for best deals and drives and get faster access to offers.</p>
           </div>
           
              <form>
                 <input type="text" name="" id="" placeholder="Enter your email address"/>
                 <button className="main-btn">Subscribe</button>
              </form>

         </div>
      </section>

      <section className="new-arrivals">
        <div className="container">
          <div className="new-arrivals-head">
            <h2>NEW ARRIVALS</h2>
            <hr />
          </div>
          <div id="carouselNewArrivals" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {carList && carList.length > 0 && generateCarouselItems(carList.slice(6)).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselNewArrivals"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="carousel-inner">
              {carList && carList.length > 0 && generateCarouselItems(carList.slice(6))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselNewArrivals"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselNewArrivals"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="how-it-works">
         <div className="container ">
           <div className="row">
             <div className="col-lg-7">
                <h3>How It Works</h3>
                <div className="row">
                   <div className="col-lg-6">
                     <div className="work-box">
                        <div className="work-top">
                           <h2>1.</h2>
                           <p>Search & Book Your Preferred Vehicle</p>
                        </div>
                        <p>Choose your desired vehicle from our various available options.</p>
                     </div>
                   </div>
                   <div className="col-lg-6">
                      ....
                   </div>
                   <div className="col-lg-6">
                      ....
                   </div>
                   <div className="col-lg-6">
                     <div className="work-box">
                        <div className="work-top">
                           <h2>2.</h2>
                           <p>Pick Up Your vehicle</p>
                        </div>
                        <p>Take delivery of your car from any of our various pickup points or deliver it straight to your doorstep by our trusted associates</p>
                     </div>
                   </div>
                   
                   <div className="col-lg-6">
                     <div className="work-box">
                        <div className="work-top">
                           <h2>3.</h2>
                           <p>Driver Your vehicle</p>
                        </div>
                        <p>Take your car for a spin and start your road trip with your loved ones.</p>
                     </div>
                   </div>
                   <div className="col-lg-6">
                      ....
                   </div>
                   <div className="col-lg-6">
                      ....
                   </div>
                   <div className="col-lg-6">
                     <div className="work-box">
                        <div className="work-top">
                           <h2>4.</h2>
                           <p>Return Your Vehicle</p>
                        </div>
                        <p>Get the vehicle back to your preferred return location and we will take it from there.</p>
                     </div>
                   </div>
                </div>
             </div>
             <div className="col-lg-5">
               <img src={howItWork} alt=""/>
             </div>
           </div>
         </div>
      </section>

    </>
  );
};

export default HomePage;
