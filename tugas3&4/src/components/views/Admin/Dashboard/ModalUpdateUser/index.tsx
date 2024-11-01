import Modal from "@/components/ui/Modal";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalUpdateUser.module.scss";
import { User } from "@/type/user.type";
import userServices from "@/pages/services/user";

type Proptypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  UpdatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
};
const ModalUpdateUser = (props: Proptypes) => {
  const { UpdatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateuser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(UpdatedUser.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className={styles.modal__title}>Update User</h1>
      <form onSubmit={handleUpdateuser}>
        <label htmlFor="">email</label>
        <input
          placeholder="Email"
          name="email"
          type="email"
          defaultValue={UpdatedUser.email}
          disabled
          className={styles.modal__input}
        />
        <label htmlFor="">fullname</label>
        <input
          placeholder="Fullname"
          name="fullname"
          type="text"
          defaultValue={UpdatedUser.fullname}
          disabled
          className={styles.modal__input}
        />
        <label htmlFor="">phone</label>
        <input
          placeholder="Phone"
          name="phone"
          type="number"
          defaultValue={UpdatedUser.phone}
          disabled
          className={styles.modal__input}
        />
        <label htmlFor="">role</label>
        <select
          name="role"
          defaultValue={UpdatedUser.role}
          className={styles.modal__input}
        >
          {[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.modal__button}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
