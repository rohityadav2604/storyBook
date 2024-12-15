import fs from 'fs';
import path from 'path';
/**
 * Creates uploads directory if it doesn't exist
 * @returns {Promise<{success: boolean, message: string}>} Result of directory creation
 */
export const ensureUploadDir = async () => {
  try {
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      await fs.promises.mkdir(uploadDir, { recursive: true });

      return {
        success: true,
        message: 'Upload directory created successfully',
      };
    }

    return {
      success: true,
      message: 'Upload directory already exists',
    };

  } catch (error) {
    console.error('Error creating upload directory:', error);

    return {
      success: false,
      message: 'Error creating upload directory',
    };
  }
};

/**
 * Deletes a file from the uploads folder
 * @param {string} filePath - Path of the file to be deleted
 * @returns {Promise<{success: boolean, message: string}>} Result of deletion operation
 */
export const deleteFile = async (filePath) => {
  try {
    // Ensure the path is absolute and within uploads folder
    const absolutePath = path.resolve(filePath);

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return {
        success: false,
        message: 'File not found',
      };
    }

    // Delete the file
    await fs.promises.unlink(absolutePath);

    return {
      success: true,
      message: 'File deleted successfully',
    };

  } catch (error) {
    console.error('Error deleting file:', error);

    return {
      success: false,
      message: 'Error deleting file',
    };
  }
};

