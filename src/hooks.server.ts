import { PASSPHRASE, APPKEY } from "$env/static/private";
import { json, type Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api")) {
    try {
      if (
        event.request.clone().headers.get("passphrase") !== PASSPHRASE ||
        event.request.clone().headers.get("APPKEY") !== APPKEY
      ) {
        return json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (error) {
      /* empty */
    }
  }

  return await resolve(event);
}) satisfies Handle;
