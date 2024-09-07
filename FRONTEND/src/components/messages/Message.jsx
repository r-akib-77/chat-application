import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractBangladeshiTime } from "./../../utils/extractTime";
// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  // eslint-disable-next-line react/prop-types
  const formatedDate = extractBangladeshiTime(message.createdAt);
  // eslint-disable-next-line react/prop-types
  const fromMe = message.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-gray-300 ${bubbleBgColor}`}>
        {
          // eslint-disable-next-line react/prop-types
          message.message
        }
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center ">
        {formatedDate}
      </div>
    </div>
  );
};

export default Message;
