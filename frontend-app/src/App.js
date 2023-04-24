import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/home' element={<HomeScreen />} exact />
          </Routes>
          {/* <HomeScreen /> */}
          {/* <Route path='/' component={HomeScreen} exact /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
