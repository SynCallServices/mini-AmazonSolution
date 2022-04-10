// modules
import { React, AWS } from "./modules.js";

// functions
import { RegisterForm } from "./register.js";
import { LoginForm } from "./login.js";

function App() {
  return (
    <div className="App">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;