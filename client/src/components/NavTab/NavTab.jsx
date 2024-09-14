import React, { useEffect, useState } from 'react';
import "./style.css";
import { useForm } from 'react-hook-form';
import axiosInstance from '../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const VehicleTabs = ({ carDetail }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axiosInstance.post(`/review/create/${carDetail._id}`, data);
      console.log(response.data);
      toast.success(response.data.message)
    } catch (error) {
      toast.error(response.data.message)
      console.error("Error submitting review", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/car/${carDetail._id}`);
        console.log(response.data);
        setReviews(response.data.data);
       
      } catch (error) {
        console.error("Error fetching reviews", error);
        toast.error(response.data.data.message)
      }
    };

    fetchReviews();
  }, [carDetail]);

  return (
    <>
    <Toaster />
    <div className="col-12 detail-tabs">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}
          >
            Vehicle Description
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => handleTabClick('reviews')}
          >
            Reviews
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'addReview' ? 'active' : ''}`}
            onClick={() => handleTabClick('addReview')}
          >
            Add Review
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3" id="myTabContent">
        {activeTab === 'description' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <p className="des">{carDetail?.description}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews tab-pane fade show active" role="tabpanel">
            {reviews?.length > 0 ? (
              reviews.map((review, index) => (
                <div className="review-box" key={index}>
                  <h6>{review?.user.name}</h6>
                  <div className="star-rating">
                    {'⭐'.repeat(review?.rating)}
                  </div>
                  <p>{review?.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        )}

        {activeTab === 'addReview' && (
          <div className="addReview tab-pane fade show active" role="tabpanel">
            <h5>Leave a Review</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Your Comment"
                  {...register('comment')}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Rating:</label>
                <select className="form-control" {...register('rating')}>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>
              <button className="post-btn" type="submit">
                Post Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default VehicleTabs;
