import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3, "too short to be consider as name").max(20, "very BIG to be consider as name"),
    password: z.string().min(6,"invalid input password must be six digit").max(20,"your password is too long than the allowed length")
});
export const CreateAvatarSchema = z.object({
    name: z.string().min(2,"name of the avatar is must required field please enter the name consist of min 2 ccharacter"),
    image: z.url("Must be a valid image URL"),
    prompt:z.string().min(4,"you must have to enter any prompt")
});
export const CreateVideoSchema = z.object({
    name: z.string().min(2,"name of the avatar is must required field please enter the name consist of min 2 ccharacter"),
    image: z.array(z.url("Must be a valid image URL")),
    prompt:z.string().optional
});
