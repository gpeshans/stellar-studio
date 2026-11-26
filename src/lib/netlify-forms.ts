type FieldValue = string | File | null | undefined;

/**
 * Sends a submission to Netlify Forms. On Netlify's Next.js runtime, forms
 * are registered through their static copies in public/__forms.html and must
 * be posted there with fetch. Every field sent must exist on that copy.
 *
 * Empty values are left out. A submission with a file goes as multipart, so
 * the browser sets the Content-Type and its boundary; anything else goes
 * URL-encoded, as Netlify recommends.
 */
export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, FieldValue>,
): Promise<boolean> {
  const all: Record<string, FieldValue> = { "form-name": formName, ...fields };
  const entries = Object.entries(all).filter(
    (entry): entry is [string, string | File] =>
      entry[1] instanceof File ? entry[1].size > 0 : Boolean(entry[1]),
  );
  const hasFile = entries.some(([, value]) => value instanceof File);

  let init: RequestInit;
  if (hasFile) {
    const body = new FormData();
    for (const [key, value] of entries) body.append(key, value);
    init = { method: "POST", body };
  } else {
    init = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(entries as [string, string][]).toString(),
    };
  }

  try {
    const response = await fetch("/__forms.html", init);
    return response.ok;
  } catch {
    return false;
  }
}
