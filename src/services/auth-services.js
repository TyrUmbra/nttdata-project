import collectionClient from "./collection-client";

export async function GetUsers() {
  const users = await collectionClient("/?results=15");
  return users.results;
}