import { ConnectButton, useConnection} from "@arweave-wallet-kit/react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import gemhunterLogo from "../assets/gemhunter-logo.svg";

export default function Front() {
  const { connected } = useConnection();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#121212] relative">
      <div className="h-full flex justify-center items-center gap-12 w-full">
        <div className="flex gap-2 items-center ">
        <img src={gemhunterLogo}/>
        <h1 className="text-4xl font-semibold text-[#FFFFFF] border-b border-gray-600/50 ">Welcome To GemHunter-AO</h1>

        </div>

      {connected ? navigate("/game") : <ConnectButton className="w-56 " />}
      </div>

      <Footer className="absolute top-[85%] text-[#FFFFFF]"/>
    </div>
  );
}
