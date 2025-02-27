import { Routes, Route, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Overview } from './Overview';
import { Schedule } from './Schedule';
import { Payments } from './Payments';
import { History } from './History';
import { Settings } from './Settings';

export function Dashboard() {
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    navigate(`/dashboard${view}`);
  };

  return (
    <DashboardLayout onNavigate={handleNavigate}>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="payments" element={<Payments />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}