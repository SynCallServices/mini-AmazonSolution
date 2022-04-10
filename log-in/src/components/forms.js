import { LoginForm } from "./login.js";
import { RegisterForm } from "./register.js";
import { useState } from "./modules.js";

function Forms () {
    const [loginPage, setLoginPage] = useState(true);

    return (
        <div id="flexForm">
            <div id="flexButtons">
                <div onClick={() => setLoginPage(true)} className={ `select_${loginPage}` }>Login</div>
                <div onClick={() => setLoginPage(false)} className={ `select_${!loginPage}` }>Register</div>
            </div>
            { (loginPage) ? <LoginForm /> : <RegisterForm /> }
        </div>
    );
}

export {
    Forms
};