import React, { useEffect, useState } from "react";
import NavTab from "../../../components/NavTab/NavTab";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setCarDetails } from "../../../Redux/features/carSlice";
import ReservationForm from "../../../components/ReservationForm/ReservationForm";
import paypal from '../../../assets/paypal.png'
import visa from '../../../assets/visaCard.jpg'
import masterCard from '../../../assets/masterCard.jpg'
import Loader from "../../../components/Loader/Loader";
import "./style.css"





const DealerCarDetail = () => {

const[formActive, setFormActive] = useState(false) 
const [loading, setLoading] = useState(true);



  const carDetail = useSelector((state)=>state.car.carDetails)
  const dispatch = useDispatch()


  
  const params = useParams()

const carID = params.id

const fetchCarDetail = async()=>{
  try {
    const response = await axiosInstance.get(`/car/${carID}`)
    const carData =  response.data
    dispatch(setCarDetails(carData.data))
    setLoading(false)
  } catch (error) {
    setLoading(false)
  }
}



useEffect(()=>{
  fetchCarDetail()

  window.scrollTo(0, 0);
},[carID])

const reservationForm=()=>{
   setFormActive(true)
}


if (loading) {
  return <Loader/>;
}



  return (
    <>
      <section className="car-detail-header">
        <div className="container">
          <h1>{carDetail?.name}</h1>
        </div>
      </section>

      <section className="car-detail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="detail-main-img">
                <img src={carDetail?.image} alt="" />
              </div>
              {/* <div className="sub-img">
                {
                  carDetail?.images.map((image)=>{
                    return(
                      <div className="detail-sub-img">
                      <img src={image} alt="" />
                    </div>
                    )
                  })
                }
               
                
              </div> */}

              {/* <button className="rqst-btn" onClick={reservationForm}>Request for reservation</button> */}
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
                    <h4>Description</h4>
                  <div className="tab-pane fade show active" role="tabpanel">
            <p className="des">{carDetail?.description}</p>
          </div>
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
                      src={paypal}
                      alt=""
                    />
                    <div className="payment-below">
                      <img
                        className="visa"
                        src={visa}
                        alt=""
                      />
                      <img
                        className="master-card"
                        src={masterCard}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="Dealer-sec">
                  <div className="right-header">DEALER</div>
                  <div className="Dealer">
                    <div className="dealer-img">
                      <img src={carDetail?.dealer?.profilePic || "../../src/assets/dealerImage.jpg"} alt="" />
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
                {/* <div className="Message-sec">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerCarDetail;
