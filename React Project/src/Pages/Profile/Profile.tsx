import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegAddressCard, FaChartLine } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const cardsOpened = 25; // דוגמה: משוך או חישוב דינמי

  if (!user) return <p>Loading...</p>;

  const { name, phone, email, image, address, isAdmin, isBusiness } = user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center py-6">
          {/* תמונת פרופיל */}
          <img
            src={image.url}
            alt={image.alt || "User Avatar"}
            className="object-cover w-32 h-32 mb-4 border-4 border-green-500 rounded-full"
          />

          {/* שם משתמש */}
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            {name.first} {name.middle} {name.last}
          </h2>

          {/* מידע ליצירת קשר */}
          <div className="mb-4 text-gray-600">
            <p className="flex items-center"><FaEnvelope className="mr-2" /> {email}</p>
            <p className="flex items-center"><FaPhone className="mr-2" /> {phone}</p>
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              {`${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country} - ${address.zip}`}
            </p>
          </div>

          {/* מידע על החשבון */}
          <div className="mb-4 text-gray-800">
            <h3 className="font-semibold">Account Details</h3>
            <p>Role: {isAdmin ? "Administrator" : "Regular User"}</p>
            <p>Account Type: {isBusiness ? "Business" : "Personal"}</p>
          </div>

          {/* סטטיסטיקות */}
          <div className="text-gray-800">
            <h3 className="font-semibold">User Stats</h3>
            <p className="flex items-center"><FaRegAddressCard className="mr-2" /> Cards Opened: {cardsOpened}</p>
            <p className="flex items-center"><FaChartLine className="mr-2" /> Active Since: {new Date().getFullYear() - 1} Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
