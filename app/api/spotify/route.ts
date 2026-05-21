import { NextResponse } from "next/server";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  console.log("clientId:", clientId);
  console.log("clientSecret:", clientSecret ? "exists" : "missing");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  console.log("token response:", data);
  return data.access_token;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) return NextResponse.json({ error: "No ids" }, { status: 400 });

  const token = await getAccessToken();
  console.log("token:", token ? "exists" : "missing");

  const res = await fetch(
    `https://api.spotify.com/v1/albums?ids=${ids}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();
  console.log("spotify response:", JSON.stringify(data).slice(0, 200));
  return NextResponse.json(data);

}