import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/header";
import { FaCheckCircle, FaRegCircle, FaGift, FaRegMoneyBillAlt, FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import qrCode from "../assets/qrcode-pix.png";
import cozinha from "../assets/chapeu-de-chef.png";
import sala from "../assets/sala-de-estar.png";
import banheiro from "../assets/banheira.png";
import quarto from "../assets/quarto.png";
import lavanderia from "../assets/lavanderia.png";
import bambu from "../assets/bambu.jpg";
import luademel from "../assets/luaDeMel.png";

const categoryImages: { [key: string]: string } = {
  cozinha: cozinha,
  sala: sala,
  banheiro: banheiro,
  quarto: quarto,
  lavanderia: lavanderia,
  luademel: luademel,
}
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
  const [selectedDonationMethod, setSelectedDonationMethod] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemToSign, setItemToSign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

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
        
        const categories = Array.from(new Set(presentesData.map(item => item.categoria)));
        const initialExpandedState: { [key: string]: boolean } = {};
        categories.forEach(cat => {
          initialExpandedState[cat] = false;
        });
        setExpandedCategories(initialExpandedState);
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
    setNome(""); 
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const abrirModal = (itemId: string) => {
    if(!nome) return
    setItemToSign(itemId);
    setShowModal(true);
    setSelectedDonationMethod(null);
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
            <p className="absolute inset-0 flex items-center justify-center text-background font-bold">
              Bambu
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 lg:gap-0 mb-12">
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
          className="my-12 pb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {categorias.map((categoria) => {
            const presentesNaCategoria = presentesFiltrados.filter(
              (item) => item.categoria === categoria
            );
            
            const isExpanded = selectedCategory ? 
              (selectedCategory === categoria) : 
              expandedCategories[categoria];

            return (
              (selectedCategory === "" || selectedCategory === categoria) && (
                <div key={categoria} className="mb-16 border-b border-gray-200 pb-8 last:border-0">
                  <div 
                    className="flex items-center justify-between gap-4 py-4 cursor-pointer"
                    onClick={() => toggleCategory(categoria)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={categoryImages[categoria.toLowerCase().replace(/\s/g, "")]}
                        alt={categoria}
                        className="w-12 h-12 object-cover"
                      />
                      <h2 className="text-2xl font-bold capitalize">
                        {categoriaFormatada(categoria)}
                      </h2>
                    </div>
                    {isExpanded ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                  
                  {isExpanded && (
                    <motion.ul 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 overflow-hidden mt-6"
                    >
                      {presentesNaCategoria.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="border-b border-gray-100 pb-6 last:border-0"
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
                          </div>

                          {expandedItem === item.id && !item.assinado && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="mt-6 flex gap-4"
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
                    </motion.ul>
                  )}
                </div>
              )
            );
          })}
        </motion.div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg w-full md:w-1/2 mx-4 text-center max-h-[90vh] overflow-y-auto">
            <section>
              <h2 className="text-xl mb-4">
                <FaGift className="text-4xl text-[#6D4B3D]" />
                <br />
                Confirme sua assinatura
              </h2>
              <p className="mb-4">
                Escolha o método de contribuição. Ao confirmar, o presente será assinado.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center my-6">
                <button
                  onClick={() => setSelectedDonationMethod('dinheiro')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDonationMethod === 'dinheiro'
                      ? 'border-[#6D4B3D] bg-[#6D4B3D]/10'
                      : 'border-gray-300 hover:border-[#6D4B3D]/50'
                  }`}
                >
                  <FaRegMoneyBillAlt className="text-3xl mx-auto mb-2" />
                  <span className="font-semibold">Doar em Dinheiro</span>
                </button>

                <button
                  onClick={() => setSelectedDonationMethod('casa')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDonationMethod === 'casa'
                      ? 'border-[#6D4B3D] bg-[#6D4B3D]/10'
                      : 'border-gray-300 hover:border-[#6D4B3D]/50'
                  }`}
                >
                  <FaHome className="text-3xl mx-auto mb-2" />
                  <span className="font-semibold">Entregar em Casa</span>
                </button>
              </div>

              {selectedDonationMethod === 'dinheiro' && (
                <div className="mt-6 text-center flex flex-col items-center justify-center">
                  <p className="mb-2">Chave PIX: 15209492605</p>
                  <div className="bg-white p-2 rounded-lg shadow-lg">
                    <img 
                      src={qrCode} 
                      alt="QR Code PIX" 
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Escaneie o QR Code ou use a chave PIX
                  </p>
                </div>
              )}

              {selectedDonationMethod === 'casa' && (
                <div className="mt-6 text-center space-y-2">
                  <p className="font-semibold">Endereço para entrega:</p>
                  <p className="text-gray-700">
                    Rua Abel Sena, 638<br />
                    Bairro Eldorado<br />
                    ou <br />
                    Rua Ana Ferreira Antunes, 201<br />
                    Bairro Santa Eugênia
                  </p>
                  <p className="mt-4 text-sm text-gray-600">
                    Por favor, entre em contato para combinar a entrega
                  </p>
                </div>
              )}
            </section>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
              <button
                onClick={cancelarAssinatura}
                className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={assinarPresente}
                disabled={!selectedDonationMethod}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  selectedDonationMethod
                    ? 'bg-[#6D4B3D] hover:bg-[#5D3B2D] text-white'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
                ) : (
                  'Confirmar Assinatura'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showThankYouModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg w-full md:w-1/2 text-center max-h-[90vh] overflow-y-auto">
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