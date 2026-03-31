import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_CONTENT } from "../content";
import { createContactTicket } from "../application/create-contact-ticket";
import { getContactFormState } from "../application/get-contact-form-state";

export default function ContactMain() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const { canSubmit } = getContactFormState(subject, message);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createContactTicket(subject, message);
    if (result.success && result.ticket) {
      setTicketId(result.ticket.ticketId);
    }
  };

  return (
    <div className="container py-20">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">{CONTACT_CONTENT.title}</h1>
          <p className="mt-4 text-muted-foreground">{CONTACT_CONTENT.subtitle}</p>
        </div>

        {ticketId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-lg border border-primary/20 bg-primary/5 text-center"
          >
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">{CONTACT_CONTENT.form.success}</h2>
            <p className="font-mono text-2xl text-primary font-bold">{ticketId}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{CONTACT_CONTENT.form.subject}</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={CONTACT_CONTENT.form.subjectPlaceholder}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{CONTACT_CONTENT.form.message}</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={CONTACT_CONTENT.form.messagePlaceholder}
                rows={6}
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{CONTACT_CONTENT.note}</p>
            <Button type="submit" className="w-full glow-primary gap-2" size="lg" disabled={!canSubmit}>
              <Send className="w-4 h-4" />
              {CONTACT_CONTENT.form.submit}
            </Button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
