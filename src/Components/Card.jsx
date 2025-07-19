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
      <div className="w-full mx-auto my-6 sm:my-12 px-0 sm:px-4">
        <div className="relative bg-gradient-to-br from-green-50 via-white to-green-100 border border-green-600 shadow-xl rounded-2xl overflow-hidden w-full">
          {/* Green accent bar */}
          <div className="absolute left-0 top-0 h-full w-2 bg-green-600" />
          <div className="card-body p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-10">
              <h2 className="font-bold text-xl sm:text-3xl text-gray-900 text-center truncate w-full sm:w-auto">{team1}</h2>
              <img className="w-12 sm:w-20 mx-auto" src={vs} alt="versus" />
              <h2 className="font-bold text-xl sm:text-3xl text-gray-900 text-center truncate w-full sm:w-auto">{team2}</h2>
            </div>
            <div className="card-actions flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-10 gap-2 sm:gap-6">
              <button
                onClick={showDetail}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded w-full sm:w-auto text-lg shadow-md transition-colors duration-200"
              >
                Show Detail
              </button>
              <button className="bg-gray-100 text-gray-700 font-medium py-2 px-6 rounded w-full sm:w-auto text-lg border border-gray-200 cursor-default">
                {formatToIST(startdate)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal without icons */}
      {open && (
        <dialog
          open={open}
          onClose={handleClose}
          id="my_modal_3"
          className="modal"
        >
          <div className="modal-box p-0 overflow-hidden rounded-xl">
            {/* Simple header without icons */}
            <div className="bg-green-600 px-6 py-4">
              <h3 className="font-extrabold text-lg text-white tracking-wide">Match Details</h3>
            </div>
            <div className="p-6">
              <div className="mt-2">
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
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded mt-8 block mx-auto text-lg shadow-md transition-colors duration-200"
              >
                Detail ScoreCard
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Card;