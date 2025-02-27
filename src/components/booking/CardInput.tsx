import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export function CardInput() {
  return (
    <div className="w-full p-3 border border-gray-300 rounded-lg">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}