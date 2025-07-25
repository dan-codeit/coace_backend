

export const sendEmailWithResetCode = async (email: string, code: string) => {
  // testing only
  console.log(`A verification code: ${code} has been sent to ${email}`);
};