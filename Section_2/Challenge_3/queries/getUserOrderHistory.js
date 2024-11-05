async function getUserOrderHistory(userId) {
    const orderHistory = await Order.find({ user: userId })
      .populate("items.product") // Populate product details
      .sort({ orderDate: -1 }) // Sort by most recent order first
      .exec();
  
    return orderHistory;
  }
  