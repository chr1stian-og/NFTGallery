// import React, { Component } from "react";
// import axios from "axios";
// import Home from "./home";
// import { Route, Routes, Link } from "react-router-dom";
// import GoogleLogin from "react-google-login";
// import "bootstrap/dist/css/bootstrap.css";

// class Login extends Component {
//   state = {
//     data: {
//       email: "",
//       password: "",
//     },
//   };

//   async submitForm() {
//     const data = {
//       email: this.state.data.email,
//       password: this.state.data.password,
//     };
//     const api = axios.create({ baseURL: "http://localhost:3001" });
//     const resp = await api
//       .post("/login", data)
//       .then((res) => {
//         console.log(res); // window.open('http://localhost:3000/home', "_self")
//       })
//       .catch((err) => {
//         console.log("Error while adding user", err);
//       });
//   }

//   handleForm = (e) => {
//     const dataToSend = { ...this.state.data };
//     dataToSend[e.target.id] = e.target.value;
//     this.setState({ data: dataToSend });
//     console.log(dataToSend);
//   };

//   openApp = () => {
//     window.open("https://localhost:3000/home");
//   };

//   responseGoogle = (response) => {
//     window.open("http://localhost:3000/home", "_self");
//     console.log(response);
//     console.log(response.profileObj);
//   };

//   render() {
//     return (
//       <div>
//         <center>
//           <h1 className="text-3xl m-10">Login</h1>
//           <p></p>
//           <form onSubmit={() => this.submitForm()}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
//               <p></p>
//               <label className="m-2">Email</label>
//               <input
//                 id="email"
//                 onChange={(e) => this.handleForm(e)}
//                 autoComplete="off"
//                 type="email"
//                 value={this.state.data.email}
//                 style={{ width: "200px", margin: "0 auto" }}
//               ></input>
//               <label className="m-2">Password</label>
//               <input
//                 id="password"
//                 onChange={(e) => this.handleForm(e)}
//                 autoComplete="off"
//                 type="password"
//                 value={this.state.data.password}
//                 style={{ width: "200px", margin: "0 auto" }}
//               ></input>
//               <p></p>
//               <button
//                 className="btn btn-primary"
//                 onSubmit={() => this.openApp()}
//                 style={{ width: "150px", margin: "10px auto" }}
//               >
//                 log in{" "}
//               </button>
//               {/* <Link to="/home" style={{textStyle: "none"}}><button style={{width: "150px", margin: "0 auto"}}>Login</button></Link> */}
//               <p></p>
//             </div>
//           </form>
//           <p></p>
//           <GoogleLogin
//             style={{ marginTop: "10px" }}
//             clientId="343867193974-qhkur8u6dvao48rudcjaa0830db0n9vb.apps.googleusercontent.com"
//             buttonText="Login using google"
//             onSuccess={this.responseGoogle}
//             onFailure={this.responseGoogle}
//             cookiePolicy={"single_host_origin"}
//           />
//         </center>
//       </div>
//     );
//   }
// }

// export default Login;
