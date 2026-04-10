const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.createRegistration = async (req, res) => {
  try {
    const { eventId, name, email, contact, city, age, gender } = req.body;

    if (!eventId || !name || !email || !contact || !city || !age || !gender) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check seat capacity
    const registrationCount = await Registration.countDocuments({ eventId });
    if (registrationCount >= event.seats) {
      return res.status(400).json({ msg: "Sorry, this event is fully booked" });
    }

    // Prevent duplicate registration
    const existingReg = await Registration.findOne({ eventId, email });
    if (existingReg) {
      return res.status(400).json({ msg: "You are already registered for this event" });
    }

    const registration = await Registration.create({
      eventId,
      name,
      email,
      contact,
      city,
      age,
      gender,
    });

    res.status(201).json({
      msg: "Registration successful",
      registration,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("eventId", "title date location")
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error("Get registrations error:", err);
    res.status(500).json({ msg: "Server error fetching registrations" });
  }
};

exports.getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      eventId: req.params.eventId,
    }).sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error("Get event registrations error:", err);
    res.status(500).json({ msg: "Server error fetching event registrations" });
  }
};
