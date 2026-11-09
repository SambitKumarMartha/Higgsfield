import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3, "too short to be consider as name").max(20, "very BIG to be consider as name"),
    password: z.string().min(6,"invalid input password must be six digit").max(20,"your password is too long than the allowed length")
})
