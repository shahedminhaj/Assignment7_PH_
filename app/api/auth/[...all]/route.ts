type AuthMethod = "GET" | "POST";

async function handleAuthRequest(request: Request, method: AuthMethod): Promise<Response> {
  if (!process.env.MONGODB_URI) {
    return Response.json(
      { message: "Authentication is not configured. Set MONGODB_URI to enable sign-in." },
      { status: 503 },
    );
  }

  const [{ auth }, { toNextJsHandler }] = await Promise.all([
    import("@/lib/auth"),
    import("better-auth/next-js"),
  ]);
  const handlers = toNextJsHandler(auth.handler);
  return handlers[method](request);
}

export const GET = (request: Request) => handleAuthRequest(request, "GET");
export const POST = (request: Request) => handleAuthRequest(request, "POST");
