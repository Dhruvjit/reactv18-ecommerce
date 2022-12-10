import Home from './routes/home/home.component';
import {Routes, Route, Outlet} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const Shop = () => {
  return <h1>I am the shop page</h1>
}

const Shop1 = () => {
  return (
    <div>
      <div>
        <h1>I am the shop 1 page</h1>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div>
      {/* here navigation will be common top element, and '/', and '/shop' will be base components */}
      <Routes>
        <Route path='/' element={ <Navigation/> }>        
          <Route index element={ <Home/> } />
          <Route path='shop' element={ <Shop/> } />
          <Route path='auth' element={ <Authentication/> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
