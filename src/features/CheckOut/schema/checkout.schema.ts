import z from "zod";

export const shippingAddressSchema = z.object({
  details: z
    .string()
    .nonempty("address details is required")
    .min(10, "Address must be at least 10 charachters long")
    .max(200),
  phone: z
    .string()
    .nonempty(" phone is required")
    .regex(/^01[0125][0-9]{8}$/, "Invalid egyptian number"),
  city: z
    .string()
    .nonempty("city is required")
    .min(2, "city must be at least 2 charachters long")
    .max(50, " city must be st most 50 charachters long"),
});

export type shippingAddressValues = z.infer<typeof shippingAddressSchema>;
