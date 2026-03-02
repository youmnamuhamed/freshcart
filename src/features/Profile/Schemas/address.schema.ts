import { z } from "zod";

export const addAddressSchema = z.object({
  name: z.string().min(3, "Address name must be at least 3 characters"),

  details: z.string().min(10, "Address details must be at least 10 characters"),

  phone: z.string().regex(/^01[0-9]{9}$/, "Invalid Egyptian phone number"),

  city: z.string().min(2, "City must be at least 2 characters"),
});

export type AddAddressFormValues = z.infer<typeof addAddressSchema>;
