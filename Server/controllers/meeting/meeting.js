const MeetingHistory = require("../../model/schema/meeting");
const mongoose = require("mongoose");

// Add a new meeting history record
const add = async (req, res) => {
  try {
    const {
      agenda,
      attendes = [],
      attendesLead = [],
      location,
      related,
      dateTime,
      notes,
      createBy,
    } = req.body;

    const meeting = new MeetingHistory({
      agenda,
      attendes,
      attendesLead,
      location,
      related,
      dateTime,
      notes,
      createBy,
    });

    const savedMeeting = await meeting.save();
    res.status(201).json({ success: true, data: savedMeeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const index = async (req, res) => {
  try {
    const meetings = await MeetingHistory.find({ deleted: false })
      .populate("attendes", "name email")
      .populate("attendesLead", "name email")
      .populate("createBy", "username email")
      .sort({ timestamp: -1 });

    res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const view = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await MeetingHistory.findById(id)
      .populate("attendes", "name email")
      .populate("attendesLead", "name email")
      .populate("createBy", "username email");

    if (!meeting || meeting.deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await MeetingHistory.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!meeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft delete multiple meeting records by IDs
const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body; // expects: { ids: ['id1', 'id2'] }

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No IDs provided" });
    }

    await MeetingHistory.updateMany({ _id: { $in: ids } }, { deleted: true });

    res
      .status(200)
      .json({ success: true, message: "Meetings deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
