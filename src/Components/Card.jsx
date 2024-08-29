import React, { useState } from "react";
import vs from "../img/vs.png";
import { getMatchinfo } from "../api/util";
import { useNavigate } from "react-router-dom"; 

function Card({ id, startdate, team1, team2 }) {
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

  const showDetail = () => {
    getMatchinfo(id).then((data) => {
      console.log(data);
      setDetail(data);
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScorecardRedirect = () => {
    navigate(`/scorecard/${id}`);
  };

  const formatToIST = (epoch) => {
    const date = new Date(parseInt(epoch)); 
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  return (
    <>
      <div className="my-12 mx-36">
        <div className="card bg-black text-white w-full shadow-2xl">
          <div className="card-body">
            <div className="grid grid-cols-6 justify-center items-center ml-80 space-x-4">
              <h2>{team1}</h2>
              <img style={{ width: 50 }} src={vs} alt="versus" />
              <h2>{team2}</h2>
            </div>
            <div className="card-actions flex justify-between items-center mt-6">
              <button
                onClick={showDetail}
                className="btn btn-outline text-white"
              >
                Show Detail
              </button>
              <button className="btn btn-outline text-white">
                {formatToIST(startdate)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <dialog
          open={open}
          onClose={handleClose}
          id="my_modal_3"
          className="modal"
        >
          <div className="modal-box">
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Match Details</h3>

            <div className="mt-12">
              <p>
                Venue: {detail.venueInfo?.ground}, {detail.venueInfo?.city}
              </p>

              <p>{detail.matchInfo.result.winningTeam==="" ? `Toss: ${detail.matchInfo.shortStatus}` :`Toss: ${detail.matchInfo?.status}`}</p>
              
              <p>{detail.matchInfo.result.winningTeam==="" ? "" : `Winning Team: ${detail.matchInfo.result.winningTeam}`}</p>
              <p>
                {detail.matchInfo.result.winningTeam==="" ? `Status: ${detail.matchInfo.status}` : `Result:
                  ${detail.matchInfo?.result?.winByRuns === true
                    ? `${detail.matchInfo.result.winningTeam} win by ${detail.matchInfo.result.winningMargin} runs`
                    : `${detail.matchInfo.result.winningTeam} win by ${detail.matchInfo.result.winningMargin} wickets`}`}
              </p>
            </div>
            <button
              onClick={handleScorecardRedirect}
              className="btn btn-outline mt-6 block mx-auto"
            >
              Detail ScoreCard
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Card;