import React from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header';
import NotFound from './components/NotFound';
import Ranking from './components/Ranking';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/scheduled" element={<Ranking target="scheduled" />}></Route>
        <Route path="/romance" element={<Ranking target="romance" />}></Route>
        <Route path="/boys" element={<Ranking target="boys" />}></Route>
        <Route path="/drama" element={<Ranking target="drama" />}></Route>
        <Route path="/bl" element={<Ranking target="bl" />}></Route>
        <Route path="/nsfw" element={<Ranking target="nsfw" />}></Route>
        <Route path="/free" element={<Ranking target="free" />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
