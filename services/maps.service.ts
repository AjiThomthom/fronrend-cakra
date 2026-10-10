import { CameraSchema } from "@/@types/camera.type";
import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_LOCAL;

/**
 * @description Endpoint untuk mengambil data dari OpenJabar
 *

/**
 * @description Endpoint untuk menambahkan CCTV
 *
 */
export const addCamera = async (payload: CameraSchema, slug: string) => {
  console.log(slug);
  try {
    const response = await axios.post(`${BASE_URL}/${slug}/cctvs`, payload, {
      withCredentials: true,
    });
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailCameraPublic = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cctvs/public/${id}`, {
      withCredentials: true,
    });
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPublicMapCamera = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cctvs/public`);
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description
 * Endpoin untuk mengambil semua kamera
 */
export const getAllCamera = async (slug: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}/cctvs/all`, {
      withCredentials: true,
    });
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailCamera = async (id: string, slug: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}/cctvs/${id}`, {
      withCredentials: true,
    });
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCamera = async (id: string, slug: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${slug}/cctvs/${id}`, {
      withCredentials: true,
    });
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const selectCameraCategory = async (
  category: string,
  page: string = "1",
  slug: string,
) => {
  const p = page ?? "1";
  try {
    const response = await axios.get(`${BASE_URL}/${slug}/cctvs`, {
      withCredentials: true,
      params: {
        category,
        page: p,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const selectCategorySearchKey = async (
  name: string,
  category: string,
  page: string = "1",
  slug: string,
) => {
  if (page == null) return null;
  try {
    const response = await axios.get(
      `${BASE_URL}/${slug}/cctvs?search=${name}&category=${category}&page=${page}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

let debounceTimer: ReturnType<typeof setTimeout> | undefined;
export const searchCamera = async (
  name: string,
  page: string = "1",
  delay: number = 500,
): Promise<CameraSchema[] | unknown> => {
  if (page == null) return null;
  return new Promise((resolve, reject) => {
    debounceTimer = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/cctvs?search=${name}&page=${page}`,
          {
            withCredentials: true,
          },
        );
        const results = response.data;
        resolve(results);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    }, delay);
  });
};

export const updateCameraCategory = async (
  body: { category: string },
  id: string,
  slug: string,
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${slug}/cctvs/${id}`,
      body,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
