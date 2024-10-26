import React from 'react';
import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">${item.price}</p>
        <Link to={`/item-details/${item.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
}

export default ItemCard;
