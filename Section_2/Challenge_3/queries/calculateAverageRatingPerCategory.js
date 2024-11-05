async function calculateAverageRatingPerCategory() {
    const averageRatingPerCategory = await Review.aggregate([
      {
        $lookup: {
          from: "products", // Join with the products collection
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Flatten the productDetails array
      {
        $lookup: {
          from: "categories", // Join with the categories collection
          localField: "productDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" }, // Flatten the categoryDetails array
      {
        $group: {
          _id: "$categoryDetails.name", // Group by category name
          averageRating: { $avg: "$rating" }, // Calculate average rating
          totalReviews: { $sum: 1 }, // Count total reviews per category
        },
      },
      {
        $sort: { averageRating: -1 }, // Sort by averageRating in descending order
      },
    ]);
  
    return averageRatingPerCategory;
  }
  