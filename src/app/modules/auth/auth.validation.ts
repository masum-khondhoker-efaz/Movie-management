import z from "zod";
const loginUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email({
        message: "Invalid email format!",
      }).optional(),
      fullName: z.string({
      required_error: "Full Name is required!",
    }).optional(),
    password: z.string({
      required_error: "Password is required!",
    }),
  }),
});

export const authValidation = { loginUser };
