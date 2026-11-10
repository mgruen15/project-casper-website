export type WaitlistEntry = {
  name: string;
  email: string;
  company: string;
  interest: string;
};

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when a Supabase project is configured. Otherwise the form shows a success state only. */
export const hasBackend = Boolean(url && key);

/**
 * Stores a pilot signup in the `waitlist` table (see supabase/schema.sql) via the Supabase REST API.
 * The anon key is public by design. Row level security only allows inserts.
 * Without configuration this resolves after a short delay so the success state can be shown.
 */
export async function submitWaitlist(entry: WaitlistEntry): Promise<void> {
  if (!hasBackend) {
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: key!,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: entry.name,
      email: entry.email.toLowerCase(),
      company: entry.company || null,
      interest: entry.interest,
    }),
  });
  // 409 means the email is already on the list. Treat it as success so we do not reveal who has signed up.
  if (!res.ok && res.status !== 409) throw new Error(`Waitlist request failed (${res.status})`);
}
