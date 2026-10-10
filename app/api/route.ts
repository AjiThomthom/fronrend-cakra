"use server";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/services/maps.service";
import axios from "axios";
import { cookies } from "next/headers";

export const DELETE = async () => {
  try {
    const token = (await cookies()).get("access_token");
    const response = await axios.delete(`${BASE_URL}/account/logout`, {
      withCredentials: true,
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });
    (await cookies()).delete("access_token");

    const result = response;
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
};
