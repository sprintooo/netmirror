// Serves /ads.txt for Google AdSense.
//
// The publisher ID is reused from NEXT_PUBLIC_ADSENSE_CLIENT (the same value
// the AdSense loader uses), so there is only one place to update it. The env
// value is in `ca-pub-XXXX` form, but ads.txt requires the `pub-XXXX` form, so
// the `ca-` prefix is stripped here.
//
// f08c47fec0942fa0 is Google's fixed certification authority (TAG) ID — it is
// the same for every AdSense publisher.

export const dynamic = "force-static";

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
  const pubId = client.replace(/^ca-/, "");

  const body = pubId
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : "";

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
