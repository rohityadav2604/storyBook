import uploadFileToDb from '../services/uploadService.js';
import { deleteFile } from '../utils/deleteFile.js';
/**
 * Handles PDF file upload and processing
 * @param {Express.Request} req - Express request object containing file upload
 * @param {Express.Response} res - Express response object
 * @returns {Promise<void>}
 */
export async function uploadController(req, res) {
  try {
    console.log(req.body);
    const { id } = req.body;
    const { path , originalname , size } = req.file;
    const dbResponse = await uploadFileToDb(id, path);

    const deleteResponse = await deleteFile(path);

    console.log(deleteResponse);

    if (dbResponse.status === 200) {
      res.status(200).json({ id: id , name: originalname , size: size , status: 200});
    } else {
      res.status(500).json(dbResponse);
    }
  } catch (error) {
    console.error('error in uploadController' , error);
    res.status(500).json({ message: 'Internal server error' , status: 500});
  }
}
