import {Form} from "react-bootstrap";

const rememberMe = ({value, onChange}) => {
    return <div className="mt-2">
        <div className="form-check">
            <Form.Check
                checked={value}
                name={"rememberMe"} onChange={onChange}
                value={value} className="" type="checkbox"
                id="rememberMe"/>
            <Form.Label className="form-check-label text-muted fw-normal"
                        htmlFor="rememberMe">
                Запомнить пароль ?
            </Form.Label>
        </div>
    </div>;
}

const checkRememberAndSave = (rememberMe, email, password) => {
    if (rememberMe) {
        localStorage.setItem('rememberMe', "true");
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
}

const restoreRemembered = (onRemembered) => {
    const rememberedEmail = localStorage.getItem('email');
    const rememberedPassword = localStorage.getItem('password');
    if (rememberedEmail && rememberedPassword) {
        onRemembered(rememberedEmail, rememberedPassword);
    }
}

export default rememberMe;
export {checkRememberAndSave, restoreRemembered};