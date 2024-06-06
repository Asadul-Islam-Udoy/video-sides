const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requird: true,
    },
    addressInfos: [
      {
        city: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        stateCode: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    ],
    video: {
      type: String,
    },
    videoId: {
      type: String,
      required: true,
    },
    videoCost: {
      type: Number,
      required: true,
    },
    statusInfo: [
      {
        status_id: {
          type: String,
        },
        status: {
          type: String,
        },
      },
    ],
    paymentUser: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    createUser: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("VideoPayments", paymentSchema);
