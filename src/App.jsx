import React from 'react';
import MainComponent from './components/MainComponent';
import Homepage from './pages/Homepage';
import AuthProvider,{ useAuth} from "./context/AuthContext";

function AppRouter() {
    let auth = useAuth();
    return ( 
    <div>
        <AuthProvider >
        {auth.token && <MainComponent />}
        {!auth.token && <Homepage />}
        </AuthProvider > 

    </div>
    );
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;