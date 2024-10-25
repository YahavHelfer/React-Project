/* eslint-disable tailwindcss/classnames-order */
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CreateCardJoiSchema } from "../../validations/CreatecardSchema.joi";

function CreateCard() {
  const nav = useNavigate();

  const initialFormData = {
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: ""
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0
    },
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(CreateCardJoiSchema),
  });

  const submit = async (form: any) => {
    console.log("Submitting form: ", form);
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        form
      );
      console.log("Response: ", response.data);
      toast.success("Create Card Successful!");
      nav("/");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Create Card Failed");
    }
  };
  console.log("Is form valid: ", isValid);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="flex flex-col w-2/5 gap-4 p-6 m-auto mt-20 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Create Card</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* עמודה אחת */}
          <div>
            <FloatingLabel
              type="text"
              variant="outlined"
              label="Title"
              {...register("title")}
              color={errors["title"] ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["title"]?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Subtitle"
              {...register("subtitle")}
              color={errors["subtitle"] ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["subtitle"]?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Description"
              {...register("description")}
              color={errors["description"] ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["description"]?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Phone"
              {...register("phone")}
              color={errors["phone"] ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["phone"]?.message}</span>

            <FloatingLabel
              type="email"
              variant="outlined"
              label="Email"
              {...register("email")}
              color={errors["email"] ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["email"]?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Web"
              {...register("web")}
              color={errors["web"] ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["web"]?.message}</span>
          </div>

          {/* עמודה שנייה */}
          <div>
            <FloatingLabel
              type="text"
              variant="outlined"
              label="Country"
              {...register("address.country")}
              color={errors["address"]?.country ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["address"]?.country?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="State"
              {...register("address.state")}
              color={errors["address"]?.state ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["address"]?.state?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="City"
              {...register("address.city")}
              color={errors["address"]?.city ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["address"]?.city?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Street"
              {...register("address.street")}
              color={errors["address"]?.street ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["address"]?.street?.message}</span>

            <FloatingLabel
              type="number"
              variant="outlined"
              label="House Number"
              {...register("address.houseNumber")}
              color={errors["address"]?.houseNumber ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["address"]?.houseNumber?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="ZIP Code"
              {...register("address.zip")}
              color={errors["address"]?.zip ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["address"]?.zip?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Image URL"
              {...register("image.url")}
              color={errors["image"]?.url ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["image"]?.url?.message}</span>

            <FloatingLabel
              type="text"
              variant="outlined"
              label="Image Alt Text"
              {...register("image.alt")}
              color={errors["image"]?.alt ? "error" : "success"}
              className="border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="text-sm text-red-500">{errors["image"]?.alt?.message}</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="w-full font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Create Card
        </Button>
      </form>
    </div>
  );
}

export default CreateCard;
