import MissingPerson from "../models/missing-person";
import { API_URL } from "@/enviroments";

export async function findAllMissingPersons(): Promise<MissingPerson[]> {
  try {
    console.log("Fetching missing persons...");
    const response = await fetch(API_URL + "missing-persons");

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.data && Array.isArray(data.data)) {
      const missingPersons = data.data.map(
        (person: any) =>
          new MissingPerson(
            person.id,
            person.name,
            person.age,
            person.gender,
            person.last_location,
            person.registered_by,
            person.description,
            person.first_photo,
            person.second_photo,
            person.third_photo,
            person.third_photo,
            person.status_id
          )
      );

      return missingPersons;
    } else {
      console.error("Invalid response format: 'data' is not an array");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch missing persons:", error);
    throw error;
  }
}
