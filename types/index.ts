import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["user"]["Row"];

export type User = Profile & {
  fullname: string;
};
