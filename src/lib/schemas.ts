import { z } from "zod";
export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive the newsletter." }),
  }),
});
export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().min(2, "Please enter your company."),
  role: z.string().min(2, "Please enter your role."),
  interest: z.string().min(1, "Please select an option."),
  message: z.string().min(20, "Please include at least 20 characters in your message."),
  links: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required." }) }),
});
