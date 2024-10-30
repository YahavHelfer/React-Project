import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignInJoiSchema } from "../../validations/SigninSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import { decode } from "../../Services/tokenService";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignInJoiSchema),
  });

  const submit = async (form: typeof initialFormData) => {
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form
      );

      const token = response.data;
      localStorage.setItem("token", token);

      const id = decode(token)._id;
      axios.defaults.headers.common["x-auth-token"] = token;

      const userResponse = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id
      );

      const user = userResponse.data;
      dispatch(userActions.login(user));

      // שמירת המשתמש ב-localStorage כדי לשמור התחברות
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Sign In Successful");
      nav("/");
    } catch (error) {
      console.error(error);
      toast.error("Sign In Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-900">
      <form
        className="flex flex-col w-full max-w-md gap-6 p-6 m-auto bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Sign In</h1>

        <FloatingLabel
          type="email"
          variant="outlined"
          label="Email"
          {...register("email")}
          color={errors["email"] ? "error" : "success"}
          className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        {errors["email"] && (
          <span className="text-sm text-red-500">{errors["email"]?.message}</span>
        )}

        <FloatingLabel
          type="password"
          variant="outlined"
          label="Password"
          {...register("password")}
          color={errors["password"] ? "error" : "success"}
          className="border-0 border-b-0 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        {errors["password"] && (
          <span className="text-sm text-red-500">{errors["password"]?.message}</span>
        )}

        <Button
          type="submit"
          disabled={!isValid}
          className="font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Sign In
        </Button>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Don't have an account?
          <a href="/signup" className="text-blue-600 hover:underline dark:text-blue-400"> Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
