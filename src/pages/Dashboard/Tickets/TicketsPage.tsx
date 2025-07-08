import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import CreateTicketModal from "../../../components/CreateTicketModal";
import { TicketModel } from "../../../types/TicketModel";
import { formatTime } from "../../../utils/Utils";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import { TicketListResponse } from "../../../types/TicketListResponse";

const TicketsPage = () => {
  const [tickets, setTickets] = useState<TicketListResponse>({
    tickets: [],
    total: 0,
    page: 1,
    size: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const [filter, setFilter] = useState<string>("Open");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ticketsPerPage = 5;

  const handleSetFilter = (filter: string) => {
    setFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
    switch (filter) {
      case "Open":
        setShowAll(false);
        break;
      case "All":
        setShowAll(true);
        break;
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(
          `/tickets?showClosed=${showAll ? "true" : "false"}&page=${currentPage}`
        );
        if (response.status !== 200) {
          setErrorMessage(response.data.message);
          return;
        }
        setTickets(response.data);
      } catch (error) {
        setErrorMessage("Failed to load tickets. Please try again.");
      }
    };

    load();
  }, [currentPage, showAll]);

  const openTicketModal = () => {
    setTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setTicketModalOpen(false);
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-8 font-satoshi">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg text-white bg-neutral-900
              ${
                filter === "Open"
                  ? "bg-neutral-800/80 bg-orange-400 border border-orange-400 shadow-orange-500/50"
                  : "hover:bg-neutral-800/80 hover:text-orange-500"
              }
              transition-all duration-200 backdrop-blur-sm
            `}
            onClick={() => handleSetFilter("Open")}
          >
            Offene Tickets
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg text-white bg-neutral-900
              ${
                filter === "All"
                  ? "bg-neutral-800/80 bg-orange-400 border border-orange-400 shadow-orange-500/50"
                  : "hover:bg-neutral-800/80 hover:text-orange-500"
              }
              transition-all duration-200 backdrop-blur-sm
            `}
            onClick={() => handleSetFilter("All")}
          >
            Alle Tickets
          </motion.button>
        </div>
        <Button onClick={openTicketModal}>Neues Ticket erstellen</Button>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-4 mb-8 rounded-lg backdrop-blur-sm"
        >
          {errorMessage}
        </motion.div>
      )}

      <div className="space-y-4">
        {currentTickets.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-400 text-center text-sm"
          >
            Keine Tickets gefunden.
          </motion.p>
        ) : (
          currentTickets.map((ticket: TicketModel, index: number) => (
            <motion.div
              key={ticket.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-neutral-900 p-4 rounded-lg border border-neutral-700/50 hover:bg-neutral-800/80 transition-all duration-200 backdrop-blur-sm"
            >
              <Link to={`${ticket.id}`} className="block">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-white">{ticket.title}</h3>
                  <span
                    className="px-3 py-1 text-sm rounded-lg text-white bg-neutral-800/80 backdrop-blur-sm"
                    style={{
                      backgroundColor: ticket.category.typeColor.background,
                      color: ticket.category.typeColor.font,
                    }}
                  >
                    {ticket.category.type}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 mt-2">
                  Geöffnet {formatTime(ticket.created.toString())}
                </p>
              </Link>
            </motion.div>
          ))
        )}
      </div>

            <div className="fixedmx-auto">
                <Pagination
                totalItems={tickets.size}
                itemsPerPage={ticketsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                />
            </div>

  {ticketModalOpen && <CreateTicketModal onClose={closeTicketModal} />}

      {ticketModalOpen && <CreateTicketModal onClose={closeTicketModal} />}
    </div>
  );
};

export default TicketsPage;