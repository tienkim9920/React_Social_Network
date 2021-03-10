
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './Chat_User/Chat';
import Header from './Header/Header'
import Home from './Home/Home';
import './App.css'
import MainPost from './Detail_Post/MainPost';
import MainUser from './Detail_User/MainUser';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import { useDispatch, useSelector } from 'react-redux'
import { addSession } from './Redux/Action/ActionSession';

function App() {

  const id_user = useSelector(state => state.Session.id_user)
  
  const dispatch = useDispatch()

  if (sessionStorage.getItem('id_user')){
    const action = addSession(sessionStorage.getItem('id_user'))
    dispatch(action)
  }

  return (
    <div className="App">
      <BrowserRouter>

        {
          id_user !== '' ? <Header /> : ''
        }

        <Switch>

          <Route exact path='/' component={Home} />
          <Route path='/chat' component={Chat} />
          <Route path='/post/:id' component={MainPost} />
          <Route path='/account/:id' component={MainUser} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          
        </Switch>

      </BrowserRouter>

     
    </div>
  );
}

export default App;
