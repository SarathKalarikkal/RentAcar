import React from 'react'
import './style.css'

const AboutPage = () => {
  return (
    <>
      <section className="about-header">
         <div className="container">
            <h1>ABOUT US</h1>
            <div className="about-contact">
                <span><i className="bi bi-geo-fill me-3"></i>All over Kerala</span>
                <span><i className="bi bi-telephone-fill me-3"></i>+91 9876543210</span>
                <span><i className="bi bi-clock-fill me-3"></i>Mon - Sat : 24hrs</span>
            </div>
         </div>
      </section>
 
      <section className="vision-mission">
          <div className="container">
             <div className="row">
                <div className="col-12 col-md-6">
                   <div className="vision-box">
                      <h2>ABOUT</h2>
                      <p>Our car rental service is dedicated to providing you with a seamless and enjoyable rental experience. We offer a wide range of vehicles, from compact cars to luxury SUVs, to meet the diverse needs of our customers. Whether you're planning a weekend getaway, a business trip, or need a temporary vehicle, we've got you covered. Our mission is to make car rentals easy, affordable, and accessible for everyone, with a focus on excellent customer service and vehicle quality. We are committed to delivering  car rental solutions</p>
                   </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="vision-box">
                      <h2>VISION & MISSION</h2>
                      <p className='mb-0'>To become the leading car rental service in the region, known for our exceptional customer service, diverse fleet of vehicles, and innovative rental solutions that cater to the evolving needs of our customers</p>
                      <p>Our mission is to provide our customers with a reliable and hassle-free car rental experience. We aim to achieve this by maintaining a fleet of well-maintained vehicles, offering competitive pricing. We are dedicated to continuous improvement,.</p>
                   </div>
                </div>
             </div>
          </div>
      </section>
     
     <section className="why-to-choose">
        <div className="container">
            <div className="why-head">
               <h2>WHY TO CHOOSE US</h2>
               <hr />
            </div>

            <div className="row ">
            <div className="col-lg-4">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="features-box one">
                            <div className="content">
                                <h2>01</h2>
                            <h6>heading</h6>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis minus, sed et in tempore esse!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="features-box two">
                           <div className="content">
                            <h2>02</h2>
                            <h6>heading</h6>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis minus, sed et in tempore esse!</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="feature-center">
                   <div className="content">
                    <h2>RENT A CAR</h2>
                   </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="row  g-4">
                    <div className="col-lg-12">
                        <div className="features-box three">
                           <div className="content">
                            <h2>03</h2>
                            <h6>heading</h6>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis minus, sed et in tempore esse!</p>
                           </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="features-box four">
                           <div className="content">
                            <h2>04</h2>
                            <h6>heading</h6>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis minus, sed et in tempore esse!</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
     </section>

    </>
  )
}

export default AboutPage