import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TicketModel } from "../../../types/TicketModel";
import { formatTime } from "../../../utils/Utils";

const AdminTicketsPage = () => {
    const [tickets, setTickets] = useState<TicketModel[]>([
        {
            category: {
                type: 'test',
                typeColor: {
                    background: 'red',
                    font: 'green'
                }
            },
            closed: false,
            closerName: 'test',
            created: new Date(),
            creatorId: 0,
            creatorName: 'tt',
            id: 0,
            isEditor: true,
            message: 'Hey',
            messages: [],
            title: 'Hey',
            closedAt: new Date()
        }
    ]);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [filter, setFilter] = useState<string>('Open');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(5);

    const fetchTickets = async (page: number, filter: string) => {
        try {
            const response = await axios.get(`/tickets`, {
                params: { page, filter }
            });
            setTickets(response.data.tickets);
            setTotalPages(response.data.totalPages);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Fehler beim Laden der Tickets");
        }
    };

    useEffect(() => {
        fetchTickets(currentPage, filter);
    }, [currentPage, filter]);

    return (
        <div className="bg-neutral-900 min-h-screen p-10">
            <div className="flex justify-between items-center mb-6">
            {errorMessage && <p className="text-white mb-4">{errorMessage}</p>}
            <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                            filter === 'Open' ? 'bg-primary text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                        onClick={() => setFilter('Open')}
                    >
                        Offene Tickets
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                            filter === 'All' ? 'bg-primary text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                        onClick={() => setFilter('All')}
                    >
                        Alle Tickets
                    </button>
            </div>
            </div>
            <div className="space-y-4">
            {tickets.map((ticket: TicketModel) => (
                <div
                className="bg-neutral-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
                <Link to={`/tickets/${ticket.id}`} className="block">
                    <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                                <span
                                    className="px-3 py-1 text-sm rounded-full"
                                    style={{
                                        backgroundColor: ticket.category.typeColor.background,
                                        color: ticket.category.typeColor.font,
                                    }}
                                >
                                    {ticket.category.type}
                                </span>
                            </div>
                        <p className="text-sm text-neutral-400 mt-1">{ticket.creatorName} um {formatTime(ticket.created.toString())}</p>
                    </Link>
                </div>
            ))}
            </div>
            <div className="flex justify-end mt-4">
                {totalPages > 1 && (
                    <nav className="block">
                        <ul className="flex pl-0 list-none rounded overflow-hidden">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                <li key={pageNumber}>
                                    <button
                                        className={`px-4 py-2 mx-1 text-sm font-medium rounded transition-colors ${
                                            pageNumber === currentPage ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                                        }`}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default AdminTicketsPage;