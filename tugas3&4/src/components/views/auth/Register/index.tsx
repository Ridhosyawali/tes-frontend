import { FormEvent, useContext, useState } from "react";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import authServices from "@/pages/services/auth";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      name: form.fullname.value,
      password: form.password.value,
    };

    // const result = await fetch("/api/user/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });                                    DISINI BERHASIL DOUBLE DATA (episode 6)

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="REGISTER"
      link="/auth/login"
      linkText="Sudah memiliki akun? silahkan login "
    >
      <form onSubmit={handleSubmit}>
        <input
          className={styles.register__input}
          placeholder="Email"
          name="email"
          type="email"
        />
        <input
          className={styles.register__input}
          placeholder="Nama Lengkap"
          name="fullname"
          type="text"
        />
        <input
          className={styles.register__input}
          placeholder="Password"
          name="password"
          type="password"
        />

        <button type="submit" className={styles.register__button}>
          {isLoading ? "loading..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
