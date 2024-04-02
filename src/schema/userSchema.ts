import z from "zod";

const userSchema = z.object({
  gmail: z.string().email({ message: "Invalid email address" }), // Custom error message for invalid email
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Custom error message for short passwords
    // You can chain more validations here if needed, such as regex for complexity requirements
})
export default userSchema