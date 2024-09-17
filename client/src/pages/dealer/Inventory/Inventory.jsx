import React, { useEffect, useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import axiosInstance from '../../../config/axiosInstance'
import { InventoryCard } from './InventoryCard.jsx'
import Loader from '../../../components/Loader/Loader.jsx'



const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get('/dealer/inventory');
      setInventoryList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDeleteCar = async (id) => {
    try {
      await axiosInstance.delete(`/car/delete/${id}`);
      setInventoryList(inventoryList.filter(car => car._id !== id))
    } catch (error) {
      console.error('Error deleting car', error);
    }
  };
  

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <section className="inventory-header">
        <div className="container">
          <h1>Inventory</h1>
        </div>
      </section>

      <section className='inventory py-5'>
        <div className="container">
          <div className="row g-5">
            {inventoryList.length > 0 ? (
              inventoryList?.map((car) => {
                 return(
                  <InventoryCard car={car} key={car._id} handleDeleteCar={handleDeleteCar}/>
                 )
              })
            ) : (
              <p className='no-inventory'>No cars in inventory</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Inventory;
