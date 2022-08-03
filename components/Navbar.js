import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";
import React from "react";

class Navbar extends React.Component {
  handleChange = (e) => {
    const input = e.target.value;
    console.log(input);
  };

  render() {
    return (
      <>
        <nav className="flex flex-row bg-white border-b-[0.8px] border-gray-200 min-w-max">
          <div className="flex flex-row bg-cyan-900 px-6 py-4 w-full justify-between gap-4 items-center">
            <div>
              <h2 className="item-center text-4xl font-bold">
                <Link href="/">Virtual Gallery</Link>
              </h2>
            </div>
            <div className="flex flex-row gap-2 justify-center items-start">
              <input
                onChange={(e) => this.handleChange(e)}
                className="px-4 py-2 rounded-lg w-[500px] text-black"
                type="search"
                id="form1"
                placeholder="search for art..."
              ></input>
              <button className="px-2 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 duration-200">
                search
              </button>
            </div>
            <ul className="flex flex-row gap-6 items-center pr-6 text-xl">
              <li className="hover:text-yellow-500 duration-200 transition-all">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-yellow-500 duration-200 transition-all">
                <Link href="/upload">Sell</Link>
              </li>
              <li className="hover:text-yellow-500 duration-200 transition-all">
                <Link href="/mynfts">My Art</Link>
              </li>
              <li className="hover:text-yellow-500 duration-200 transition-all">
                <Link href="/creator">creator</Link>
              </li>
              <li className="hover:text-yellow-500 duration-200 transition-all">
                <div className="flex m-1">
                  <LoginButton />
                  <LogoutButton />
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
export default Navbar;
