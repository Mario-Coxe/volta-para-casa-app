import { useState, useEffect } from "react";
import MissingPerson from "../models/missing-person";
import { findAllMissingPersons } from "../services/missing-person-service";
import { PAGINATION } from "@/enviroments";
export default function useHomeViewModel() {
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(PAGINATION.page);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // Verifica se há mais itens para carregar

  const limit = PAGINATION.limit; // Itens por página

  const fetchMissingPersons = async (page: number) => {
    setLoading(page === 1); // Mostra loading apenas na primeira página
    setLoadingMore(page > 1); // Loading ao carregar mais itens
    try {
      const data = await findAllMissingPersons(page, limit);
      if (data.length < limit) {
        setHasMore(false); // Se não houver mais itens, define hasMore como falso
      }

      setMissingPersons(prev => (page === 1 ? data : [...prev, ...data])); // Acumula itens ao rolar
    } catch (err) {
      setError("Failed to fetch missing persons");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMissingPersons(PAGINATION.page); // Carrega a primeira página ao montar o componente
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchMissingPersons(nextPage);
        return nextPage;
      });
      console.log("page", page)

    }
  };

  return { missingPersons, loading, error, fetchMissingPersons, loadMore, loadingMore, hasMore, page, setPage, setHasMore};
}
