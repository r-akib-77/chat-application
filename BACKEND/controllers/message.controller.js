import { io } from "../socket/socket.js";
import Conversation from "./../models/conversationModel.js";
import Message from "./../models/messageModel.js";
import { getReciverSocketId } from "./../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    // we get message from req.boy
    const { message } = req.body;
    // we get id from req.params.id and that is reciver id
    const { id: receiverId } = req.params;
    // we get sender id by user object from protectRoute.js
    const senderId = req.user._id;

    /// those who have [senderId,reciverId] array wil show in conversation
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    //// if there is no conversation then create a array of [senderId, reciverId]
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    /// get senderId,reciverId,message from Message document
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //if newMessage = true conversation > messages > push document id
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // saving into database and this will run parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY GOES THROUGH HERE
    const reciverSocketId = getReciverSocketId(receiverId);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    /// respose the newMessage
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    // get this the id that we chating with
    const { id: userToChatId } = req.params;
    // get _id from protect route
    const senderId = req.user._id;

    // get all the conversation
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    // there is no conversation
    if (!conversation) {
      return res.status(201).json([]);
    }
    ///showing all the conversations
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(`error in getmessages`, error);
    res.status(500).json({
      error: "internal server error",
    });
  }
};
