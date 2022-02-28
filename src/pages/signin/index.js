// import React from 'react';
// import "./styles.css";
// import CustomInput from "./components/CustomInput";
// import Button from "./components/Button";

// const Signin= ()=>{
//   state = {
//     email: "",
//     password: ""
//   };

//   handleChange = e => {
//     this.setState({ [e.currentTarget.id]: e.currentTarget.value });
//   };

//   render() {
//     return (
//       <div className="App">
//         <form className="form">
//           <CustomInput
//             labelText="Email"
//             id="email"
//             formControlProps={{
//               fullWidth: true
//             }}
//             handleChange={this.handleChange}
//             type="text"
//           />
//           <CustomInput
//             labelText="Password"
//             id="password"
//             formControlProps={{
//               fullWidth: true
//             }}
//             handleChange={this.handleChange}
//             type="password"
//           />

//           <Button type="button" color="primary" className="form__custom-button">
//             Log in
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Signin;