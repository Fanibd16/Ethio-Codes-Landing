
import React, { useState, useEffect } from 'react';
import Button from '../ui/button';
import { cn } from '../../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    issue: '',
    industry: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // From user provided JSON
  const SERVICE_ACCOUNT_EMAIL = "ethiocodes@plasma-ripple-306714.iam.gserviceaccount.com";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const createCalendarUrl = () => {
    if (!formData.date) return '#';
    
    const startTime = new Date(formData.date);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    // Format for Google Calendar: YYYYMMDDTHHMMSSZ
    const formatDate = (date: Date) => {
       return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `System Audit: ${formData.name} <> EthioCodes`,
      details: `Client: ${formData.name}\nPhone: ${formData.phone}\nIndustry: ${formData.industry}\nFocus: ${formData.issue}\n\nbooked via EthioCodes Platform`,
      dates: `${formatDate(startTime)}/${formatDate(endTime)}`,
      add: SERVICE_ACCOUNT_EMAIL // Invite the service account
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-background border border-border rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-muted relative overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-700 ease-out" 
            style={{ width: `${isSuccess ? 100 : progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
          {isSuccess ? (
            <div className="py-6 text-center animate-in zoom-in duration-500 flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-foreground">Request Received.</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto font-light">
                Your system audit request has been logged. Please add this session to your calendar to confirm.
              </p>
              
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <a 
                  href={createCalendarUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="lg" className="w-full rounded-full font-bold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
                    Add to Google Calendar
                  </Button>
                </a>
                
                <Button variant="outline" size="lg" className="w-full rounded-full" onClick={onClose}>
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-2 block">
                    Step {step} of {totalSteps}
                  </span>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {step === 1 && "Start Your Audit"}
                    {step === 2 && "Business Profile"}
                    {step === 3 && "Schedule Session"}
                    {step === 4 && "Technical Vision"}
                  </h2>
                </div>
                <button 
                  type="button" 
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6" />
                  </svg>
                </button>
              </div>

              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full h-14 bg-muted border border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-colors text-foreground"
                        placeholder="e.g. Dawit Amare"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Work Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full h-14 bg-muted border border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-colors text-foreground"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full h-14 bg-muted border border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="+251 9xx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company Website</label>
                    <input 
                      type="url" 
                      className="w-full h-14 bg-muted border border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="https://yourcompany.com"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Industry / Sector</label>
                    <div className="relative">
                      <select 
                        className="w-full h-14 bg-muted border border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-colors appearance-none text-foreground"
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      >
                        <option value="" className="bg-background">Select Sector</option>
                        <option value="government" className="bg-background">Government / Institutional</option>
                        <option value="fintech" className="bg-background">Banking & FinTech</option>
                        <option value="startup" className="bg-background">High-Growth Startup</option>
                        <option value="enterprise" className="bg-background">Enterprise Retail / Logistics</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Preferred Date & Time</label>
                      <input 
                        type="datetime-local" 
                        required
                        className="w-full h-14 bg-muted border border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-colors text-foreground [color-scheme:dark]"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground pt-2">
                        * Sessions are typically 60 minutes. We will confirm availability within 2 hours.
                      </p>
                    </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tell us about the issue or project goals</label>
                    <textarea 
                      required
                      className="w-full h-40 bg-muted border border-border rounded-3xl p-6 focus:outline-none focus:border-primary transition-colors resize-none text-foreground"
                      placeholder="e.g. We are struggling to scale our payment processing..."
                      value={formData.issue}
                      onChange={(e) => setFormData({...formData, issue: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-4 pt-4">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-16 rounded-full px-10 border-border"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                
                {step < totalSteps ? (
                  <Button 
                    type="button" 
                    className="flex-1 h-16 rounded-full font-bold text-lg"
                    onClick={handleNext}
                  >
                    Next Phase
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 h-16 rounded-full font-bold text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : "Secure System Audit"}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
