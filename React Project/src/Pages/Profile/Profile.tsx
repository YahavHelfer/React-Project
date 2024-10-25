import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegAddressCard } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  if (!user) return <p>Loading...</p>;

  const { name, phone, email, image, address, isAdmin, isBusiness } = user;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
      <div className="w-full max-w-lg overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
        <div className="flex flex-col items-center p-6">
          {/* תמונת פרופיל */}
          <img
            src={image.url}
            alt={image.alt || "User Avatar"}
            className="object-cover w-24 h-24 mb-4 border-4 border-blue-500 rounded-full shadow-lg sm:w-32 sm:h-32"
          />

          {/* שם משתמש */}
          <h2 className="mb-2 text-xl font-bold text-center text-gray-900 transition-colors sm:text-2xl hover:text-blue-600">
            {name.first} {name.middle} {name.last}
          </h2>

          {/* מידע ליצירת קשר */}
          <div className="mb-4 text-center text-gray-700">
            <p className="flex items-center justify-center transition-colors hover:text-blue-500">
              <FaEnvelope className="mr-2 text-blue-600" /> {email}
            </p>
            <p className="flex items-center justify-center transition-colors hover:text-blue-500">
              <FaPhone className="mr-2 text-blue-600" /> {phone}
            </p>
            <p className="flex items-center justify-center transition-colors hover:text-blue-500">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              {`${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country} - ${address.zip}`}
            </p>
          </div>

          {/* מידע על החשבון */}
          <div className="mb-4 text-center text-gray-900">
            <h3 className="font-semibold">Account Details</h3>
            <p>Role: {isAdmin ? "Administrator" : "Regular User"}</p>
            <p>Account Type: {isBusiness ? "Business" : "Personal"}</p>
          </div>

          {/* סטטיסטיקות */}
          <div className="text-center text-gray-900">
            <h3 className="font-semibold">User Stats</h3>
            <p className="flex items-center justify-center">
              <FaRegAddressCard className="mr-2 text-blue-600" /> Active Since: {new Date().getFullYear() - 1} Year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

