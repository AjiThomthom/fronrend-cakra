import axios from "axios";
import { BASE_URL } from "./maps.service";

export const getSearchHistory = async (
  s: string,
  slug: string,
  page: number = 1,
  limit: number = 20,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${slug}/data-history/search`,
      {
        params: {
          s,
          page,
          limit,
        },
        withCredentials: true,
      },
    );

    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getAllHistory = (
  status: string,
  date: string,
  slug: string,
  onMessage: (data: any) => void,
  onError?: (data: any) => void,
) => {
  try {
    let page = 1;
    const ws = `${process.env.NEXT_PUBLIC_SOCKET_URL}/${slug}/data-history?limit=10&page=${page}&date=${date}&status=${status}`;

    if (typeof ws != "string") {
      return;
    }

    const socket = new WebSocket(ws);
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      onMessage(response);
    };

    socket.onerror = (error) => {
      console.error(error);
      onError?.(error);
    };

    return socket;
  } catch (error) {
    console.error(error);
  }
};

export const updateRejectedStatus = async (id: string, slug: string) => {
  try {
    const payload = {
      status: "REJECTED",
    };

    const response = await axios.patch(
      `${BASE_URL}/${slug}/data-history?id=${id}`,
      payload,
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    console.error();
  }
};

export const updateConfirmedStatus = async (id: string, slug: string) => {
  try {
    const payload = {
      status: "CONFIRMED",
    };
    const response = await axios.patch(
      `${BASE_URL}/${slug}/data-history?id=${id}`,
      payload,
      { withCredentials: true },
    );
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getlogActivity = async (slugs: string, page: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${slugs}/history?page=${page}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
