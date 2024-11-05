const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    isAdmin: { type: Boolean, default: false }, // To differentiate between regular users and admins
    createdAt: { type: Date, default: Date.now },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
  });
  
  const User = mongoose.model('User', userSchema);
  