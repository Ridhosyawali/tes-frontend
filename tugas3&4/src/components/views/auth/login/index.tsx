import { FormEvent, useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="LOGIN"
      link="/auth/register"
      linkText="Belum memiliki akun? silahkan registrasi "
    >
      <form onSubmit={handleSubmit}>
        <input
          className={styles.login__input}
          placeholder="Email"
          name="email"
          type="email"
        />
        <input
          className={styles.login__input}
          placeholder="Password"
          name="password"
          type="password"
        />
        <button type="submit" className={styles.login__button}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginView;
