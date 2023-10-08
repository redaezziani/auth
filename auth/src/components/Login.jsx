import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  name: z.string().min(3).max(50),
  password: z.string().min(6),
});

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data
      const data = schema.parse(formData);

      // Send a POST request to register the user
      const response = await axios.post("http://localhost:3000/login", data);
      console.log(response.data);
      setSuccessMessage("Login successful!");
      setError("");
      // Redirect the user to the home page after successful registration
      window.location.href = "/";
    } catch (error) {
      // Handle registration error
      setSuccessMessage("");
      setError("Login failed. Please check your input.");
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to Login
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Register
        </Button>
        {successMessage && (
          <Typography color="green" className="mt-2 text-center font-normal">
            {successMessage}
          </Typography>
        )}
        {error && (
          <Typography color="red" className="mt-2 text-center font-normal">
            {error}
          </Typography>
        )}
        <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default Login;
