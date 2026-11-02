import { useReducer, useEffect, useState, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer } from "../reducers/favouritesReducer";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");

  const [favs, dispatch] = useReducer(favouritesReducer, [], () =>
    JSON.parse(localStorage.getItem("favs") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const filtered = useMemo(
    () =>
      photos.filter((p) =>
        p.author.toLowerCase().includes(query.toLowerCase())
      ),
    [photos, query]
  );

  if (loading) {
    return (
      <div className="mx-auto mt-20 h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-700" />
    );
  }

  if (error) {
    return <p className="p-4 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search by author..."
        className="mb-4 w-full rounded border p-2"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <div key={p.id} className="overflow-hidden rounded bg-white shadow">
            <img
              src={`https://picsum.photos/id/${p.id}/400/300`}
              alt={p.author}
              className="h-48 w-full object-cover"
            />
            <div className="flex items-center justify-between p-2">
              <span>{p.author}</span>
              <button
                onClick={() => dispatch({ type: "TOGGLE", id: p.id })}
                className="text-2xl text-red-500"
              >
                {favs.includes(p.id) ? "♥" : "♡"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}