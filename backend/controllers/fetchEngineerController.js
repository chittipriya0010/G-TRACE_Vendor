import Engineer from '../models/engineer.model.js';
import Role from '../models/role.model.js';

/**
 * Fetches a list of all engineers, selecting only their
 * name and stream, and including role info.
 */
export const getEngineersList = async (req, res) => {
  try {
    const engineers = await Engineer.findAll({
      attributes: ['engineer_name', 'stream'], // correct fields
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['role_id', 'name', 'permissions'], // include role details
        },
      ],
    });

    if (!engineers || engineers.length === 0) {
      return res.status(404).json({ message: 'No engineers found.' });
    }

    res.status(200).json(engineers);
  } catch (error) {
    console.error('Error fetching engineer list:', error);
    res.status(500).json({
      message: 'Server error while retrieving engineer data.',
      error: error.message,
    });
  }
};