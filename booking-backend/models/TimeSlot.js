const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  time: {
    type: String,
    required: true,
    // Format: "09:00", "14:30", etc.
  },
  duration: {
    type: Number,
    default: 60, // Duration in minutes
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true,
    index: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
timeSlotSchema.index({ date: 1, time: 1 }, { unique: true });

// Index for finding available slots
timeSlotSchema.index({ date: 1, isAvailable: 1 });

// Static method to get available slots for a date range
timeSlotSchema.statics.getAvailableSlots = async function(startDate, endDate) {
  return this.find({
    date: {
      $gte: startDate,
      $lte: endDate
    },
    isAvailable: true
  }).sort({ date: 1, time: 1 });
};

// Static method to book a slot
timeSlotSchema.statics.bookSlot = async function(slotId, bookingId) {
  const slot = await this.findById(slotId);

  if (!slot) {
    throw new Error('Slot not found');
  }

  if (!slot.isAvailable) {
    throw new Error('Slot is not available');
  }

  slot.isAvailable = false;
  slot.bookingId = bookingId;
  await slot.save();

  return slot;
};

// Static method to release a slot
timeSlotSchema.statics.releaseSlot = async function(slotId) {
  const slot = await this.findById(slotId);

  if (!slot) {
    throw new Error('Slot not found');
  }

  slot.isAvailable = true;
  slot.bookingId = null;
  await slot.save();

  return slot;
};

// Instance method to format slot for display
timeSlotSchema.methods.toDisplay = function() {
  return {
    id: this._id,
    date: this.date.toISOString().split('T')[0],
    time: this.time,
    duration: this.duration,
    isAvailable: this.isAvailable,
    displayTime: this.time,
    displayDate: this.date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  };
};

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
