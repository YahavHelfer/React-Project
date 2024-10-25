import { FloatingLabel, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { TCard } from "../../Types/TCard";

const EditCard = () => {
    const [cardData, setCardData] = useState<TCard | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
                setCardData(response.data);
            } catch (error) {
                console.error("Error loading card data", error);
                toast.error("Failed to load card data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardData();
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCardData((prevData: any) => (prevData ? { ...prevData, [name]: value } : null));
    };

    const saveCardData = async () => {
        if (!cardData) return;

        const sanitizedCard = {
            image: {
                url: cardData.image.url,
                alt: cardData.image.alt,
            },
            title: cardData.title,
            subtitle: cardData.subtitle,
            description: cardData.description,
            phone: cardData.phone,
            email: cardData.email,
            web: cardData.web,
            address: {
                houseNumber: cardData.address.houseNumber,
                street: cardData.address.street,
                city: cardData.address.city,
                state: cardData.address.state,
                country: cardData.address.country,
                zip: cardData.address.zip,
            },
        };

        try {
            await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, sanitizedCard);
            toast.success("Card updated successfully!");
            navigate(`/card/${id}`);
        } catch (error) {
            console.error("Error saving card", error);
            toast.error("Failed to save the card. Please try again.");
        }
    };

    const handleCancel = () => {
        navigate(`/card/${id}`);
    };

    if (isLoading) {
        return <p className="text-center text-gray-800 dark:text-gray-200">Loading card details...</p>;
    }

    if (!cardData) {
        return <p className="text-center text-gray-800 dark:text-gray-200">Card not found. Please check the ID and try again.</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form
                className="flex grid flex-col w-3/5 grid-cols-1 gap-4 p-4 m-auto mt-20 bg-white rounded-lg shadow-lg dark:bg-gray-800 md:grid-cols-2"
                onSubmit={(e) => { e.preventDefault(); saveCardData(); }}
            >
                <h1 className="col-span-2 text-2xl font-bold text-gray-800 dark:text-gray-200">Edit Your Card</h1>

                <FloatingLabel
                    type="text"
                    label="Title"
                    value={cardData.title}
                    onChange={handleInputChange}
                    name="title"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="text"
                    label="Subtitle"
                    value={cardData.subtitle}
                    onChange={handleInputChange}
                    name="subtitle"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="text"
                    label="Description"
                    value={cardData.description}
                    onChange={handleInputChange}
                    name="description"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="text"
                    label="Phone"
                    value={cardData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="email"
                    label="Email"
                    value={cardData.email}
                    onChange={handleInputChange}
                    name="email"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="text"
                    label="Website"
                    value={cardData.web}
                    onChange={handleInputChange}
                    name="web"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="text"
                    label="Image URL"
                    value={cardData.image.url}
                    onChange={handleInputChange}
                    name="image.url"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <FloatingLabel
                    type="text"
                    label="Image Alt Text"
                    value={cardData.image.alt}
                    onChange={handleInputChange}
                    name="image.alt"
                    variant={"outlined"}
                    className="m-2 border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />

                <div className="flex justify-between col-span-2">
                    <Button type="submit" disabled={!cardData} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                        Save Changes
                    </Button>
                    <Button type="button" onClick={handleCancel} color="light" className="text-gray-800 dark:text-gray-200">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditCard;
