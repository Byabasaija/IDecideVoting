import { Near } from "near-api-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { async } from "regenerator-runtime";
let contractId = process.env.CONTRACT_NAME;
console.log(contractId);

const Home = (props) => {
  const [disableButton, changeDisableButton] = useState(false);

  useEffect(() => {
    console.log("loading prompts");
    const getInfo = async () => {
      let output = await props.getPrompts();
      props.changePromptList(output);
      if (output.length === 0) {
        changeDisableButton(true);
      }
    };
    getInfo();
  }, []);

  const clearPolls = async () => {
    await props.callMethod("clearPromptArray");
    changeDisableButton(true);
    alert("Please Reload the Page");
  };

  const addPrompt = async () => {
    await props.callMethod("addToPromptArray", {
      prompt: "dorian",
    });
    console.log("adding prompt");
  };

  return (
   <> 
   <div className="font-bold text-2xl flex justify-center mt-10"><Link to="/newpoll">
   <span>New Poll</span>
   </Link></div>
    <div className="flex justify-center mt-10 ">
      <div className="rounded-lg shadow-lg bg-white w-1/3 p-2">
          {props.promptList.length > 0 ? props.promptList.map((el, index) => {
            
              return (
                <div key={index} className="flex justify-between items-center">
                  
                  <h5 className="text-gray-900 text-xl font-medium">{el}</h5>
                  <button onClick={() => props.changeCandidates(el)} className="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg
          focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
          active:shadow-lg transition duration-150 ease-in-out">
                      Go to Poll
                  </button>
                </div>
              )
          }):
            <h1 className="text-gray-900 text-4xl">No polls to show! 😔 </h1>
           }
      
      </div>
     
    </div>
     {props.promptList.length > 0 && 
      <div className="flex justify-center mt-10">
      <button 
       className="inline-block px-6 py-2 border-2 border-red-500 text-white font-medium bg-red-500
       text-xs leading-tight uppercase rounded hover:bg-red-700  focus:outline-none
       focus:ring-0 transition duration-150 ease-in-out mr-4"
       onClick={clearPolls}
       disabled={disableButton}
     >
       {" "}
       Clear Polls
     </button>{" "}
   </div>}
   </>
  );
};

export default Home;
