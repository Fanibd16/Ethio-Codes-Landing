import React from 'react';
import { Booking, Lead } from '../../../lib/types';
import Button from '../../ui/button';
import { cn } from '../../../lib/utils';

interface HomePageProps {
  totalRevenue: number;
  bookings: Booking[];
  leads: Lead[];
  loyaltyScore: number;
  monthlyRevenue: number;
  chartSeries: number[];
  chartMonths: string[];
}

const HomePage: React.FC<HomePageProps> = ({
  totalRevenue,
  bookings,
  leads,
  loyaltyScore,
  monthlyRevenue,
  chartSeries,
  chartMonths,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-3xl bg-gradient-to-br from-primary via-orange-500 to-pink-500 text-white p-8 md:p-10 shadow-2xl shadow-primary/30 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border border-white/10">
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Tech company landing ops</p>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Run your high-converting landing page and client acquisition from one admin.
          </h1>
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            Monitor revenue, nurture leads, and publish updates without leaving this dashboard. Everything is wired for fast experiments and quick hand-offs to sales.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="bg-white text-gray-900 hover:bg-white/90">Create CTA Block</Button>
            <Button variant="ghost" className="bg-white/15 text-white hover:bg-white/20 border border-white/20">
              View Landing Preview
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 min-w-[240px]">
          {[
            { label: 'Lead Velocity', value: '+18% WoW' },
            { label: 'Demo Requests', value: '142 this week' },
            { label: 'Conversion', value: '6.4% → 7.1%' },
            { label: 'Avg. Deal Size', value: '$8.2k' },
          ].map((kpi) => (
            <div key={kpi.label} className="p-3 rounded-2xl bg-white/15 backdrop-blur border border-white/20">
              <p className="text-[11px] uppercase font-semibold text-white/80">{kpi.label}</p>
              <p className="text-lg font-black">{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 bg-white dark:bg-[#13161C] shadow-sm">
        {[
          { label: 'Total Revenue', value: `$ ${totalRevenue.toLocaleString()}`, delta: '+6%', tone: 'bg-orange-500' },
          { label: 'Invoices', value: bookings.length.toLocaleString(), delta: '+12%', tone: 'bg-emerald-500' },
          { label: 'Clients', value: leads.length.toLocaleString(), delta: '+9%', tone: 'bg-blue-500' },
          { label: 'Loyalty', value: `${loyaltyScore}%`, delta: '-1%', tone: 'bg-rose-500' },
        ].map((card, i) => (
          <div
            key={card.label}
            className={cn(
              'p-6',
              i < 3 && 'xl:border-r border-gray-200 dark:border-white/5',
              i < 2 && 'md:border-r border-gray-200 dark:border-white/5',
              i === 0 && 'md:border-b xl:border-b-0 border-gray-200 dark:border-white/5',
              i === 1 && 'md:border-b xl:border-b-0 border-gray-200 dark:border-white/5'
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={cn('w-4 h-4 rounded-full', card.tone)}></span>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
            </div>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-1 rounded-full mb-1',
                  card.delta.startsWith('-') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                )}
              >
                {card.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
          <p className="text-sm font-semibold text-gray-500 mb-3">Monthly Revenue</p>
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8">${monthlyRevenue.toLocaleString()}</div>
          <div className="h-48 flex items-end gap-3">
            {chartSeries.map((height, i) => (
              <div key={chartMonths[i]} className="flex-1 flex flex-col items-center gap-3">
                <div
                  className={cn(
                    'w-full rounded-xl transition-all duration-300',
                    i === 3 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-200 dark:bg-white/10'
                  )}
                  style={{ height: `${height}%` }}
                ></div>
                <span className={cn('text-[11px] font-medium', i === 3 ? 'text-gray-900 dark:text-white' : 'text-gray-400')}>
                  {chartMonths[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-primary text-primary-foreground p-7 shadow-2xl shadow-primary/30 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-20 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-cyan-300/20"></div>
          <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold rounded-full bg-white/20 mb-5">NEW</span>
          <h3 className="text-3xl font-bold leading-tight mb-4">We have added new invoicing templates!</h3>
          <p className="text-sm text-primary-foreground/80 leading-relaxed mb-8">
            New templates focused on helping you improve your business and streamline billing flow.
          </p>
          <Button className="w-full h-11 rounded-xl bg-white text-gray-900 hover:bg-white/90 font-bold">Download Now</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-black">LP</div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Landing Page Checklist</p>
              <p className="text-xs text-gray-500">Conversion-focused essentials</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>✅ Above-the-fold value prop + CTA</li>
            <li>✅ Social proof (testimonials & client logos)</li>
            <li>✅ Pricing teaser with “Talk to sales”</li>
            <li>✅ Technical architecture section for credibility</li>
            <li>✅ Exit-intent lead capture</li>
          </ul>
          <Button size="sm" className="w-full">Apply to Page</Button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">AQ</div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Acquisition Playbook</p>
              <p className="text-xs text-gray-500">Repeatable motions</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>LinkedIn Outreach</span>
              <span className="font-bold text-gray-900 dark:text-white">32 demos</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Technical Webinars</span>
              <span className="font-bold text-gray-900 dark:text-white">18 SQLs</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Landing Page CTA</span>
              <span className="font-bold text-gray-900 dark:text-white">7.1% CVR</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Retargeting</span>
              <span className="font-bold text-gray-900 dark:text-white">$42 CPL</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="w-full">Download SOP</Button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">AB</div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">A/B Tests Live</p>
              <p className="text-xs text-gray-500">Landing page experiments</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>• Hero button copy: “Book a Systems Audit” vs “Talk to an Engineer”</p>
            <p>• Demo form fields: long vs short (current winner: short, +11% CVR)</p>
            <p>• Trust bar placement: above vs below fold</p>
            <p>• Pricing CTA color: primary vs emerald</p>
          </div>
          <Button size="sm" className="w-full">View Results</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Activities</h3>
          <div className="space-y-5">
            {bookings.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  {item.clientName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary">New invoice</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
                    {item.clientName} invoice for {item.serviceName}
                  </p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Recent Invoices</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-white/5">
                  <th className="py-3 pr-4 font-semibold">No</th>
                  <th className="py-3 pr-4 font-semibold">Date Created</th>
                  <th className="py-3 pr-4 font-semibold">Client</th>
                  <th className="py-3 pr-4 font-semibold">Amount</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 dark:border-white/5 last:border-0 text-sm">
                    <td className="py-4 pr-4 font-semibold text-gray-700 dark:text-gray-100">PQ-{invoice.id}</td>
                    <td className="py-4 pr-4 text-gray-500">{invoice.date}</td>
                    <td className="py-4 pr-4 text-gray-700 dark:text-gray-200">{invoice.clientName}</td>
                    <td className="py-4 pr-4 font-semibold text-gray-700 dark:text-gray-200">${invoice.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <span
                        className={cn(
                          'inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase',
                          invoice.status === 'Completed'
                            ? 'bg-green-500/10 text-green-500'
                            : invoice.status === 'Pending'
                            ? 'bg-orange-500/10 text-orange-500'
                            : 'bg-red-500/10 text-red-500'
                        )}
                      >
                        {invoice.status === 'Completed' ? 'Paid' : invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
