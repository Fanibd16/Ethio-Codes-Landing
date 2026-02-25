import React from 'react';
import { Lead } from '../../../lib/types';
import { cn } from '../../../lib/utils';
import Button from '../../ui/button';
import { ActionTab, Interaction } from './types';

interface ClientsPageProps {
  filteredClients: Lead[];
  selectedClient: Lead | null;
  clientSearch: string;
  clientFilter: string;
  clientStatusFilter: Lead['status'] | 'All';
  availableTags: string[];
  crmHistory: Interaction[];
  actionTab: ActionTab;
  actionSubject: string;
  actionContent: string;
  isSending: boolean;
  onClientSearchChange: (value: string) => void;
  onClientFilterChange: (value: string) => void;
  onOpenClientCRM: (client: Lead) => void;
  onCloseClientCRM: () => void;
  onToggleTag: (leadId: string, tag: string) => void;
  onActionTabChange: (tab: ActionTab) => void;
  onActionSubjectChange: (value: string) => void;
  onActionContentChange: (value: string) => void;
  onSendAction: () => void;
  onStatusFilterChange: (value: Lead['status'] | 'All') => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({
  filteredClients,
  selectedClient,
  clientSearch,
  clientFilter,
  clientStatusFilter,
  availableTags,
  crmHistory,
  actionTab,
  actionSubject,
  actionContent,
  isSending,
  onClientSearchChange,
  onClientFilterChange,
  onOpenClientCRM,
  onCloseClientCRM,
  onToggleTag,
  onActionTabChange,
  onActionSubjectChange,
  onActionContentChange,
  onSendAction,
  onStatusFilterChange,
}) => {
  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      {!selectedClient ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search clients..."
                value={clientSearch}
                onChange={(e) => onClientSearchChange(e.target.value)}
                className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary w-64 text-gray-900 dark:text-white"
              />
              <select
                value={clientFilter}
                onChange={(e) => onClientFilterChange(e.target.value)}
                className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary h-10 text-gray-900 dark:text-white"
              >
                <option value="All">All Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <select
                value={clientStatusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as Lead['status'] | 'All')}
                className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary h-10 text-gray-900 dark:text-white"
              >
                <option value="All">All Statuses</option>
                {(['New', 'Contacted', 'Closed', 'Client', 'VIP'] as const).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="h-10 text-xs">
                Export CSV
              </Button>
            </div>
          </div>
          <div className="rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-bold text-gray-400 dark:text-gray-300">
                  <tr>
                    <th className="p-6">Client Name</th>
                    <th className="p-6">Contact</th>
                    <th className="p-6">Industry</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.02] group cursor-pointer"
                      onClick={() => onOpenClientCRM(client)}
                    >
                      <td className="p-6">
                        <div className="text-gray-900 dark:text-white font-bold text-base group-hover:text-primary transition-colors">{client.name}</div>
                        <div className="flex gap-1 mt-1">
                          {client.tags?.map((tag) => (
                            <span key={tag} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="text-gray-900 dark:text-white">{client.email}</div>
                        <div className="text-xs text-gray-500">{client.phone}</div>
                      </td>
                      <td className="p-6">{client.industry}</td>
                      <td className="p-6">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-bold uppercase border',
                            client.status === 'New'
                              ? 'bg-primary/20 text-primary border-primary/30'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                          )}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                          Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                        No clients found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="space-y-6">
            <Button variant="ghost" className="pl-0 gap-2 text-gray-500 hover:text-foreground" onClick={onCloseClientCRM}>
              {'<-'} Back to Clients
            </Button>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-3xl font-bold text-white mb-4">
                {selectedClient.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedClient.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{selectedClient.industry}</p>

              <div className="grid grid-cols-2 gap-2 text-left bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-xs mb-6">
                <div>
                  <p className="text-gray-400 uppercase font-bold">Total Spend</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">${selectedClient.totalSpend || 0}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase font-bold">Bookings</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Email</span> {selectedClient.email}
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Phone</span> {selectedClient.phone}
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Website</span> {selectedClient.website}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 text-left">
                <p className="text-xs font-bold uppercase text-gray-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(selectedClient.tags || []).map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold border border-primary/20 flex items-center gap-1">
                      {tag}
                      <button onClick={() => onToggleTag(selectedClient.id, tag)} className="hover:text-red-500 w-3 h-3 flex items-center justify-center bg-black/10 rounded-full">
                        x
                      </button>
                    </span>
                  ))}
                  {(selectedClient.tags || []).length === 0 && <span className="text-xs text-gray-400 italic">No tags assigned</span>}
                </div>
                <div className="relative group inline-block">
                  <button className="text-xs text-primary font-bold hover:underline bg-primary/5 px-2 py-1 rounded border border-primary/10">+ Add Tag</button>
                  <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-40 bg-white dark:bg-[#1A1D26] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-20 p-2">
                    {availableTags
                      .filter((t) => !(selectedClient.tags || []).includes(t))
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onToggleTag(selectedClient.id, tag)}
                          className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-white/5 rounded-md text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </button>
                      ))}
                    {availableTags.filter((t) => !(selectedClient.tags || []).includes(t)).length === 0 && (
                      <div className="px-3 py-2 text-xs text-gray-400">All tags assigned</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
              <div className="flex gap-2 mb-6 border-b border-gray-100 dark:border-white/5 pb-1">
                {(['email', 'sms', 'call', 'note'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => onActionTabChange(tab)}
                    className={cn(
                      'px-4 py-2 text-sm font-bold capitalize border-b-2 relative top-[2px]',
                      actionTab === tab ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {actionTab === 'email' && (
                  <div className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-200 dark:border-white/10 pb-2">
                      <span>
                        From: <span className="font-medium">System</span>
                      </span>
                      <span>
                        To: <span className="font-medium">{selectedClient.email}</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={actionSubject}
                      onChange={(e) => onActionSubjectChange(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm focus:outline-none"
                    />
                  </div>
                )}
                {actionTab === 'sms' && (
                  <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 dark:bg-black/20 rounded-lg mb-2">
                    To: <span className="font-medium">{selectedClient.phone}</span>
                  </div>
                )}
                <textarea
                  placeholder="Type your message..."
                  value={actionContent}
                  onChange={(e) => onActionContentChange(e.target.value)}
                  className="w-full h-32 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-sm resize-none"
                />
                <div className="flex justify-end gap-3">
                  <Button onClick={onSendAction} disabled={!actionContent || isSending}>
                    {isSending ? 'Sending...' : `Send ${actionTab.toUpperCase()}`}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity History</h3>
              <div className="border-l-2 border-gray-100 dark:border-white/5 ml-4 space-y-6 pl-8 pb-8">
                {crmHistory.map((item) => (
                  <div key={item.id} className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 border-gray-400 bg-white dark:bg-[#0B0E14] z-10"></div>
                    <div className="bg-white dark:bg-[#13161C] p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                      <div className="flex justify-between mb-2">
                        <h5 className="font-bold text-sm capitalize">
                          {item.type}: {item.title}
                        </h5>
                        <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
