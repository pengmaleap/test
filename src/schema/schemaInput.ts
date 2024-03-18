import z from "zod";

const schemaInput = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  released_on: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    }),
});

export default schemaInput;
