import { testingMode } from "../dev-test/testMode.js";

export const sendSignUpEmailVerification = async (
  code: string,
  email: string
): Promise<void> => {
  try {
    if (testingMode !== "production") {
      // Test mode
      console.log(`Verify your email with code: ${code}`);
      return;
    }

    // email sending logic here, e.g., nodemailer or any email service

  } catch (error) {
    console.error(`Failed to send verification email to ${email}:`, error);
    throw new Error("Failed to send verification email");
  }
};
