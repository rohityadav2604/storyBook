import fs from 'fs';
import path from 'path';

/**
 * Checks if upload folder exists, creates if not present
 * @returns {void}
 */
export function checkUploadFolder() {
  const uploadDir = path.join(process.cwd(), 'uploads');

  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Upload directory created successfully');
    } catch (error) {
      console.error('Error creating upload directory:', error);
      throw new Error('Failed to create upload directory');
    }
  }
  next();
}

/**
 * Deletes a file from the uploads folder
 * @param {string} filename - Name of file to delete
 * @returns {Promise<void>}
 */
export async function deleteFile(filename) {
  try {
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`File ${filename} deleted successfully`);
    } else {
      console.log(`File ${filename} does not exist`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filename}:`, error);
    throw new Error(`Failed to delete file ${filename}`);
  }
}
