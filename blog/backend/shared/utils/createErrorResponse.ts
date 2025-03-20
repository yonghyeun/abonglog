import { NextResponse } from "next/server";

export const createErrorResponse = (error: {
  status?: number;
  message: string;
}) =>
  NextResponse.json(
    {
      code: error.status || 500,
      message: error.message
    },
    {
      status: error.status || 500
    }
  );
