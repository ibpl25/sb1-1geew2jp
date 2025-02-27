import { useState } from 'react';
import { Section } from '../ui/Section';
import { ExchangeCard } from '../exchange/ExchangeCard';
import { ExchangeModal } from '../exchange/ExchangeModal';
import { sampleSessions } from '../../data/exchange';
import type { ExchangeSession, ExchangeBooking } from '../../types/exchange';

export function Exchange() {
  const [selectedSession, setSelectedSession] = useState<ExchangeSession | null>(null);

  const handleBook = (booking: ExchangeBooking) => {
    // In a real app, this would make an API call to create the booking
    console.log('Booking:', booking);
    setSelectedSession(null);
  };

  return (
    <Section
      id="exchange"
      title="Language Exchange"
      subtitle="Practice Italian with native speakers in structured conversation sessions"
      className="bg-cream-50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleSessions.map((session) => (
          <ExchangeCard
            key={session.id}
            session={session}
            onBook={() => setSelectedSession(session)}
          />
        ))}
      </div>

      {selectedSession && (
        <ExchangeModal
          session={selectedSession}
          isOpen={true}
          onClose={() => setSelectedSession(null)}
          onBook={handleBook}
        />
      )}
    </Section>
  );
}