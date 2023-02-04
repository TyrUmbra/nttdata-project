import { BASE_URI } from "../config";

export default async function collectionClient(
  endpoint = "/",
  { method, headers, body } = {}
) {
    
  let config;
  if (body) {
    if (body instanceof FormData) {
      config = {
        method: method || "POST",
        headers,
        body: body,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        ...headers,
      };
      config = {
        method: method || "POST",
        headers,
        body: JSON.stringify(body),
      };
    }
  } else {
    config = {
      method: method || "GET",
      headers,
    };
  }

  const response = await fetch(BASE_URI + endpoint, config);

  let data;
  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors);
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }

  return data;
}