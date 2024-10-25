import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { PiPlus } from "react-icons/pi";

const MyCards = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
  const user = useSelector((state: TRootState) => state.UserSlice);

  const searchCards = () => {
    return cards.filter((item: TCard) => item.title.includes(searchWord));
  };

  const isLikedCard = (card: TCard) => {
    if (user && user.user) {
      return card.likes.includes(user.user._id);
    } else return false;
  };

  const navToCard = (id: string) => {
    nav("/card/" + id);
  };

  const getData = async () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards");
      setCards(res.data);
    } catch (error) {
      toast.error("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const likeUnlikeCard = async (card: TCard) => {
    const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
    if (res.status === 200) {
      toast.success("Card liked/unliked");

      const index = cards.indexOf(card);
      const ifLiked = cards[index].likes.includes(user.user!._id);
      const newCards = [...cards];
      if (ifLiked) {
        newCards[index].likes.splice(index);
      } else {
        newCards[index].likes.push(user.user!._id);
      }

      setCards(newCards);
    }
  };

  const deleteCard = async (card: TCard) => {
    try {
      const res = await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
      const index = cards.indexOf(card);
      const newCards = [...cards];
      newCards.splice(index, 1);

      setCards(newCards);

      if (res) {
        toast.success("Card deleted");
      }
    } catch (err) {
      toast.error("Card delete failed");
    }
  };

  const navToCreate = () => {
    nav("/create-card");
  };

  const navToEdit = (id: string) => {
    nav(`/edit-card/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-4 p-4 ">
      <h1 className="text-3xl font-bold text-center">My Cards</h1>
      <p className="text-lg text-center">These cards were created by you</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Spinner color="purple" />
          <p className="mt-2 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 m-auto md:grid-cols-3 lg:grid-cols-3">
          {searchCards().map((item: TCard) => (
            <Card
              key={item._id}
              className="flex flex-col justify-between w-full transition-shadow duration-200 shadow-lg hover:shadow-xl"
            >
              <img
                onClick={() => navToCard(item._id)}
                src={item.image.url}
                alt={item.image.alt}
                className="object-cover w-full h-48 rounded-t-lg cursor-pointer"
              />
              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                  <h3 className="text-lg text-gray-600">{item.subtitle}</h3>
                  <p className="text-gray-800">{item.description}</p>
                </div>
                <hr className="my-2" />
                {user && user.user && (
                  <div className="flex justify-between">
                    <FaHeart
                      size={24}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => likeUnlikeCard(item)}
                      color={isLikedCard(item) ? "red" : "black"}
                    />
                    <FaEdit size={24} className="cursor-pointer" onClick={() => navToEdit(item._id)} />
                    <FaTrash size={24} className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => deleteCard(item)} />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed flex p-3 rounded-full cursor-pointer right-4 bottom-20 bg-cyan-300 md:right-10 md:bottom-15">
        <PiPlus size={20} onClick={navToCreate} />
      </div>


    </div>
  );
};

export default MyCards;
