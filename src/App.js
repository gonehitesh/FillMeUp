import './App.css';
import Login from './login/Login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

function App() {
  const clientId= "329608136140-3jihk7s8b7t492c5tabklrfq1q03tjno.apps.googleusercontent.com";

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load("client:auth2", start);
  })
  return (
    <div className="App">
     <Login />
    </div>
  );
}

export default App;
