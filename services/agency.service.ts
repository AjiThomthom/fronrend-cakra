import axios from "axios";
import { BASE_URL } from "./maps.service";
import { AgencyType } from "@/@types/agency.type";

export async function AgencyCreate(body: {
  agency_name: string;
  created_by: string;
}) {
  console.log(body);
  const request = await axios.post(`${BASE_URL}/agency`, body, {
    withCredentials: true,
  });
  return request;
}

export async function CurrentAgency(slugs: string) {
  try {
    const response = await axios.get(`${BASE_URL}/agency/${slugs}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateAgency(slugs: string, body: any) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${slugs}/detail-agency`,
      body,
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function leaveAgencyServices(slugs: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/${slugs}/detail-agency`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteAgencyServices(slugs: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/${slugs}/agency`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
