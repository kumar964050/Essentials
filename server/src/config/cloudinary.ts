import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

interface UploadedFile {
  tempFilePath: string;
}

interface UploadResult {
  id: string;
  url: string;
}

const uploadSingleFile = async (file: UploadedFile): Promise<UploadResult> => {
  const result = cloudinary.uploader.upload(file.tempFilePath, {
    folder: process.env.CLOUDINARY_DIR_NAME || "uploads",
  });

  return {
    id: (await result).public_id,
    url: (await result).secure_url,
  };
};

const uploadMultipleFile = async (
  files: UploadedFile[]
): Promise<UploadResult[]> => {
  const imageArray: UploadResult[] = [];

  for (let index = 0; index < files.length; index++) {
    const result = await uploadSingleFile(files[index]);
    imageArray.push(result);
  }

  return imageArray;
};

export { uploadSingleFile, uploadMultipleFile };
