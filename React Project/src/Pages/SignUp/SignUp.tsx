import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignUpJoiSchema } from "../../validations/SignupSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const nav = useNavigate();

    const initialFormData = {
        "name": {
            "first": "",
            "middle": "",
            "last": ""
        },
        "phone": "",
        "email": "",
        "password": "",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "state": "",
            "country": "",
            "city": "",
            "street": "",
            "houseNumber": 0,
            "zip": 0
        },
        "isBusiness": false
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(SignUpJoiSchema),
    });

    const submit = async (form: any) => {
        console.log("Submitting form: ", form);
        try {
            const response = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", form);
            console.log("Response: ", response.data);
            toast.success("Sign Up Successful! Welcome!");
            nav("/");
        } catch (error) {
            console.error("Error during sign up: ", error);
            toast.error("Sign Up Failed");
        }
    };
    console.log("Is form valid: ", isValid);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
            <form
                className="flex flex-col w-full max-w-4xl gap-4 p-6 m-auto bg-white rounded-lg shadow-md dark:bg-gray-800"
                onSubmit={handleSubmit(submit)}
            >
                <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Sign Up</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* שדות העמודה הראשונה */}
                    <div>
                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="First Name"
                            {...register("name.first")}
                            color={errors["name"]?.first ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["name"]?.first?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Middle Name"
                            {...register("name.middle")}
                            color={errors["name"]?.middle ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["name"]?.middle?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Last Name"
                            {...register("name.last")}
                            color={errors["name"]?.last ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["name"]?.last?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Phone"
                            {...register("phone")}
                            color={errors["phone"] ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["phone"]?.message}</span>

                        <FloatingLabel
                            type="email"
                            variant="outlined"
                            label="Email"
                            {...register("email")}
                            color={errors["email"] ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["email"]?.message}</span>

                        <FloatingLabel
                            type="password"
                            variant="outlined"
                            label="Password"
                            {...register("password")}
                            color={errors["password"] ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["password"]?.message}</span>
                    </div>

                    {/* שדות העמודה השנייה */}
                    <div>
                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Country"
                            {...register("address.country")}
                            color={errors["address"]?.country ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["address"]?.country?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="State"
                            {...register("address.state")}
                            color={errors["address"]?.state ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["address"]?.state?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="City"
                            {...register("address.city")}
                            color={errors["address"]?.city ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["address"]?.city?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Street"
                            {...register("address.street")}
                            color={errors["address"]?.street ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["address"]?.street?.message}</span>

                        <FloatingLabel
                            type="number"
                            variant="outlined"
                            label="House Number"
                            {...register("address.houseNumber")}
                            color={errors["address"]?.houseNumber ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["address"]?.houseNumber?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="ZIP Code"
                            {...register("address.zip")}
                            color={errors["address"]?.zip ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["address"]?.zip?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Image URL"
                            {...register("image.url")}
                            color={errors["image"]?.url ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["image"]?.url?.message}</span>

                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Image Alt Text"
                            {...register("image.alt")}
                            color={errors["image"]?.alt ? "error" : "success"}
                            className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <span className="text-sm text-red-500">{errors["image"]?.alt?.message}</span>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("isBusiness")}
                                className="form-checkbox dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="ml-2 text-gray-800 dark:text-gray-200">Is Business</span>
                        </label>
                    </div>
                </div>

                <Button type="submit" disabled={!isValid} className="font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Sign Up
                </Button>
            </form>
        </div>
    );
}

export default SignUp;
