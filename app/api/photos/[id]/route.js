import { getPhotoById } from "@/lib/image-data";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const photoId = params?.id;
  // Example logic to retrieve a specific photo by ID
  const data = getPhotoById(photoId); // Assuming getPhotoById returns a single photo object

  return NextResponse.json(data);
}
