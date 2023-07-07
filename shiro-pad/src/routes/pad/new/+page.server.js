import { ulid } from "ulid";
import { redirect } from "@sveltejs/kit";

export function load() {
  throw redirect(307, `/pad/${ulid()}`);
}