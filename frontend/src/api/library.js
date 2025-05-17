import axios from "axios";
const API = "/api/library";

export const fetchLibraryItems = () => axios.get(API);
export const fetchLibraryItem = (id) => axios.get(`${API}/${id}`);
export const createLibraryItem = (data) => axios.post(API, data);
export const updateLibraryItem = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteLibraryItem = (id) => axios.delete(`${API}/${id}`);
export const updateSlideOrder = (id, order) =>
  axios.put(`${API}/${id}/order`, order);
