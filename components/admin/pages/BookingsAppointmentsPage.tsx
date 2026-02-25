import React, { useState } from 'react';
import { Booking } from '../../../lib/types';
import { cn } from '../../../lib/utils';
import Button from '../../ui/button';

interface BookingsAppointmentsPageProps {
  bookings: Booking[];
  onDeleteBooking: (id: string) => void;
  onAddBooking: (booking: Omit<Booking, 'id'>) => void;
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  statusFilter: Booking['status'] | 'All';
  onStatusFilterChange: (status: Booking['status'] | 'All') => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const BookingsAppointmentsPage: React.FC<BookingsAppointmentsPageProps> = ({
  bookings,
  onDeleteBooking,
  onAddBooking,
  onUpdateBookingStatus,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Omit<Booking, 'id'>>({
    clientName: '',
    clientEmail: '',
    serviceId: '',
    serviceName: '',
    date: '',
    time: '',
    status: 'Pending',
    amount: 0,
  });

  const resetForm = () =>
    setForm({
      clientName: '',
      clientEmail: '',
      serviceId: '',
      serviceName: '',
      date: '',
      time: '',
      status: 'Pending',
      amount: 0,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.serviceName || !form.date || !form.time) return;
    const payload = {
      ...form,
      serviceId: form.serviceId || form.serviceName.toLowerCase().replace(/\s+/g, '-'),
      amount: Number(form.amount) || 0,
    };
    onAddBooking(payload);
    resetForm();
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings & Appointments</h2>
        <div className="flex flex-wrap gap-2">
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search client or service"
            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary text-gray-900 dark:text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as Booking['status'] | 'All')}
            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary h-10 text-gray-900 dark:text-white"
          >
            <option value="All">All Statuses</option>
            {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Button className="gap-2" onClick={() => setIsAdding((v) => !v)}>
            {isAdding ? 'Close' : '+ New Booking'}
          </Button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
              placeholder="Client Name"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            />
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
              placeholder="Client Email"
              type="email"
              value={form.clientEmail}
              onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
            />
            <input
              className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
              placeholder="Service Name"
              value={form.serviceName}
              onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                placeholder="Date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <input
                className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                placeholder="Time"
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                placeholder="Amount"
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              />
              <select
                className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Booking['status'] })}
              >
                {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => { setIsAdding(false); resetForm(); }}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.clientName || !form.clientEmail || !form.serviceName || !form.date || !form.time}>
              Save Booking
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-bold text-gray-400 dark:text-gray-300">
              <tr>
                <th className="p-6">Client</th>
                <th className="p-6">Service</th>
                <th className="p-6">Date & Time</th>
                <th className="p-6">Amount</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">{booking.clientName}</td>
                  <td className="p-6">{booking.serviceName}</td>
                  <td className="p-6">
                    <div className="font-bold">{booking.date}</div>
                    <div className="text-xs opacity-70">{booking.time}</div>
                  </td>
                  <td className="p-6 font-mono">${booking.amount}</td>
                  <td className="p-6">
                    <select
                      value={booking.status}
                      onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as Booking['status'])}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-bold uppercase border',
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-700'
                          : booking.status === 'Pending'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-700'
                          : booking.status === 'Cancelled'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-700'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                      )}
                    >
                      {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-6 text-right">
                    <button onClick={() => onDeleteBooking(booking.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsAppointmentsPage;
