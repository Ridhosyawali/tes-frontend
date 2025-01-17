import Link from "next/link";
import styles from "./AuthLayout.module.scss";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

const AuthLayout = (props: Proptypes) => {
  const { title, children, link, linkText } = props;
  return (
    <div className={styles.auth}>
      <div className={styles.auth__form}>
        <h1 className={styles.auth__title}>{title}</h1>
        {children}

        <p className={styles.auth__link}>
          {linkText}
          <Link href={link}>disini</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
