import { CreditCard } from 'lucide-react';

export function Payments() {
  const payments = [
    {
      id: 1,
      date: 'March 15, 2024',
      amount: 580,
      status: 'completed',
      description: '10 Lesson Package'
    },
    {
      id: 2,
      date: 'February 28, 2024',
      amount: 65,
      status: 'completed',
      description: 'Single Lesson'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment History</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-green-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <p className="text-sm text-gray-500">Manage your payment methods and view history</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} className="border-b last:border-0">
                    <td className="py-4">{payment.date}</td>
                    <td className="py-4">{payment.description}</td>
                    <td className="py-4">${payment.amount}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-sm bg-green-50 text-green-700 rounded-full">
                        {payment.status}
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
}