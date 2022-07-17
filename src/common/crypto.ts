import bcrypt from "bcrypt"

export const encrypt = async (password: any) => {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

export const decrypt = async (password: any, userPassword: any) => {
  const hashIsValid = await bcrypt.compare(password, userPassword);
  return hashIsValid;
}