import { NextResponse } from "next/server";

export const createSuccessResponse =
  (message: string) =>
  <T>(data: T) =>
    NextResponse.json({
      code: 200,
      message,
      data: data
    });
