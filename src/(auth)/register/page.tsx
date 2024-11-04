import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

export const page = () => {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    if (!name || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    const { success, error } = await createAccount(name, email, password);

    if (success) {
      const { success, error } = await login(email, password);
      if (error) {
        setError(error!.message || "Failed to login");
      }
    } else {
      setError(error!.message || "Failed to create account");
    }
    setIsLoading(false);
  };
  return <div>page</div>;
};
