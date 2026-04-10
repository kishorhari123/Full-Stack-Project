const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Event = require("../models/Event");

const sampleEvents = [
  {
    title: "Wedding",
    icon: "💍",
    description: "Celebrate love and togetherness",
    date: "2025-06-20",
    location: "Mumbai",
    seats: 200,
    category: "Wedding",
  },
  {
    title: "Hackathon",
    icon: "💻",
    description: "Build, innovate and compete",
    date: "2025-07-05",
    location: "Bangalore",
    seats: 150,
    category: "Hackathon",
  },
  {
    title: "Technical Seminar",
    icon: "🎓",
    description: "Learn from industry experts",
    date: "2025-07-18",
    location: "Pune",
    seats: 300,
    category: "Technical Seminar",
  },
  {
    title: "Sport Seminar",
    icon: "🏆",
    description: "Sports training and workshops",
    date: "2025-08-02",
    location: "Delhi",
    seats: 250,
    category: "Sport Seminar",
  },
  {
    title: "Club Party",
    icon: "🎉",
    description: "Fun night with music and dance",
    date: "2025-08-15",
    location: "Hyderabad",
    seats: 500,
    category: "Club Party",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Create admin user
    const adminEmail = "admin@event.com";
    const adminPassword = "admin123";

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Create sample user
    const userEmail = "user@event.com";
    const userPassword = "user123";

    let user = await User.findOne({ email: userEmail });

    if (!user) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      user = await User.create({
        name: "Test User",
        email: userEmail,
        password: hashedPassword,
        role: "user",
      });
      console.log("✅ Test user created");
    } else {
      console.log("ℹ️  Test user already exists");
    }

    // Clear existing events
    await Event.deleteMany({});
    console.log("🗑️  Cleared existing events");

    // Create sample events
    const events = await Event.insertMany(
      sampleEvents.map((event) => ({
        ...event,
        createdBy: admin._id,
      })),
    );

    console.log(`✅ Created ${events.length} sample events`);

    console.log("\n📋 Credentials:");
    console.log("Admin - Email: admin@event.com, Password: admin123");
    console.log("User  - Email: user@event.com, Password: user123");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
