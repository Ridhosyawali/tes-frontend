import instance from "@/lib/axios/instance";

const endpoint = {
  user: "/api/user",
  profile: "/api/user/profile",
  cart: "/api/user/cart",
};

export const userServices = {
  getAllUsers: () => instance.get(endpoint.user),
  updateUser: (id: string, data: any) =>
    instance.put(`${endpoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endpoint.user}/${id}`),
};

export default userServices;
