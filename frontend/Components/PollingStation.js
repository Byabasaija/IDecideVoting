import { get } from "http";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(
    "https://cdn2.iconfinder.com/data/icons/material-line-thin/1024/option-256.png"
  );
  const [candidate2URL, changeCandidate2Url] = useState(
    "https://cdn2.iconfinder.com/data/icons/material-line-thin/1024/option-256.png"
  );
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState(0);
  const [candidate2Votes, changeVote2] = useState(0);
  const [prompt, changePrompt] = useState("--");

  const contractId = process.env.CONTRACT_NAME;

  useEffect(() => {
    const getInfo = async () => {
      let x = "localStorage";
      console.log("the prompt is", localStorage.prompt);
      // vote count stuff

      let promptName = localStorage.prompt;

      let voteCount = await props.viewMethod("getVotes", {
        prompt: promptName,
      });

      console.log(voteCount);
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // // image stuff
      console.log(
        "url is ",
        await props.viewMethod("getUrl", {
          prompt: localStorage.getItem("prompt"),
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate1Url(
        await props.viewMethod("getUrl", {
          prompt: localStorage.getItem("prompt"),
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await props.viewMethod("getUrl", {
          prompt: localStorage.getItem("prompt"),
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // // vote checking stuff

      let didUserVote = await props.viewMethod("didParticipate", {
        prompt: localStorage.getItem("prompt"),
        user: props.wallet.accountId,
      });
      console.log("did user vote", didUserVote);

      await changeResultsDisplay(didUserVote);
      await changeButtonStatus(didUserVote);
    };

    getInfo();
  }, [showresults]);

  const addVote = async (index) => {
    changeButtonStatus(true);
    let receipt = await props
      .callMethod("addVote", {
        prompt: localStorage.getItem("prompt"),
        index: index,
      })
      .then(async () => {
        console.log("recording a prompt", localStorage.getItem("prompt"));
        console.log("user Account is", props.wallet.accountId);
        await props.callMethod("recordUser", {
          prompt: localStorage.getItem("prompt"),
          user: props.wallet.accountId,
        });
      })
      .then(async () => {
        let voteCount = await props.viewMethod("getVotes", {
          prompt: localStorage.getItem("prompt"),
        });
        return voteCount;
      })
      .then((voteCount) => {
        changeVote1(voteCount[0]);
        changeVote2(voteCount[1]);
        console.log(voteCount);
      })
      .then(() => {
        alert("thanks for voting!");
      });

    changeResultsDisplay(true);
  };

  return (
    <div className="w-3/4 m-auto">
       <div className="mt-5 flex justify-center">
          <h3
            className="text-gray-900 text-xl font-bold text-2xl"
          >
            {prompt}
          </h3>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2
        ">
        <div >
          <div>
            <div className="mt-5 justify-center flex ">
              <div
              >
                <img className="rounded-lg max-w-sm"
                  
                  src={candidate1URL}
                ></img>
              </div>
            </div>
            {showresults ? (
              <div
                className='justify-center flex mt-3'
                
              >
               <h2 className="text-gray-900 text-xl font-bold text-4xl"
                >
                  {candidate1Votes}
                </h2>
              </div>
            ) : null}
            <div className="flex justify-center mt-3 "
            >
              <button disabled={buttonStatus} onClick={() => addVote(0)}  type="button"
            className="inline-block px-6 py-2 border-2 border-green-500 text-white font-medium bg-green-500
            text-xs leading-tight uppercase rounded hover:bg-black  focus:outline-none
            focus:ring-0 transition duration-150 ease-in-out mr-4">
                Vote
              </button>
            </div>
          </div>
        </div>
       
        <div>
          <div>
            <div className="mt-5 justify-center flex ">
              <div
               
              >
                <img
                 className="rounded-lg max-w-sm"
                  src={candidate2URL}
                ></img>
              </div>
            </div>
            {showresults ? (
              <div
                className='justify-center flex mt-3'
                
              >
                <h2 className="text-gray-900 text-xl font-bold text-4xl"
                >
                  {candidate2Votes}
                </h2>
              </div>
            ) : null}
            <div
              className="flex justify-center mt-3"
            >
              <button disabled={buttonStatus} onClick={() => addVote(1)}  type="button"
            className="inline-block px-6 py-2 border-2 border-green-500 text-white font-medium bg-green-500
            text-xs leading-tight uppercase rounded hover:bg-black  focus:outline-none
            focus:ring-0 transition duration-150 ease-in-out mr-4">
                Vote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollingStation;
