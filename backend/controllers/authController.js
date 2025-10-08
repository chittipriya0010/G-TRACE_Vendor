// controllers/authController.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto"; // ⬅️ For generating secure tokens
// 🚨 IMPORTANT: Replace with your actual email utility
import { sendEmail } from "../utils/emailUtils.js"; 
import { Op } from "sequelize"; 

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";
const RESET_TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

// ==========================================================
// 1. LOGIN
// ==========================================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: ["name", "permissions"] }],
    });

    if (!user) return res.status(404).json({ message: "Invalid credentials." });

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.Role.name,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      token, 
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      team_id: user.team_id,
      phone: user.phone,
      branch_id: user.branch_id,
      role: user.Role.name, 
      permissions: user.Role.permissions, 
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// ==========================================================
// 2. FORGOT PASSWORD - Generates token and sends email
// ==========================================================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // ⚠️ Important: Return success even if user isn't found to prevent email enumeration attacks.
      return res.json({ message: "If a user with that email exists, a password reset link has been sent." });
    }

    // 1. Generate a secure, unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 2. Hash the token before saving it to the database (Best Practice)
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      
    // 3. Set token expiry time
    const passwordResetExpires = Date.now() + RESET_TOKEN_EXPIRY; // 1 hour

    // 4. Update user record with token and expiry
    await user.update({ passwordResetToken, passwordResetExpires });

    // 5. Create the reset URL for the user to click
    const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    const message = `You are receiving this email because you (or someone else) requested a password reset. Please click on this link to set a new password: ${resetURL}\n\nThis link will expire in 1 hour.`;

    try {
      // 6. Send the email (Requires a utility function like 'sendEmail')
      await sendEmail({
        email: user.email,
        subject: "Your Password Reset Token (Valid for 1 hour)",
        message: message,
      });

      res.status(200).json({
        message: "Password reset link sent to email.",
      });
    } catch (err) {
      // If email fails, clear the token from the user record
      await user.update({ passwordResetToken: null, passwordResetExpires: null });
      console.error("Forgot password email error:", err);
      return res.status(500).json({ message: "Error sending email. Please try again later." });
    }

  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// ==========================================================
// 3. RESET PASSWORD - Verifies token and updates password
// ==========================================================
export const resetPassword = async (req, res) => {
    const { token } = req.params; // Get the raw token from the URL parameter
    const { password } = req.body; // Get the new password from the request body

    if (!password) {
        return res.status(400).json({ message: "New password is required." });
    }
    
    // 1. Hash the incoming token to find the user in the database
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    try {
        // 2. Find user by the token hash and ensure it hasn't expired
        const user = await User.findOne({
            where: {
                passwordResetToken: hashedToken,
                // ✅ CORRECTED: Use the imported [Op.gt]
                passwordResetExpires: { [Op.gt]: Date.now() }, 
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }
        
        // 3. Hash the new password securely
        const hashedPassword = await bcrypt.hash(password, 10); // Use a salt round of 10

        // 4. Update the user's password and clear the token fields
        await user.update({
            password_hash: hashedPassword,
            passwordResetToken: null,
            passwordResetExpires: null,
        });

        // Optional: Log the user in or send a success message
        res.json({ message: "Password updated successfully. You can now log in." });

    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};