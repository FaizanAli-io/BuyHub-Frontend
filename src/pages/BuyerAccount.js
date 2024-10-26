import React from 'react';

function BuyerAccount() {
  const cartItems = [
    { id: 1, title: 'Sample Item 1', price: 49.99 },
    { id: 2, title: 'Sample Item 2', price: 99.99 },
  ];

  const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container">
      <h2>My Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.title} - ${item.price}</p>
        </div>
      ))}
      <h3>Total: ${totalCost}</h3>
      <button className="btn btn-primary">Buy Now</button>
    </div>
  );
}

export default BuyerAccount;
