import React, { useEffect, useState } from "react";
import "./style.css";
import NavTab from "../../../components/NavTab/NavTab";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setCarDetails } from "../../../Redux/features/carSlice";
import ReservationForm from "../../../components/ReservationForm/ReservationForm";

const CarDetailPage = () => {

const[formActive, setFormActive] = useState(false)

  const carDetail = useSelector((state)=>state.car.carDetails)
  const dispatch = useDispatch()

  const params = useParams()

const carID = params.id

const fetchCarDetail = async()=>{
  try {
    const response = await axiosInstance.get(`/car/${carID}`)
    const carData =  response.data
    dispatch(setCarDetails(carData.data))
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  fetchCarDetail()
},[carID])

const reservationForm=()=>{
   setFormActive(true)
}






  return (
    <>
      <section className="car-detail-header">
        <div className="container">
          <h1>CAR NAME</h1>
        </div>
      </section>

      <section className="car-detail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="detail-main-img">
                <img src={carDetail?.images[0]} alt="" />
              </div>
              <div className="sub-img">
                {
                  carDetail?.images.map((image)=>{
                    return(
                      <div className="detail-sub-img">
                      <img src={image} alt="" />
                    </div>
                    )
                  })
                }
               
                
              </div>

              <button className="rqst-btn" onClick={reservationForm}>Request for reservation</button>
               {
                formActive && <ReservationForm setFormActive={setFormActive} carDetail={carDetail}/>
               }
              <div className="row my-5">
                <h4 className="vehicle-des-hd">Vehicle Specification</h4>
                <div className="col-lg-12 mt-4 car-spec">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Make</th>
                        <td>{carDetail?.make}</td>
                        <th>Model</th>
                        <td>{carDetail?.name}</td>
                        <th>Type</th>
                        <td>{carDetail?.type}</td>
                      </tr>
                      <tr>
                        <th>Year</th>
                        <td>2019</td>
                        <th>Mileage</th>
                        <td>{carDetail?.mileage}km</td>
                        <th>Fuel</th>
                        <td>{carDetail?.fuelType}</td>
                      </tr>
                      <tr>
                        <th>Transmission</th>
                        <td>{carDetail?.transmission}</td>
                        <th>Color</th>
                        <td>{carDetail?.color}</td>
                        <th>Seating</th>
                        <td>{carDetail?.seating}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="description-box">
                  <div className="col-lg-12">
                      <NavTab  carDetail={carDetail}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="dealer-info-sec">
                <div className="payment-sec">
                  <div className="right-header">PRICE : {carDetail?.rentPerHour} RS</div>
                  <div className="payment-available">
                    <img
                      className="paypal"
                      src={"../../src/assets/paypal.png"}
                      alt=""
                    />
                    <div className="payment-below">
                      <img
                        className="visa"
                        src={"../../src/assets/visaCard.jpg"}
                        alt=""
                      />
                      <img
                        className="master-card"
                        src={"../../src/assets/masterCard.jpg"}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="Dealer-sec">
                  <div className="right-header">DEALER</div>
                  <div className="Dealer">
                    <div className="dealer-img">
                      <img src={"../../src/assets/dealerImage.jpg"} alt="" />
                    </div>
                    <div className="dealer-content">
                      <h4>{carDetail?.dealer.name}</h4>
                      <span>Member since May 2019</span>
                      <div className="dealer-soc">
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-whatsapp"></i>
                        <i className="bi bi-instagram"></i>
                      </div>
                    </div>
                    <div className="dealer-contact">
                      <i className="bi bi-telephone-fill"></i>
                      <label htmlFor="">Conatact</label>
                      <span>+91 {carDetail?.dealer.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="Message-sec">
                  <div className="right-header">MESSAGE</div>
                  <div className="Message">
                    <form>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your name"
                      />
                      <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter your mail address"
                      />
                      <textarea
                        name=""
                        id=""
                        rows={4}
                        placeholder="Message"
                      ></textarea>
                      <button type="submit" className="main-btn">SEND</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarDetailPage;
