import react from 'react';
import DabbaRoutes from './Routes/DabbaRoutes.js';
import GeoZone from './store/LocationTracker.jsx';

function App() {
  return (
    <>
      <DabbaRoutes/>
      <h1>Girish</h1>
      <GeoZone/>
    </>
  );
}

export default App;
