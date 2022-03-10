import React , { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';


const App = () => {

  const [search, setSearch ] = useState("");

  return(
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main >
          <Route path='/' component={LandingPage} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={RegisterScreen} exact />
          <Route
            path="/mynotes"
            component={({ history }) => (
              <MyNotes search={search} history={history} />
            )}
          />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/createnote" component={CreateNote} />;
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/about" component={AboutScreen} />
      </main>
      <Footer />
    </BrowserRouter>
  )
};

export default App;

