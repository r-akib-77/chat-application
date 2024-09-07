import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
// eslint-disable-next-line react/prop-types
const Conversation = ({ conversation, emoji, lastIdx }) => {
  // eslint-disable-next-line react/prop-types
  const { profilePic, username, _id } = conversation;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === _id;

  const { onlineUsers } = useSocketContext();
  // eslint-disable-next-line react/prop-types
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`
        ${isSelected ? "bg-sky-500" : ""}
        flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{username}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="  divider my-0 py-0 h-1 " />}
    </>
  );
};
export default Conversation;
