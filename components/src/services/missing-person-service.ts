import axios from 'axios';
import MissingPerson from "../models/missing-person";
import { API_URL, PAGINATION } from "@/enviroments";

export async function findAllMissingPersons(page: number, limit: number): Promise<MissingPerson[]> {
  try {
    const response = await axios.get(`${API_URL}missing-persons`, {
      params: { page, limit },
    });

    const data = response.data;
    if (data && Array.isArray(data)) {
      const missingPersons = data.map(
        (person: any) =>
          new MissingPerson(
            person.id,
            person.name,
            person.age,
            person.gender,
            person.last_location,
            person.disappearance_date,
            person.registered_by,
            person.description,
            person.first_photo,
            person.second_photo,
            person.third_photo,
            person.fourth_photo,
            person.status_id,
            person.status,
            person.user,
            person.created_at
          )
      );
      return missingPersons;
    } else {
      console.error("Invalid response format: 'data.items' is not an array");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch missing persons:", error);
    throw error;
  }
}
