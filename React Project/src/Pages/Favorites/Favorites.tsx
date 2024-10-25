import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Favorites = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
  const user = useSelector((state: TRootState) => state.UserSlice);

  const searchCards = () => {
    return cards
      .filter((item) => item.likes.includes(user.user!._id))
      .filter((item: TCard) => item.title.includes(searchWord));
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
    setLoading(true);
    try {
      const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-4 p-4">
      <h1 className="text-3xl font-bold text-center">Favorites</h1>

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
                  <FaHeart
                    size={24}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => likeUnlikeCard(item)}
                    color={isLikedCard(item) ? "red" : "black"}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
