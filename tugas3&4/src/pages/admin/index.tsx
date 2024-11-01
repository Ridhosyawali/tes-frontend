import DashboardAdmin from "@/components/views/Admin/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import userServices from "../services/user";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
      console.log(data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <div>
        <DashboardAdmin users={users} />
      </div>
    </>
  );
};

export default AdminPage;
