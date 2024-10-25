import { useParams } from "react-router-dom";
import './CardDetails.css'; // אל תשכח לכלול את קובץ ה-CSS
import useApi from "../../Services/useApi";

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: card } = useApi("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id)
  
  return (
    <div className="p-5 card-details-container">
      {card ? (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="w-full rounded-t-lg" style={{ height: '200px' }} src={card.image.url} alt={card.image.alt} />
          </a>
          <div className="w-11/12 p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.subtitle}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Phone: {card.phone}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Email: {card.email}</p>
            <p className="mb-3 font-normal text-gray-700 truncate dark:text-gray-400">Website: <a href={card.web} target="_blank" rel="noopener noreferrer">{card.web}</a></p>
            <div className="card-address">
              <p>{card.address.street} {card.address.houseNumber}, {card.address.city}, {card.address.state}, {card.address.country}, {card.address.zip}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CardDetails;
