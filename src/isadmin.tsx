type DecodedPayload = {
  username: string;
  role: string;
  exp: number;
};

export function isAdmin(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payloadBase64 = token.split('.')[1]; // pega o payload
    const payloadJson = atob(payloadBase64); // decodifica de base64 para string JSON
    const payload: DecodedPayload = JSON.parse(payloadJson); // converte string para objeto

    return payload.role === "admin";
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return false;
  }
}