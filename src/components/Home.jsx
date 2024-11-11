import {
  createDataItemSigner,
  spawn,
  message,
  result,
} from "@permaweb/aoconnect";
import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "./ui/toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import Footer from "./Footer";
import gemhunterLogo from "../assets/gemhunter-logo.svg";
import logoTileCover from "../assets/tile_cover.svg";
import { GiFireBomb } from "react-icons/gi";
import { IoRocketSharp } from "react-icons/io5";
import { GiRollingBomb } from "react-icons/gi";
import { PiThumbsUpFill } from "react-icons/pi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { GiGlassCelebration } from "react-icons/gi";

export default function Home() {
  const [playerEnterGameDetails, setPlayerEnterGameDetails] = useState({
    bombs: 1,
    betAmount: 1,
  });
  const [loading1, setLoading1] = useState(false);
  const [endGameloading, setEndGameloading] = useState(false);
  const [tileLoading, setTileLoading] = useState({
    load: false,
    indexOfTile: null,
  });
  const [startGameButtonDisable, setStartGameButtonDisable] = useState(false);
  const [currentProcessID, setCurrentProcessID] = useState("");
  const [fetchingPlayerAndTileData, setFetchingPlayerAndTileData] = useState({
    WINNINGAMOUNT: 0,
    BET: 0,
    LASTBETAMOUNT: 0,
    LASTWINNINGAMOUNT: 0,
    TILE: [
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Bomb" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
      { open: false, value: "Diamond" },
    ],
    STATUS: "safe",
    ID: 2,
    ADDRESS: "yWEDs-sho-5Ka7ql_Ov71GNFdHqLspekxfhAo1bcqtU",
    INCREASER: 0,
    HASGAMESTARTED: 0,
    BALANCE: 0,
    HASSETBOMBS: 0,
  });
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [loadingScreenMessage, setLoadingScreenMessage] = useState(true);
  const [lastMatch, setLastMatch] = useState(false);
  const fileInputRef = useRef(null);
  const loadingScreen = useRef(null);

  const stripAnsiCodes = (str) =>
    str.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );

  const { connected } = useConnection();
  const { toast } = useToast();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (connected) {
      (async () => {
        loadScreenButton();
        try {
          const messageId2 = await message({
            process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
            signer: createDataItemSigner(window.arweaveWallet),
            tags: [{ name: "Action", value: "ReturnData" }],
          });

          //  // console.log("Fetching Data: " + messageId2);

          let res1 = await result({
            message: messageId2,
            process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
          });
          const data = JSON.parse(res1.Messages[0].Data);
          setFetchingPlayerAndTileData(data);
          if (data.STATUS == "Safe") {
            setHasGameStarted(true);
            setStartGameButtonDisable(true);
            setLastMatch(false);
          }
          setLoadingScreenMessage(false);
        } catch (error) {
          setLoadingScreenMessage(false);
        }
      })();
    }
  }, [connected]);
  // // console.log(JSON.stringify(fetchingPlayerAndTileData));
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function openTile(num) {
    try {
      setTileLoading({ load: true, indexOfTile: num - 1 });
      if (!connected) {
        setLoading1(false);
        toast({
          variant: "destructive",
          title: "Wallet Not Connected",
          description: "Please Connect Your Wallet First",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
      //     const messageId = await message({
      //       process: currentProcessID,
      //       signer: createDataItemSigner(window.arweaveWallet),
      //       tags: [{ name: "Action", value: "Eval" }],
      //       data: `

      //       local tileNumber=tonumber(${num})
      // if (gameStatus.hasDoomed == false and gameStatus.hasPlayerEndTheGame == false) then
      // 	for index, tilesDetails in ipairs(tiles) do
      // 		if (tileNumber == index and tilesDetails.open == false) then
      // 			tilesDetails.open = true
      // 			if (tilesDetails.value == "Bomb") then
      // 				gameStatus.hasDoomed = true
      // 				playerRecord = PlayerBetAmount
      // 				PlayerBetAmount = 0
      // 				PlayerStatus = "Doom"
      // 				break
      // 			end
      // 			moneyIncreaserdBy = moneyIncreaserdBy + 0.002
      // 			PlayerBetAmount = PlayerBet * (1 + moneyIncreaserdBy)
      // 			playerRecord = PlayerBetAmount
      // 			break
      // 		end
      // 	end
      // end

      //  local data = json.encode({
      //   moneyIncrease = moneyIncreaserdBy,
      //   playerbalance = PlayerBetAmount,
      //   record=playerRecord,
      //   playerStats = PlayerStatus,
      //   tile = tiles
      // })
      // return data

      // `,
      //     });

      const messageId = await message({
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [
          { name: "Action", value: "OpenTile" },
          { name: "tileNumber", value: `${num}` },
        ],
      });

      const messageId2 = await message({
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "ReturnData" }],
      });

      // // console.log("open tile: " + messageId2);

      let res1 = await result({
        message: messageId2,
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
      });
      const data = JSON.parse(res1.Messages[0].Data);
      // const data = stripAnsiCodes(res1.Output.data.output);
      // const data2 = JSON.parse(data);
      // setFetchingPlayerAndTileData(data2);
      // console.log("Tiles: ", data);
      setFetchingPlayerAndTileData(data);
      if (data.STATUS == "Doom") {
        setTileLoading({ load: true, indexOfTile: null });
        handleButtonClick();
        setLastMatch(false);
      } else if (data.STATUS == "Win") {
        setTileLoading({ load: true, indexOfTile: null });
        handleButtonClick();
        setLastMatch(false);
      } else {
        setTileLoading({ load: false, indexOfTile: null });
      }
    } catch (error) {
      setTileLoading({ load: false, indexOfTile: null });
      console.log(error);
      toast({
        variant: "destructive",
        title: "Tile Open Error",
        description: "There is some error in opening this tile",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  async function endGame() {
    try {
      setEndGameloading(true);
      if (!connected) {
        setLoading1(false);
        toast({
          variant: "destructive",
          title: "Wallet Not Connected",
          description: "Please Connect Your Wallet First",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      const messageId = await message({
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "EndGame" }],
        //       data: `

        // gameStatus.hasPlayerEndTheGame = true
        // gameStatus.hasGameStarted = false
        // gameStatus.hasSetBombs = false
        // gameStatus.hasDoomed = false
        //  local data = json.encode({
        //   moneyIncrease = moneyIncreaserdBy,
        //   playerbalance = PlayerBetAmount,
        //   record=playerRecord,
        //   playerStats = "End",
        //   tile = tiles
        // })
        // return data

        // `,
      });

      const messageId2 = await message({
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "ReturnData" }],
      });

      //   // console.log("End Game: " + messageId2);

      let res1 = await result({
        message: messageId2,
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
      });

      const data = JSON.parse(res1.Messages[0].Data);
      // const data = stripAnsiCodes(res1.Output.data.output);
      // const data2 = JSON.parse(data);
      // setFetchingPlayerAndTileData(data2);
      setFetchingPlayerAndTileData(data);
      // // console.log("Tiles: ", data);
      // if (data2.playerStats == "End") {
      //   setTileLoading({ load: true, indexOfTile: null });
      //   handleButtonClick();
      // }
      if (data.STATUS == "End") {
        setTileLoading({ load: true, indexOfTile: null });
        handleButtonClick();
        setLastMatch(false);
      }
      setEndGameloading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleButtonClick = () => {
    // if (fetchingPlayerAndTileData.STATUS == "Safe") {
    //   setLastMatch(false);
    // } else {
    //   setLastMatch(true);
    // }
    fileInputRef.current.click();
  };

  const loadScreenButton = () => {
    if (fetchingPlayerAndTileData.STATUS == "Safe") {
      setLastMatch(false);
    } else {
      setLastMatch(true);
    }
    loadingScreen.current.click();
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // // console.log(name, value);
    setPlayerEnterGameDetails({ ...playerEnterGameDetails, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading1(true);
      if (!connected) {
        setLoading1(false);
        toast({
          variant: "destructive",
          title: "Wallet Not Connected",
          description: "Please Connect Your Wallet First",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      // const processId = await spawn({
      //   module: "sBmq5pehE1_Ed5YBs4DGV4FMftoKwo_cVVsCpPND36Q",
      //   scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
      //   signer: createDataItemSigner(window.arweaveWallet),
      // });
      // console.log(processId);
      // setCurrentProcessID(processId);

      // await new Promise((resolve) => setTimeout(resolve, 5000));

      // const messageId = await message({
      //   process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
      //   signer: createDataItemSigner(window.arweaveWallet),
      //   tags: [{ name: "Action", value: "StartGame" },{ name: "numberOfBombs", value: `${playerEnterGameDetails.bombs}` },{ name: "betAmount", value: `${playerEnterGameDetails.betAmount}` },]
      //       tags: [{ name: "Action", value: "Eval" }],
      // //       data: `

      // json = require("json")

      // tiles = {}
      // gameStatus = {
      //   hasGameStarted = false,
      //   hasSetBombs = false,
      //   hasDoomed = false,
      //   hasPlayerEndTheGame = false
      // }

      // moneyIncreaserdBy = 0
      // playerRecord = nil
      // PlayerBetAmount = 0
      // PlayerBet = 0
      // PlayerStatus = "Safe"

      // local bombss=tonumber(${playerEnterGameDetails.bombs})
      //   if (bombss > 0 and bombss < 25 and gameStatus.hasSetBombs == false and gameStatus.hasDoomed == false and gameStatus.hasPlayerEndTheGame == false) then
      //     for i = 1, bombss, 1 do

      //       local setupBombInTile = {
      //         open = false,
      //         value = "Bomb"
      //       }
      //       table.insert(tiles, setupBombInTile)
      //     end
      //     for i = 1, 25 - bombss, 1 do

      //       local setupBombInTile = {
      //         open = false,
      //         value = "Diamond"
      //       }
      //       table.insert(tiles, setupBombInTile)
      //     end
      //     moneyIncreaserdBy = (bombss / 10)
      //     gameStatus.hasSetBombs = true
      //     gameStatus.hasGameStarted = true
      //   end

      // local bettAmount = tonumber(${playerEnterGameDetails.betAmount})
      //   if (bettAmount > 0 and gameStatus.hasPlayerEndTheGame == false) then
      //     PlayerBetAmount = bettAmount
      //     PlayerBet = PlayerBetAmount
      //     playerRecord = PlayerBetAmount
      //   end

      //   if (gameStatus.hasGameStarted == true and gameStatus.hasDoomed == false and gameStatus.hasPlayerEndTheGame == false) then
      //     for i = # tiles, 2, -1 do
      //       local j = math.random(i)
      //       tiles[i], tiles[j] = tiles[j], tiles[i]
      //     end
      //   end

      //   local data = json.encode({
      //   moneyIncrease = moneyIncreaserdBy,
      //   playerbalance = PlayerBetAmount,
      //   record=playerRecord,
      //   playerStats = PlayerStatus,
      //   tile = tiles
      // })
      // return data

      // `,
      // });

      const messageId = await message({
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [
          { name: "Action", value: "StartGame" },
          { name: "numberOfBombs", value: `${playerEnterGameDetails.bombs}` },
          { name: "betAmount", value: `${playerEnterGameDetails.betAmount}` },
        ],
      });

      const messageId2 = await message({
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "ReturnData" }],
      });

      // // console.log("Start Game: " + messageId2);

      let res1 = await result({
        message: messageId2,
        process: "kyyYDxfEPeJPJS03sm6IKu8IS09lf1hPqVxIEeo-Mac",
      });
      //   // console.log("Tiles: ", JSON.stringify(res1));
      const data = JSON.parse(res1.Messages[0].Data);
      // const data = stripAnsiCodes(res1.Output.data.output);
      // const data2 = JSON.parse(data);
      // setFetchingPlayerAndTileData(data2);
      setFetchingPlayerAndTileData(data);
      //   // console.log("Tiles: ", data);
      setLoading1(false);
      setStartGameButtonDisable(true);
      setHasGameStarted(true);
      console.log("Game Start");
    } catch (error) {
      setLoading1(false);
      console.log(error);
      toast({
        variant: "destructive",
        title: "Game Not Started",
        description: "Error",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="h-screen w-full bg-[#121212] relative text-[#FFFFFF]">
      {hasGameStarted ? (
        <div className="flex items-center justify-between border-b border-gray-600/50 px-10 py-2">
          <div className="flex items-center gap-5">
            <img src={logoTileCover} className="w-[20%]" />
            <h1 className="text-4xl font-semibold"> GemHunter-AO</h1>
          </div>

          <ConnectButton
            profileModal={true}
            showBalance={false}
            showProfilePicture={true}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex w-full h-[70%]">
        <div className="w-[30%] h-full flex flex-col relative">
          {hasGameStarted ? (
            <div className="px-28 pt-10 flex flex-col  gap-2">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">
                  {" "}
                  Current Win Multiplier
                </h1>
                <h1 className="bg-[#252525] h-10 px-2 py-4 flex items-center text-green-500 text-lg rounded-sm">
                  {fetchingPlayerAndTileData.INCREASER}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">
                  {" "}
                  Current Winnings Balance
                </h1>
                <h1
                  className={`bg-[#252525] h-10 px-2 py-4 flex items-center ${
                    playerEnterGameDetails.BET ==
                    fetchingPlayerAndTileData.WINNINGAMOUNT
                      ? "text-[#FFFFFF]"
                      : "text-green-500"
                  }  text-lg rounded-sm`}
                >
                  {fetchingPlayerAndTileData.WINNINGAMOUNT}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">
                  {" "}
                  Current Bet You Placed
                </h1>
                <h1
                  className={`bg-[#252525] h-10 px-2 py-4 flex items-center 
                   text-[#FFFFFF]  text-lg rounded-sm`}
                >
                  {fetchingPlayerAndTileData.BET}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold"> Total Balance</h1>
                <h1
                  className={`bg-[#252525] h-10 px-2 py-4 flex items-center 
                  text-[#FFFFFF]  text-lg rounded-sm`}
                >
                  {fetchingPlayerAndTileData.BALANCE}
                </h1>
              </div>
            </div>
          ) : (
            <></>
          )}

          <form
            onSubmit={handleLoginSubmit}
            className="px-28 pt-16 flex flex-col gap-2 relative"
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg">
                Choose Number of Bombs
              </label>
              <input
                type="number"
                required
                autoComplete="off"
                value={playerEnterGameDetails.bombs}
                onChange={handleInput}
                disabled={startGameButtonDisable}
                name="bombs"
                id="bombs"
                placeholder="Enter the number of bombs"
                className="h-10 px-2 py-4 border-black border-2 rounded-sm bg-[#343434]"
              ></input>
            </div>

            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg">
                Enter Your Bet Amount
              </label>
              <input
                type="number"
                required
                autoComplete="off"
                value={playerEnterGameDetails.betAmount}
                onChange={handleInput}
                disabled={startGameButtonDisable}
                name="betAmount"
                id="betAmount"
                placeholder="Enter your bet amount  "
                className="h-10 px-2 py-4 border-black border-2 rounded-sm bg-[#343434]"
              ></input>
            </div>
            <button
              type="submit"
              disabled={startGameButtonDisable}
              className={` w-40 h-10 font-medium rounded-lg mt-4 ${
                startGameButtonDisable
                  ? "bg-[#4a4a4a]"
                  : "bg-[#252525] hover:bg-[#343434]"
              } transition-colors flex justify-center items-center`}
            >
              {loading1 ? (
                <FiLoader size={26} className="animate-spin" />
              ) : (
                "Start Game"
              )}
            </button>
            {loading1 ? (
              <p className="text-sm text-gray-400 mt-2">
                If the game doesn't start within 15-20 seconds, please do a hard
                refresh (Ctrl + Shift + R) 5-6 times and try again.
              </p>
            ) : (
              <></>
            )}
          </form>
          {connected ?  (
            <Drawer>
              <DrawerTrigger
                ref={fileInputRef}
                className="absolute bottom-3 w-[50%] right-0 mr-[2%] h-[5%] rounded-sm font-medium mt-4 bg-[#252525] hover:bg-[#343434]transition-colors flex justify-center items-center"
              >
                View Game Status
              </DrawerTrigger>
              <DrawerContent className="bg-[#121212] text-[#FFFFFF]">
                <DrawerHeader className="flex flex-col  justify-center items-center w-full h-full gap-3">
                  {lastMatch ? (
                    <DrawerTitle className="font-semibold border-b border-gray-600/50">
                      Last Match
                    </DrawerTitle>
                  ) : (
                    <></>
                  )}
                  <DrawerTitle className="text-5xl font-semibold border-b border-gray-600/50 flex items-end gap-2">
                    {fetchingPlayerAndTileData.STATUS === "Safe"
                      ? "You're Safe! Game Ongoing..."
                      : fetchingPlayerAndTileData.STATUS === "Doom"
                      ? "Boom! You Lost!"
                      : fetchingPlayerAndTileData.STATUS === "Win"
                      ? "Congratulations! You Won!"
                      : fetchingPlayerAndTileData.STATUS === "End"
                      ? "Game Over"
                      :"You haven't played any matches yet!"}
                    {fetchingPlayerAndTileData.STATUS == "Safe" ? (
                      <IoRocketSharp size={60} />
                    ) : fetchingPlayerAndTileData.STATUS == "Doom" ? (
                      <GiRollingBomb size={70} />
                    ) : fetchingPlayerAndTileData.STATUS == "Win" ? (
                      <GiGlassCelebration size={90} />
                    ) : (
                      <PiThumbsUpFill size={65} />
                    )}
                  </DrawerTitle>
                  {fetchingPlayerAndTileData.STATUS == "Safe" ? (
                    <DrawerDescription className="text-2xl text-green-500">
                      {fetchingPlayerAndTileData.INCREASER}x
                    </DrawerDescription>
                  ) : fetchingPlayerAndTileData.STATUS == "Win" ? (
                    <DrawerDescription className="text-2xl text-green-500">
                      {fetchingPlayerAndTileData.INCREASER}x
                    </DrawerDescription>
                  ) : (
                    <></>
                  )}

                  {fetchingPlayerAndTileData.STATUS == "Doom" &&
                  lastMatch == true ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          In the last match, you lost your bet:{" "}
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total amount you missed winning last round:{" "}
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : fetchingPlayerAndTileData.STATUS == "Doom" &&
                    lastMatch == false ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          You lost your current bet:{" "}
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total potential winnings lost this round:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : fetchingPlayerAndTileData.STATUS == "End" &&
                    lastMatch == true ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Your bet from the last match was:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total winnings from the last match:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : fetchingPlayerAndTileData.STATUS == "End" &&
                    lastMatch == false ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Your current bet:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total winnings for this round:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : fetchingPlayerAndTileData.STATUS == "End" &&
                    lastMatch == false ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Your current bet:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total winnings for this round:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : fetchingPlayerAndTileData.STATUS == "Win" &&
                    lastMatch == false ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Congratulations! You won your current bet:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total winnings for this round:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : fetchingPlayerAndTileData.STATUS == "Win" &&
                    lastMatch == true ? (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          In the last match, you won your bet:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTBETAMOUNT}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total winnings from the last match:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.LASTWINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Current bet placed:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.BET}
                        </DrawerTitle>
                      </div>
                      <div className="flex items-end gap-5 border-b border-gray-600/50">
                        <DrawerDescription className="text-2xl">
                          Total winnings so far:
                        </DrawerDescription>
                        <DrawerTitle className="text-3xl">
                          {fetchingPlayerAndTileData.WINNINGAMOUNT}
                        </DrawerTitle>
                      </div>
                    </>
                  )}
                  <div className="flex items-end gap-5 border-b border-gray-600/50">
                    <DrawerDescription className="text-2xl">
                      Total Balance:
                    </DrawerDescription>
                    <DrawerTitle className="text-3xl">
                      {fetchingPlayerAndTileData.BALANCE}
                    </DrawerTitle>
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  {/* <Button>Submit</Button> */}
                  <DrawerClose>
                    <Button variant="outline text-black">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ): (
            <></>
          )}
        </div>
        <div className="w-[70%] h-full flex items-center justify-center p-20 border-l border-gray-600/50">
          {/* {Array.from({ length: 25 }).map((_, index) => (
    <div key={index} className="rounded-lg bg-[#252525] hover:bg-[#343434]">
      aa{index + 1}
    </div>
  ))} */}

          {hasGameStarted ? (
            <div className="w-full h-full flex flex-col space-y-4">
              {" "}
              <div className="w-full h-full grid grid-cols-5 gap-4">
                {fetchingPlayerAndTileData.TILE.map((val, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-lg bg-[#252525] hover:bg-[#343434] flex items-center justify-center h-[100%] relative"
                    >
                      {/* <IoDiamondOutline size={28}/> */}
                      {/* <GiFireBomb size={28}/> */}
                      {val.open ? (
                        val.value === "Diamond" ? (
                          <IoDiamondOutline size={28} className="absolute" />
                        ) : (
                          <GiFireBomb
                            size={28}
                            className="text-red-400 absolute"
                          />
                        )
                      ) : tileLoading.load == true &&
                        tileLoading.indexOfTile == index ? (
                        <FiLoader size={26} className="animate-spin absolute" />
                      ) : (
                        <button
                          className="bg-[#4a4a4a] h-full w-full relative flex items-center justify-center rounded-lg transform transition-transform duration-200 hover:scale-105"
                          onClick={() => openTile(index + 1)}
                          disabled={tileLoading.load}
                        >
                          <img
                            src={logoTileCover}
                            width={45}
                            className="absolute"
                          />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                className="w-40 h-10 font-medium rounded-lg mt-0 
              
                bg-[#252525] hover:bg-[#343434]
               transition-colors flex justify-center items-center"
                onClick={endGame}
              >
                {endGameloading ? (
                  <FiLoader size={26} className="animate-spin" />
                ) : (
                  "End Game"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex gap-2 items-center justify-center">
                <img src={gemhunterLogo} />
                <h1 className="text-4xl font-semibold text-[#FFFFFF] border-b border-gray-600/50 ">
                  Welcome To GemHunter-AO
                </h1>
              </div>
              <ConnectButton
                profileModal={true}
                showBalance={false}
                showProfilePicture={true}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Dialog>
        <DialogTrigger ref={loadingScreen}></DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center ">
            <DialogTitle>
              {loadingScreenMessage == true ? (
                <FiLoader size={30} className="animate-spin" />
              ) : (
                <IoCheckmarkDoneSharp size={30} />
              )}
            </DialogTitle>
            {loadingScreenMessage == true ? (
              <DialogDescription className="text-black">
                Please wait a moment—your game data is loading! This may take a
                few seconds.
              </DialogDescription>
            ) : (
              <DialogDescription className="text-black">
                Data loaded successfully! You’re all set to continue.
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
