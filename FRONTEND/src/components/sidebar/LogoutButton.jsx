import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"> </span>
      ) : (
        <BiLogOut
          onClick={logout}
          className="w-6 h-6 text-white hover:scale-[1.2] transition-all active:scale-[.85] cursor-pointer"
        />
      )}
    </div>
  );
};

export default LogoutButton;
