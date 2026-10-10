import axios from "axios";
import { BASE_URL } from "./maps.service";
import {
  AccountDataType,
  AccountProfileSchema,
  LoginSchema,
} from "@/@types/account.type";

export const updateRoleService = async (
  slugs: string,
  data: { role: string },
  id: string,
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${slugs}/users/${id}`,
      data,
      {
        withCredentials: true,
      },
    );

    const result = response;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const allAccountsUsers = async (slugs: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slugs}/users`, {
      withCredentials: true,
    });
    const result = response;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerService = async (body: AccountProfileSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/register`, body);
    const result = response;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const loginService = async (body: LoginSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/login`, body, {
      withCredentials: true,
    });
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const searchAccounts = async (target: string, slugs: string) => {
  const response = await axios.get(
    `${BASE_URL}/${slugs}/users/search?s=${target}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const verifyAccounts = async (email: string, token: string) => {
  const payload = {
    email,
    token,
  };

  const response = await axios.post(
    `${BASE_URL}/account/register/verify`,
    payload,
  );

  return response.data;
};

export const inviteUsers = async (body: any, slugs: string) => {
  const payload = {
    email_invited: body.email,
    role: body.role,
    status: "PENDING",
  };

  const response = await axios.post(
    `${BASE_URL}/${slugs}/account/invite`,
    payload,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const acceptInvite = async (body: { token: string; email: string }) => {
  const payload = {
    email: body.email as string,
    token: body.token as string,
  };
  const response = await axios.post(`${BASE_URL}/account/accept`, payload, {
    withCredentials: true,
  });

  return response.data;
};

export const agencyConnect = async (slug: string) => {
  const response = await axios.get(`${BASE_URL}/agency`, {
    withCredentials: true,
    params: {
      slugs: slug,
    },
  });

  return response.data;
};

export const deleteMembers = async (id: string, slug: string) => {
  const response = await axios.delete(`${BASE_URL}/${slug}/members/delete`, {
    withCredentials: true,
    data: {
      public_account_agency_id: id,
    },
  });

  return response.data;
};

export const getMyAccounts = async () => {
  const response = await axios.get(`${BASE_URL}/my-account`, {
    withCredentials: true,
  });

  return response.data;
};

export const submitData = async (image: File) => {
  if (!image) return null;
  const data = new FormData();
  data.append("image", image);

  const response = await axios.patch(`${BASE_URL}/upload_profile`, data, {
    withCredentials: true,
  });

  return response.data.filename;
};

export const updateSubmitService = async (
  data: AccountDataType,
  media: File,
) => {
  try {
    const filename = await submitData(media);

    const payload = {
      photo_profile: filename ?? data.photo_profile,
      email: data.email,
      fullname: data.fullname,
      old_password: data.old_password,
      new_password: data.new_password,
    };

    const response = await axios.patch(`${BASE_URL}/update-account`, payload, {
      withCredentials: true,
    });

    if (!response) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error(error);
  }
};
