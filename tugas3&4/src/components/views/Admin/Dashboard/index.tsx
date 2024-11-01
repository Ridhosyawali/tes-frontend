import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import { User } from "@/type/user.type";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalDetailUser from "./ModalDetailUser";

type PropTypes = {
  users: User[];
};
const DashboardAdmin = (props: PropTypes) => {
  const { users } = props;

  const [usersData, setUsersData] = useState<User | any>([]);

  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  const [detailUser, setDetailUser] = useState<User | {}>({});

  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.dashboard}>
          <div>
            <h2 className={styles.dashboard__title}>User Management</h2>
            <button type="button" className={styles.dashboard__add}>
              <i className="bx bx-plus" /> Add User
            </button>
            <table className={styles.dashboard__table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th>Lokasi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData?.map((user: User, index: number) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td className={styles.dashboard__table__name}>
                      {user.name}
                    </td>
                    <td className={styles.dashboard__table__location}>
                      {user.location}
                    </td>

                    <td className={styles.dashboard__table__action}>
                      <button
                        onClick={() => setDetailUser(user)}
                        type="button"
                        className={styles.dashboard__table__action__read}
                      >
                        <i className="bx bx-search-alt-2" />
                      </button>
                      <button
                        onClick={() => setUpdatedUser(user)}
                        type="button"
                        className={styles.dashboard__table__action__edit}
                      >
                        <i className="bx bx-edit" />
                      </button>
                      <button
                        onClick={() => setDeletedUser(user)}
                        type="button"
                        className={styles.dashboard__table__action__delete}
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
      {Object.keys(detailUser).length > 0 && (
        <ModalDetailUser users={detailUser} setDetailUser={setDetailUser} />
      )}
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          UpdatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};
export default DashboardAdmin;
