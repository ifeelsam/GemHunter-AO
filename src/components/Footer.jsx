import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Footer() {
  return (
    <div className={`w-full py-[2%] border-t border-gray-600/50 flex items-center justify-center gap-10`}>
      <a
        href="https://github.com/AAshu1412/GemHunter-AO"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3"
      >
        <Avatar className="transition-transform duration-200 ease-in-out transform hover:scale-125">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/132162510?v=4"
            alt="AAshu1412"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-sm">AAshu1412</h1>
      </a>
      <div>
        <h1>ashutoshsanjeevmittal@gmail.com</h1>
      </div>
    </div>
  );
}


// {"Messages":[],"Assignments":[],"Spawns":[],"Output":{"print":true,"prompt":"aos> ","data":"\u001b[90mNew Message From \u001b[32myWE...qtU\u001b[90m: \u001b[90mAction = \u001b[34mEval\u001b[0m"},"GasUsed":0}

// {"Messages":[],"Assignments":[],"Spawns":[],"Output":{"data":{"output":"{ \u001b[32m\"ID\"\u001b[0m, \u001b[32m\"NAME\"\u001b[0m }","json":"undefined","prompt":"aos> "}},"GasUsed":0}
