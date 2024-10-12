import { useState, useEffect } from "react";
import MissingPerson from "../models/missing-person";
import { findAllMissingPersons } from "../services/missing-person-service";

export default function useHomeViewModel() {
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMissingPersons = async () => {
    setLoading(true);
    try {
      const data = await findAllMissingPersons();
      setMissingPersons(data);
    } catch (err) {
      setError("Failed to fetch missing persons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissingPersons();
  }, []);
  return { missingPersons, loading, error, fetchMissingPersons };
}
