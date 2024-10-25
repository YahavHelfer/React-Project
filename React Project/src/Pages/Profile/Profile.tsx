import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegAddressCard } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  if (!user) return <p>Loading...</p>;

  const { name, phone, email, image, address, isAdmin, isBusiness } = user;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-indigo-800 to-purple-600">
      <div className="w-full max-w-2xl overflow-hidden transition-all duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
        <div className="flex flex-col items-center p-8">
          {/* תמונת פרופיל */}
          <div className="relative">
            <img
              src={image.url}
              alt={image.alt || "User Avatar"}
              className="border-4 border-indigo-500 rounded-full shadow-md w-28 h-28"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
          </div>

          {/* שם משתמש */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {`${name.first} ${name.middle ? name.middle : ''} ${name.last}`}
          </h2>

          {/* מידע ליצירת קשר */}
          <div className="mt-4 space-y-3 text-center text-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <FaEnvelope className="text-indigo-600" />
              <span>{email}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <FaPhone className="text-indigo-600" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <FaMapMarkerAlt className="text-indigo-600" />
              <span>{`${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country} - ${address.zip}`}</span>
            </div>
          </div>

          {/* מידע על החשבון */}
          <div className="w-full p-4 mt-6 text-center bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-800">Account Information</h3>
            <p className="text-gray-600">Role: {isAdmin ? "Admin" : "User"}</p>
            <p className="text-gray-600">Account Type: {isBusiness ? "Business" : "Personal"}</p>
          </div>

          {/* סטטיסטיקות */}
          <div className="w-full mt-4 text-center">
            <h3 className="font-semibold text-gray-800">User Statistics</h3>
            <p className="flex items-center justify-center space-x-2 text-gray-600">
              <FaRegAddressCard className="text-indigo-600" />
              <span>Active Since: {new Date().getFullYear() - 1} Year</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
