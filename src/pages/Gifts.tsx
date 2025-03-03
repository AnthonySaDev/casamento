import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/header";
import { FaCheckCircle, FaRegCircle, FaGift } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import qrCode from "../assets/qrcode-pix.png";
import cozinha from "../assets/chapeu-de-chef.png";
import sala from "../assets/sala-de-estar.png";
import banheiro from "../assets/banheira.png";
import quarto from "../assets/quarto.png";
import lavanderia from "../assets/lavandaria.png";
import bambu from "../assets/bambu.jpg";

// Definindo as imagens para cada categoria
const categoryImages: { [key: string]: string } = {
  cozinha: cozinha,
  sala: sala,
  banheiro: banheiro,
  quarto: quarto,
  lavanderia: lavanderia,
};

interface Presente {
  id: string;
  nome: string;
  categoria: string;
  assinado: boolean;
  quemAssinou: string;
}

const Gifts = () => {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemToSign, setItemToSign] = useState<string | null>(null);
  const [doarEmDinheiro, setDoarEmDinheiro] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPresentes = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "presentes"));
        const presentesData: Presente[] = [];
        querySnapshot.forEach((doc) => {
          presentesData.push({
            id: doc.id,
            nome: doc.data().nome || doc.id.replace(/-/g, "/"),
            categoria: doc.data().categoria,
            assinado: doc.data().assinado,
            quemAssinou: doc.data().quemAssinou,
          });
        });
        setPresentes(presentesData);
      } catch (error) {
        console.error("Erro ao buscar presentes:", error);
      }
    };

    fetchPresentes();
  }, []);

  const categoriaFormatada = (categoria: string) => {
    return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
    setNome(""); // Limpa o campo de nome ao expandir/recolher
  };

  const abrirModal = (itemId: string) => {
    setItemToSign(itemId);
    setShowModal(true);
  };

  const assinarPresente = async () => {
    if (!nome.trim()) {
      alert("Digite seu nome para assinar o presente!");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(firestore, "presentes", itemToSign || "");
      await updateDoc(docRef, {
        assinado: true,
        quemAssinou: nome,
      });

      setPresentes((prev) =>
        prev.map((item) =>
          item.id === itemToSign
            ? { ...item, assinado: true, quemAssinou: nome }
            : item
        )
      );

      setLoading(false);
      setShowModal(false);
      setNome("");
      setExpandedItem(null);

      // Exibe o modal de agradecimento
      setShowThankYouModal(true);
    } catch (error) {
      console.error("Erro ao assinar presente:", error);
      setLoading(false);
    }
  };

  const cancelarAssinatura = () => {
    setShowModal(false);
    setItemToSign(null);
  };

  const handleDoarEmDinheiro = () => {
    setDoarEmDinheiro(!doarEmDinheiro);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const presentesFiltrados = presentes.filter(
    (item) =>
      item.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? item.categoria === selectedCategory : true)
  );

  const categorias = Array.from(new Set(presentes.map((item) => item.categoria)));

  return (
<motion.main
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-background px-8 sm:px-12 md:px-30 xl:px-48 min-h-screen"
>

      <Header />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="title-montserrat text-center my-8"
      >
        LISTA DE PRESENTES
      </motion.h1>

      <section>
        <h1 className="title-montserrat font-extrabold text-center my-8">
          Paleta de Cores:
        </h1>
        <div className="flex flex-col md:flex-row my-10 items-center justify-center gap-5">
          <div className="w-[200px] h-[200px] flex items-center justify-center bg-black shadow-xl">
            <p className="text-white text-center">Preto</p>
          </div>
          <div className="relative w-[200px] h-[200px]">
          <img
            src={bambu}
            alt="Bambu"
            className="w-full h-full object-cover shadow-xl"
          />
          <p className="absolute inset-0 flex items-center justify-center text-background font-bold ">
          Bambu
          </p>
        </div>

          <div className="w-[200px] h-[200px] flex items-center justify-center bg-white shadow-xl">
            <p className="text-black text-center">Branco</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 lg:gap-0">
        <div className="flex items-center gap-4">
          <RiSearchLine className="text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Buscar item"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 px-3 py-2 rounded-lg w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-700">Categoria:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoriaFormatada(categoria)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {categorias.length > 0 && (
        <motion.div
          className="my-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {categorias.map((categoria) => {
            const presentesNaCategoria = presentesFiltrados.filter(
              (item) => item.categoria === categoria
            );
            return (
              (selectedCategory === "" || selectedCategory === categoria) && (
                <div key={categoria}>
                  <div className="flex items-center gap-4 my-4">
                    {/* Exibe a imagem da categoria */}
                    <img
                      src={categoryImages[categoria.toLowerCase()]}
                      alt={categoria}
                      className="w-12 h-12 object-cover"
                    />
                    <h2 className="text-2xl font-bold my-4 capitalize">
                      {categoriaFormatada(categoria)}
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {presentesNaCategoria.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <section className="flex items-center gap-4">
                            <button className="text-[#6D4B3D]">
                              {item.assinado ? (
                                <FaCheckCircle className="text-2xl text-[#6D4B3D]" />
                              ) : (
                                <FaRegCircle className="text-2xl text-gray-300" />
                              )}
                            </button>
                            <span
                              style={{
                                textDecoration: item.assinado ? "line-through" : "none",
                              }}
                              className="text-lg text-[#767676]"
                            >
                              {item.nome}
                            </span>
                          </section>
                          {item.assinado && (
                            <span className="text-amber-900 italic text-sm">
                              Assinado por: {item.quemAssinou}
                            </span>
                          )}
                        </div>

                        {expandedItem === item.id && !item.assinado && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-4 flex gap-4"
                          >
                            <input
                              type="text"
                              placeholder="Seu nome"
                              value={nome}
                              onChange={(e) => setNome(e.target.value)}
                              className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                            />
                            <button
                              onClick={() => abrirModal(item.id)}
                              className="bg-secondary-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              {loading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                              ) : (
                                "Assinar"
                              )}
                            </button>
                          </motion.div>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )
            );
          })}
        </motion.div>
      )}

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg w-1/2 text-center">
            <section>
              <h2 className="text-xl mb-4">
                <FaGift className="text-4xl text-[#6D4B3D]" />
                <br />
                Confirme sua assinatura
              </h2>
              <p className="mb-4">
                Você pode fazer a doação em dinheiro ou entregar pessoalmente. Ao confirmar, o presente será assinado.
              </p>

              <button
                className="italic cursor-pointer text-zinc-600 font-semibold hover:text-zinc-900 px-4 py-2 rounded-lg mt-4"
                onClick={handleDoarEmDinheiro}
              >
                {doarEmDinheiro ? "Entregar pessoalmente" : "Doar em dinheiro"}
              </button>

              {doarEmDinheiro && (
                <div className="mt-4 text-center flex flex-col items-center justify-center">
                  <p>Chave pix: 15209492605</p>
                  <span>ou</span>
                  <img src={qrCode} alt="QR Code" />
                </div>
              )}
            </section>
            <div className="flex justify-center gap-10 mt-4">
              <button
                onClick={cancelarAssinatura}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={assinarPresente}
                className="bg-[#6D4B3D] hover:brightness-125 duration-100 ease-in-out text-white px-4 py-2 rounded-lg"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <span>Assinar</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agradecimento */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg w-1/2 text-center">
            <h2 className="text-xl mb-4">
              <FaGift className="text-4xl text-[#6D4B3D]" />
              <br />
              Obrigado pela sua contribuição!
            </h2>
            <p className="mb-4">
              Sua generosidade ajudará muito. Agradecemos de coração!
            </p>
            <button
              onClick={() => setShowThankYouModal(false)}
              className="bg-[#6D4B3D] text-white px-6 py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </motion.main>
  );
};

export default Gifts;
