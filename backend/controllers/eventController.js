const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, seats, icon, category } = req.body;

    if (!title || !description || !date || !location || !seats) {
      return res.status(400).json({ msg: "All required fields must be provided" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      seats: Number(seats),
      icon: icon || "🎪",
      category: category || "Other",
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ msg: "Server error creating event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Get events error:", err);
    res.status(500).json({ msg: "Server error fetching events" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, seats, icon, category } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: title || event.title,
        description: description || event.description,
        date: date || event.date,
        location: location || event.location,
        seats: seats ? Number(seats) : event.seats,
        icon: icon || event.icon,
        category: category || event.category,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({ msg: "Server error updating event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ msg: "Server error deleting event" });
  }
};
