export const POST = async (path: string, body: object) =>
  await fetch(`http://localhost:1234${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
