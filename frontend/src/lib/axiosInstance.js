import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

//tour package APIs
export const getAllPackages = () => axiosInstance.get("/packages");
export const getPackageById = (id) => axiosInstance.get(`/packages/${id}`);

//booking APIs
export const submitBooking = (data) => axiosInstance.post("/bookings", data);

//admin APIs
export const addPackage = (data) => axiosInstance.post("/admin/packages", data);
export const updatePackage = (id, data) =>
  axiosInstance.put(`/admin/packages/${id}`, data);
export const deletePackage = (id) =>
  axiosInstance.delete(`/admin/packages/${id}`);
