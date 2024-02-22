import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import logo from "../../assets/logo.png";
import { useContext, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/GlobalContext";
const Login = () => {
  const url = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const errorStyle = (ref, dif = false) => {
    if (dif) {
      ref = ref.current.getInput();
      ref.focus();
      ref.style.transition = "box-shadow 0.3s ease-in-out";
      ref.style.boxShadow = "0 0 0 0.2rem #c75858";
    } else {
      ref.current.focus();
      ref.current.style.transition = "box-shadow 0.3s ease-in-out";
      ref.current.style.boxShadow = "0 0 0 0.2rem #c75858";
    }
  };
  const clearErrorStyle = (ref, dif = false) => {
    if (dif) {
      ref = ref.current.getInput();
      ref.style.transition = "none";
      ref.style.boxShadow = "0 0 0 0.2rem #BFDBFE";
    } else {
      ref.current.style.transition = "none";
      ref.current.style.boxShadow = "0 0 0 0.2rem #BFDBFE";
    }
  };
  const submitCred = async (e) => {
    e.preventDefault();
    try {
      if (!email || email === "" || email === undefined) {
        toast.error("Email field is empty");
        return errorStyle(emailRef);
      }
      if (!password || password === "" || password === undefined) {
        toast.error("Password field is empty");
        return errorStyle(passwordRef, true);
      } else {
        setLoading(true);
        const resp = await fetch(`${url}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();
        if (data.status) {
          toast(data.message);
          setUser({
            loggedIn: true,
            admin: data.admin,
          });
          data.admin ? navigate("/a") : navigate("/u");
          // navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login__container">
      <Toaster richColors />
      <form className="inner-cont" onSubmit={(e) => submitCred(e)}>
        <img src={logo} alt="logo" />
        <label>Email Address</label>
        <InputText
          value={email}
          onChange={(e) => {
            clearErrorStyle(emailRef);
            setEmail(e.target.value);
          }}
          keyfilter="email"
          placeholder="Enter Email Address"
          ref={emailRef}
          type="email"
        />
        <label>Password</label>
        <Password
          value={password}
          onChange={(e) => {
            clearErrorStyle(passwordRef, true);
            setPassword(e.target.value);
          }}
          className="mb-3"
          toggleMask
          placeholder="Enter Password"
          feedback={false}
          ref={passwordRef}
          type="password"
        />
        <Button label="Login" loading={loading} type="submit" />
      </form>
    </div>
  );
};

export default Login;
