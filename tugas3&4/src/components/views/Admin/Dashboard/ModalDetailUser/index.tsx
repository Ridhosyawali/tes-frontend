import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction } from "react";
import styles from "./ModalDetailUser.module.scss";
import { User } from "@/type/user.type";
type Proptypes = {
  users: User | any;
  setDetailUser: Dispatch<SetStateAction<{}>>;
};
const ModalDetailHistory = (props: Proptypes) => {
  const { users, setDetailUser } = props;

  return (
    <Modal onClose={() => setDetailUser({})}>
      <h1 className={styles.modal__title}>Detail Riwayat Transaksi</h1>

      <p>Customer Name: {users.name}</p>
      <p>Order Id: {users.location}</p>
      <hr className={styles.modal__devide} />
      <hr className={styles.modal__devide} />
    </Modal>
  );
};

export default ModalDetailHistory;
