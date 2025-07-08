import { useEffect, useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { MessageModel, TicketModel } from "../../../types/TicketModel";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { formatTime } from "../../../utils/Utils";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppRoutes } from "../../../AppRouter";

const TicketPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketModel>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [isTicketCloseModalOpen, setTicketCloseModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");

    const load = async () => {
      const response = await axios.get(`/tickets/${id}`);
      const responseData = await response.data;

      if (response.status !== 200) {
        setErrorMessage(responseData.message);
        return;
      }

      setTicket(responseData);
    };

    load();
  }, []);

  const openTicketCloseModal = () => {
    setTicketCloseModalOpen(true);
  };

  const closeTicketCloseModal = () => {
    setTicketCloseModalOpen(false);
  };

  const sendMessage = async () => {
    if (!message) return;
    const request = await axios.post(`/tickets/${id}/message`, {
      message: message,
    });

    if (request.status !== 200) {
      const req = await request.data();
      setErrorMessage(req.error || req.message || "Fehler beim Senden der Nachricht");
      return;
    }

    window.location.reload();
  };

  const close = async () => {
    closeTicketCloseModal();

    const request = await axios.post(`/tickets/${id}/close`);

    if (request.status !== 200) {
      const req = await request.data;
      setErrorMessage(req.message);
      return;
    }

    navigate(AppRoutes.TICKETS.path);
  };

  return (
    <>
      <ConfirmModal
        onClose={closeTicketCloseModal}
        onConfirm={close}
        open={isTicketCloseModalOpen}
      >
        Bist du sicher, dass du dieses Ticket schließen möchtest?
      </ConfirmModal>
      <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-8 font-satoshi">
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-500 mb-6 text-sm backdrop-blur-sm"
          >
            {errorMessage}
          </motion.p>
        )}
        {ticket && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-900 text-white p-6 rounded-lg border border-neutral-700/50 shadow-sm mb-8 backdrop-blur-sm"
          >
            {ticket.closed ? (
              <div className="relative px-4 py-3 bg-red-500/10 rounded-lg mb-4">
                Ticket wurde am {formatTime(ticket.closedAt!.toString())} von {ticket.closerName} geschlossen.
              </div>
            ) : null}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-white">{ticket.title}</h1>
                <p className="mb-6 text-neutral-400 text-sm">
                  {ticket.creatorName} ({ticket.creatorId})
                </p>
                <p className="text-base text-neutral-200">{ticket.message}</p>
              </div>
              {!ticket.closed && (
                <Button variant="secondary" onClick={openTicketCloseModal}>
                  Schließen
                </Button>
              )}
            </div>

            {ticket.messages.map((message: MessageModel, index: number) => (
              <Message ticketId={ticket.id} message={message} key={index} />
            ))}
          </motion.div>
        )}

        {!ticket?.closed && (
          <>
            <textarea
              className="w-full h-24 p-3 mb-4 border border-neutral-700/50 text-white bg-neutral-900/80 rounded-lg focus:outline-none focus:border-orange-400 transition-all duration-200 backdrop-blur-sm"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Schreibe eine Nachricht..."
            />
            <Button onClick={sendMessage}>Absenden</Button>
          </>
        )}
      </div>
    </>
  );
};

interface MessageInterface {
  ticketId: number;
  message: MessageModel;
}

const Message = ({ ticketId, message }: MessageInterface) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message.text);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const remove = async () => {
    console.log("Nachricht gelöscht:", message.message.id);
    await axios.delete(`/tickets/${ticketId}/message/${message.message.id}`);
  };

  const edit = () => setIsEditing(true);
  const saveEdit = async () => {
    setIsEditing(false);
    if (editedMessage === message.message.text) {
      return;
    }
    console.log("Nachricht bearbeitet:", editedMessage);
    const response = await axios.put(`/tickets/${ticketId}/message/${message.message.id}`, {
      body: JSON.stringify({ message: editedMessage }),
    });
    if (response.status !== 200) {
      const res = await response.data;
      console.error("Fehler beim Bearbeiten der Nachricht:", res.message);
      return;
    }
  };
  const cancelEdit = () => {
    setEditedMessage(message.message.text);
    setIsEditing(false);
  };

  return (
    <>
      <ConfirmModal onClose={closeDeleteModal} onConfirm={remove} open={isDeleteModalOpen}>
        Bist du sicher, dass du die Nachricht löschen möchtest?
      </ConfirmModal>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-4 p-5 border border-neutral-700/50 rounded-lg bg-neutral-900 hover:bg-neutral-800/80 transition-all duration-200 shadow-sm backdrop-blur-sm"
      >
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <p className="font-bold text-white text-sm">{message.sender.name}</p>
          <p
            className="text-white px-3 py-1 rounded-md text-center text-sm font-medium"
            style={{ background: message.sender.rank.color }}
          >
            {message.sender.rank.name}
          </p>
        </div>
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              className="border border-neutral-700/50 bg-neutral-900/80 text-white w-full p-2 rounded-lg focus:outline-none focus:border-orange-400 transition-all duration-200 backdrop-blur-sm"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            />
          ) : (
            <p className="text-neutral-200 text-base leading-relaxed">{message.message.text}</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-neutral-400">{formatTime(message.message.send.toString())}</p>
          <div className="flex space-x-3 mt-2">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={saveEdit}
                  className="text-orange-500 hover:text-orange-400"
                >
                  <Check size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={cancelEdit}
                  className="text-neutral-400 hover:text-orange-500"
                >
                  <X size={20} />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={edit}
                  className="text-orange-500 hover:text-orange-400"
                >
                  <Pencil size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={openDeleteModal}
                  className="text-red-500 hover:text-red-400"
                >
                  <X size={20} />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TicketPage;