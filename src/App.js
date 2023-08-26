import "./App.css";
import { validateEmail } from "./utils";
import { useState, useEffect } from "react"; // 添加 useEffect 的导入

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};
function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });

  const [role, setRole] = useState("role");
  useEffect(() => {
    console.log(password.value); // 在状态更新后打印新密码值
  }, [password.value]); // 监听 password.value 的变化


  const getIsFormValid = (e) => {
    console.log(validateEmail(email))
    return ( 
      firstName && 
      validateEmail(email) && 
      password.value.length >= 8 && 
      role !== "role" 
    ); 
   
  };


    const handlePsw =(e)=>{
      const newPassword = e.target.value;
      setPassword({
        value:newPassword,
        isTouched:true
      })

  };

  const clearForm = () => {
    setEmail = "";
    setFirstName = "";
    setLastName = "";
    setPassword({ 
      value: "", 
      isTouched: false, 
    }); 
    setRole("role"); 

    // Implement this function
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
    clearForm();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input placeholder="First name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          </div>
          <div className="Field">
            <label>Last name</label>
            <input placeholder="Last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input placeholder="Password" value={password.value}    
            onChange={(e) => { 
              setPassword({ ...password, value: e.target.value }); 
            }} 
            onBlur={() => { 
              setPassword({ ...password, isTouched: true }); 
            }} />
            {password.isTouched && password.value.length < 8 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
