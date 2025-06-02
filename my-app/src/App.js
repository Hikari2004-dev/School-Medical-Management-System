import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import StatusBar from './components/StatusBar';
import News from './components/News';
import Events from './components/Events';
import WhyChoose from './components/WhyChoose';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <StatusBar />
      <News />
      <Events />
      <WhyChoose />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;