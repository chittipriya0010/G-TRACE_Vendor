import Client from "../models/client.model.js";
import Package from "../models/package.model.js";
import SolutionMaster from "../models/solution.product.model.js";
import Team from "../models/team.model.js";

let clients = [];

// ===================================
// 1. SSE Setup
// ===================================

// SSE endpoint
export const packageEventsHandler = (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  res.flushHeaders();
  const clientId = Date.now();
  clients.push({ id: clientId, res });
  req.on("close", () => {
    clients = clients.filter(c => c.id !== clientId);
  });
};

// Helper: send SSE event
const sendEvent = (data) => {
  clients.forEach(client =>
    client.res.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

// ===================================
// 2. Package CRUD Operations
// ===================================

// Backend: controllers/packageController.js

// Create Package
export const createPackage = async (req, res) => {
  try {
    const pkgData = req.body; // pkgData now contains { clientId, billId, teamId, paymentMethod, packages: [...] }

    if (!pkgData.clientId || !pkgData.teamId || !Array.isArray(pkgData.packages)) {
      return res.status(400).json({
        success: false,
        message: "Missing client, team selection, or package data."
      });
    }

    const {
      clientId,
      billId,
      teamId,
      paymentMethod,
      packages: packagesToCreate, // Get the array of packages from the payload
    } = pkgData;

    // Create one package record for each item in the packagesToCreate array
    const createdPackages = [];
    
    // Loop over the array of fully configured packages
    for (const pkg of packagesToCreate) {
      // Each 'pkg' contains all the required fields for one database record, 
      // including solutionType and all pricing/date fields for that solution.
      
      const newPackage = await Package.create({
        clientId,
        billId: billId ?? null,
        teamId,
        paymentMethod,
        
        // Fields taken directly from the individual package object
        solutionType: pkg.solutionType, // e.g., "E-lock"
        
        // Dates
        subscription_next_bill_date: pkg.subscription_next_bill_date,
        hardware_next_bill_date: pkg.hardware_next_bill_date,
        installation_next_bill_date: pkg.installation_next_bill_date,

        // Pricing fields
        hardware: pkg.hardware,
        hardwareGstIncluded: pkg.hardwareGstIncluded,
        hardwarePlan: pkg.hardwarePlan,
        hardwareMonth: pkg.hardwareMonth,
        hardwareIsPerpetual: pkg.hardwareIsPerpetual, // Don't forget this!

        installation: pkg.installation,
        installationGstIncluded: pkg.installationGstIncluded,
        installationPlan: pkg.installationPlan,
        installationMonth: pkg.installationMonth,
        installationIsPerpetual: pkg.installationIsPerpetual, // Don't forget this!

        subscription: pkg.subscription,
        subscriptionGstIncluded: pkg.subscriptionGstIncluded,
        subscriptionPlan: pkg.subscriptionPlan,
        subscriptionMonth: pkg.subscriptionMonth,
        subscriptionIsPerpetual: pkg.subscriptionIsPerpetual, // Don't forget this!
        
        // Assuming a total amount calculation is done later or sent per package
        // If 'totalAmount' is not in 'pkg' but was meant to be a grand total, you'll need to adapt. 
        // For now, removing the totalAmount field as it wasn't being calculated/used in the loop correctly.
      });

      createdPackages.push(newPackage);
    }

    res.status(201).json({ success: true, packages: createdPackages });
  } catch (error) {
    console.error("createPackage error:", error);
    res.status(500).json({ success: false, message: "Failed to create package" });
  }
};
// Get All Packages
export const getPackages = async (req, res) => {
  try {
    const { clientId } = req.query;
    const packages = await Package.findAll({
      where: clientId ? { clientId } : {},
      include: [
        { model: Client, attributes: ["firstName", "lastName", "companyName", "salesId"] },
        { model: Team, attributes: ["id", "team_name"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    const formattedPackages = packages.map((pkg) => ({
      id: pkg.id,
      clientId: pkg.clientId,
      billId: pkg.billId,
      solutionType: pkg.solutionType,
      teamId: pkg.teamId,
      teamName: pkg.Team?.team_name || "Unknown",
      paymentMethod: pkg.paymentMethod,
      subscription_next_bill_date: pkg.subscription_next_bill_date,
      hardware_next_bill_date: pkg.hardware_next_bill_date,
      installation_next_bill_date: pkg.installation_next_bill_date,

      hardware: pkg.hardware,
      hardwareGstIncluded: pkg.hardwareGstIncluded,
      hardwareMonth: pkg.hardwareMonth,
      hardwarePlan: pkg.hardwarePlan,

      installation: pkg.installation,
      installationGstIncluded: pkg.installationGstIncluded,
      installationMonth: pkg.installationMonth,
      installationPlan: pkg.installationPlan,

      subscription: pkg.subscription,
      subscriptionPlan: pkg.subscriptionPlan,
      subscriptionGstIncluded: pkg.subscriptionGstIncluded,
      subscriptionMonth: pkg.subscriptionMonth,

      totalAmount: pkg.totalAmount,
      status: pkg.status,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
      companyName: pkg.Client?.companyName || "",
      clientFullName: pkg.Client ? `${pkg.Client.firstName} ${pkg.Client.lastName}` : ""
    }));

    res.json({ packages: formattedPackages });
  } catch (error) {
    console.error("getPackages error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch packages" });
  }
};

// Update Package Status/Team
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, teamId } = req.body;
    const pkg = await Package.findByPk(id);
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    if (status) pkg.status = status;
    if (teamId) pkg.teamId = teamId;
    await pkg.save();
    sendEvent({ type: "PACKAGE_UPDATED", package: pkg });
    res.json({ success: true, package: pkg });
  } catch (error) {
    console.error("updatePackage error:", error);
    res.status(500).json({ success: false, message: "Failed to update package" });
  }
};

// Get Package by ID
export const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findByPk(id);
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    res.json(pkg);
  } catch (error) {
    console.error("getPackageById error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch package" });
  }
};

// ===================================
// 3. Dropdown Data Fetchers
// ===================================

// Fetch Solution Types (from SolutionMaster)
export const getSolutionTypes = async (req, res) => {
  try {
    const solutions = await SolutionMaster.findAll({
      attributes: ["id", "sales_product"],
      order: [["sales_product", "ASC"]],
    });
    res.json(solutions);
  } catch (error) {
    // Log the actual error for debugging database or model issues
    console.error("getSolutionTypes error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch solution types" });
  }
};

// Fetch Teams (from Team)
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: ["id", "team_name"],
      order: [["team_name", "ASC"]],
    });
    res.json(teams);
  } catch (error) {
    // Log the actual error for debugging database or model issues
    console.error("getTeams error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch teams" });
  }
};