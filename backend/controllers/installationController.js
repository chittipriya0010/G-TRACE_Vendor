import Installation from "../models/installation.model.js";

// Create
export const createInstallation = async (req, res) => {
  try {
    const installation = await Installation.create(req.body);
    res.status(201).json({ message: "Installation created", installation });
  } catch (error) {
    console.error("Error creating installation:", error);
    res.status(500).json({ error: "Failed to create installation" });
  }
};

// Get all
export const getInstallations = async (req, res) => {
  try {
    const installations = await Installation.findAll({ order: [["job_id", "DESC"]] });
    res.json(installations);
  } catch (error) {
    console.error("Error fetching installations:", error);
    res.status(500).json({ error: "Failed to fetch installations" });
  }
};

export const completeInstallation = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { no_of_installed } = req.body; 

    const installation = await Installation.findByPk(job_id);
    if (!installation) return res.status(404).json({ error: "Installation job not found" });

    // Ensure the status is set to "Closed" which represents Complete
    installation.no_of_installed = no_of_installed;
    installation.status = "Closed"; // THIS MUST BE "Closed" for Completion
    await installation.save();

    res.json({ message: `Installation job ${job_id} marked as Complete (Closed).`, installation });
  } catch (error) {
    console.error("Completion error:", error);
    res.status(500).json({ error: "Failed to mark installation as complete" });
  }
};

// Get by ID
export const getInstallationById = async (req, res) => {
  try {
    const installation = await Installation.findByPk(req.params.job_id);
    if (!installation) return res.status(404).json({ error: "Not found" });
    res.json(installation);
  } catch (error) {
    console.error("Error fetching installation:", error);
    res.status(500).json({ error: "Failed to fetch installation" });
  }
};

export const updateInstallation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      contact_person,
      contact_number,
      location,
      available_time,
      installed_solution_type,
      no_of_installed, // incoming increment count (e.g., +1)
    } = req.body;

    const installation = await Installation.findByPk(id);
    if (!installation)
      return res.status(404).json({ message: "Installation not found" });

    // ✅ Increment the existing installed count
    installation.no_of_installed =
      (installation.no_of_installed || 0) + (no_of_installed || 0);

    // ✅ Calculate remaining installations
    const remaining =
      (installation.admin_no_of_installations || 0) -
      (installation.no_of_installed || 0);

    // ✅ Update status automatically
    const updatedStatus = remaining <= 0 ? "Closed" : "Approved";

    // ✅ Apply updates
    await installation.update({
      contact_person,
      contact_number,
      location,
      available_time,
      installed_solution_type,
      no_of_installed: installation.no_of_installed,
      remaining_installations: Math.max(remaining, 0),
      status: updatedStatus,
    });

    res.json({
      message: "Installation updated successfully",
      installation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminUpdateInstallation = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { admin_no_of_installations, status } = req.body;

    const installation = await Installation.findByPk(job_id);
    if (!installation) return res.status(404).json({ error: "Installation not found" });

    installation.admin_no_of_installations = admin_no_of_installations;
    installation.status = status;
    await installation.save();

    res.json({ message: "Installation updated by admin", installation });
  } catch (error) {
    console.error("Admin update error:", error);
    res.status(500).json({ error: "Failed to update installation" });
  }
};

// Delete
export const deleteInstallation = async (req, res) => {
  try {
    const deleted = await Installation.destroy({ where: { job_id: req.params.job_id } });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Installation deleted" });
  } catch (error) {
    console.error("Error deleting installation:", error);
    res.status(500).json({ error: "Failed to delete installation" });
  }
};