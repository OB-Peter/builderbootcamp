const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchCourses() {
  const res = await fetch(`${API_URL}/api/students/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function initPayment(studentData) {
  const res = await fetch(`${API_URL}/api/payments/initialize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error("Failed to initialize payment");
  return res.json(); // { authorization_url, reference, access_code }
}

export async function verifyPayment(reference) {
  const res = await fetch(`${API_URL}/api/payments/verify/${reference}`);
  if (!res.ok) throw new Error("Failed to verify payment");
  return res.json();
}
