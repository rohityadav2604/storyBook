import { retrieveService } from '../services/retrieverService.js';

/**
 * Controller to handle document retrieval and question answering requests
 * @param {Request} req - Express request object containing question and pdfId
 * @param {Response} res - Express response object
 */
export async function retrieveController(req, res) {
  try {
    const { question, pdfId } = req.body;

    const response = await retrieveService(question);

    return res.status(response.status).json({
      message: response.message,
      id: pdfId,
      status: response.status,
    });

  } catch (error) {
    console.error('Error in retrieve controller:', error);

    return res.status(500).json({
      message: 'Internal server error occurred while processing your request',
      status: 500,
    });
  }
}