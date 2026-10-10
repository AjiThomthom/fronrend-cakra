import axios from "axios";
import { BASE_URL } from "./maps.service";

export const getSummaryData = async (slug: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}/home`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
