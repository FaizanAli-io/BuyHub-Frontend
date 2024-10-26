import React from 'react';

function SellerAccount() {
  const inventoryItems = [
    { id: 1, title: 'Sample Item 1', price: 49.99 },
  ];
  const soldItems = [
    { id: 2, title: 'Sample Item 2', price: 99.99 },
  ];

  return (
    <div className="container">
      <h2>Your Inventory</h2>
      {inventoryItems.map(item => (
        <div key={item.id}>
          <p>{item.title} - ${item.price}</p>
        </div>
      ))}
      <h2>Sold Items</h2>
      {soldItems.map(item => (
        <div key={item.id}>
          <p>{item.title} - ${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default SellerAccount;
