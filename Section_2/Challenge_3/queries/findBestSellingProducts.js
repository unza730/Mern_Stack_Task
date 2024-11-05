const mongoose = require('mongoose');

async function findBestSellingProducts() {
  const bestSellingProducts = await Order.aggregate([
    { $unwind: "$items" }, // Deconstruct the items array
    {
      $group: {
        _id: "$items.product", // Group by product ID
        totalSold: { $sum: "$items.quantity" }, // Sum the quantity sold
      },
    },
    {
      $sort: { totalSold: -1 }, // Sort by totalSold in descending order
    },
    {
      $lookup: {
        from: "products", // Join with the products collection
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails", // Flatten the productDetails array
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        totalSold: 1,
        productName: "$productDetails.name",
        productImage: { $arrayElemAt: ["$productDetails.images", 0] }, // Get the first image
      },
    },
  ]);

  return bestSellingProducts;
}
