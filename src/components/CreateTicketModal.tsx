import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";
import Button from "./Button";
import { CategoryModel } from "../types/CategoryModel";
import { motion } from "framer-motion";

const CreateTicketModal = ({ onClose }: { onClose: () => void }) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", message: "", category: "" });
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`/tickets/categories`);
        const responseData = await response.data;

        console.log(responseData);

        if (response.status !== 200) {
          setErrorMessage(responseData.message);
          return;
        }

        setCategories(responseData);
      } catch (error) {
        setErrorMessage("Failed to load categories.");
      }
    };

    load();
  }, [navigate]);

  const create = async () => {
    setCreating(true);
    try {
      const request = await axios.post(`/tickets`, {
        title: form.title,
        message: form.message,
        category: categories.find((cat) => cat.name === form.category)?.id || null,
      });

      const req = await request.data;
      if (request.status !== 200) {
        setErrorMessage(req.message);
        return;
      }

      navigate(`/tickets/${req.id}`);
    } catch (error) {
      setErrorMessage("Failed to create ticket.");
    }
    setCreating(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col bg-neutral-900 text-white p-6 rounded-lg border border-neutral-700/50 shadow-lg max-w-md w-full mx-auto font-satoshi backdrop-blur-sm"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-orange-500"
        >
          <X size={20} />
        </motion.button>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-4 mb-6 rounded-lg backdrop-blur-sm"
          >
            {errorMessage}
          </motion.div>
        )}

        <h1 className="text-lg font-medium text-white mb-4 text-center">Neues Ticket erstellen</h1>

        <label className="text-sm font-medium text-white mb-1" htmlFor="title">
          Titel
        </label>
        <input
          className="border border-neutral-700/50 rounded-lg p-3 mb-4 bg-neutral-900/80 text-white text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 backdrop-blur-sm"
          onChange={handleInputChange}
          value={form.title}
          name="title"
          id="title"
          placeholder="Titel eingeben"
        />

        <label className="text-sm font-medium text-white mb-1" htmlFor="message">
          Nachricht
        </label>
        <textarea
          className="border border-neutral-700/50 rounded-lg p-3 mb-4 bg-neutral-900/80 text-white text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 backdrop-blur-sm"
          onChange={handleInputChange}
          value={form.message}
          name="message"
          id="message"
          placeholder="Nachricht eingeben"
          rows={5}
        />

        <label className="text-sm font-medium text-white mb-1" htmlFor="category">
          Kategorie
        </label>
        <select
          className="border border-neutral-700/50 rounded-lg p-3 mb-6 bg-neutral-900/80 text-white text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 backdrop-blur-sm"
          onChange={handleInputChange}
          value={form.category}
          name="category"
          id="category"
        >
          <option value="" disabled>
            Kategorie auswählen
          </option>
          {categories.map((category: CategoryModel, index: number) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <Button disabled={creating} onClick={create}>
          {creating ? "Ticket wird erstellt..." : "Neues Ticket erstellen"}
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateTicketModal;