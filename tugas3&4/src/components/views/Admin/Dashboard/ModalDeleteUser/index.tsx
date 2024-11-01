import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { User } from "@/type/user.type";
import userServices from "@/pages/services/user";

type Proptypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(deletedUser.id);
    if (result.status === 200) {
      setIsLoading(false);

      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Delete Pengguna</h1>
        <p>Apakah Anda yakin ingin menghapus akun Anda?</p>
      </div>
      <button
        className={styles.modal__button}
        type="button"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Deleting..." : "Ya, Hapus"}
        <i className="bx bx-check" />
      </button>
    </Modal>
  );
};

export default ModalDeleteUser;
