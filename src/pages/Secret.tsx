import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "../components/header";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";



interface Presente {
  id: string;
  nome: string;
  categoria: string;
  assinado: boolean;
  quemAssinou: string;
}

export default function ListaDePresentes() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchPresentes = async () => {
      const querySnapshot = await getDocs(collection(firestore, "presentes"));
      const lista: Presente[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome || doc.id,
          categoria: doc.data().categoria,
          assinado: doc.data().assinado,
          quemAssinou: doc.data().quemAssinou,
        });
      });
      setPresentes(lista);
    };
    fetchPresentes();
  }, []);

  const categoriaFormatada = (categoria: string) =>
    categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();

  const categorias = Array.from(new Set(presentes.map((p) => p.categoria)));
  const presentesFiltrados = presentes.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? p.categoria === selectedCategory : true)
  );

  return (
    <main className="bg-background px-6 py-10 min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8">
        <input
          type="text"
          placeholder="Buscar item"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">Todas as categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {categoriaFormatada(cat)}
            </option>
          ))}
        </select>
      </div>

      {presentesFiltrados.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div className="flex items-center gap-4">
            {item.assinado ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaRegCircle className="text-gray-400" />
            )}
            <span
              className={`text-lg ${
                item.assinado ? "line-through text-gray-500" : ""
              }`}
            >
              {item.nome}
            </span>
          </div>
          <span className="text-sm text-gray-600">{item.quemAssinou}</span>
        </div>
      ))}
    </main>
  );
}