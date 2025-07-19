import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchScorecard } from "../api/util";

function Scorecard() {
  const { id } = useParams();
  const [scorecard, setScorecard] = useState(null);
  const [result, setResult] = useState(null);
  const [playerMatch, setPlayerMatch] = useState(null);
  const [playerSeries, setPlayerSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatchScorecard(id)
      .then((data) => {
        console.log(data);
        setResult(data);
        setScorecard(data.scoreCard);
        setPlayerMatch(data.matchHeader.playersOfTheMatch);
        setPlayerSeries(data.matchHeader.playersOfTheSeries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching scorecard data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!scorecard || scorecard.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="scorecard-container bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl border border-green-600 shadow-xl mx-0 sm:mx-8 my-4 sm:my-12 p-2 sm:p-8">
      {/* Simple header without icons */}
      <div className="mb-4 sm:mb-8">
        <h2 className="font-extrabold text-xl sm:text-3xl text-green-700 tracking-wide">Scorecard</h2>
      </div>
      <h2 className="text-center mb-4 sm:mb-6 font-bold text-lg sm:text-2xl text-green-700">
        {result.status}
      </h2>
      {playerMatch.map((player) => (
        <h2 className="text-center mb-4 sm:mb-6 font-bold text-lg sm:text-2xl text-green-700" key={player.fullName}>
          Player Of The Match: {player.fullName}
        </h2>
      ))}
      {playerSeries.length === 0
        ? null
        : playerSeries.map((player) => (
            <h2 className="text-center mb-6 sm:mb-12 font-bold text-lg sm:text-2xl text-green-700" key={player.fullName}>
              Player Of The Series: {player.fullName}
            </h2>
          ))}

      {scorecard.map((inning, index) => (
        <div key={inning.batTeamDetails.batTeamName + index} className="inning-section mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-green-700">
            {`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Inning`} -{" "}
            {inning.batTeamDetails.batTeamName} Batting Score: {inning.scoreDetails.runs}/{inning.scoreDetails.wickets} ({inning.scoreDetails.overs})
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto min-w-full bg-white shadow-md rounded-lg mb-4 sm:mb-8 text-xs sm:text-base border border-green-100">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Batsman</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Runs</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Balls</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Fours</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Sixes</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Strike Rate</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Dismissal</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(inning.batTeamDetails.batsmenData || {}).map(
                  (batsman) => (
                    <tr key={batsman.batId} className="border-b">
                      <td className="border px-2 sm:px-4 py-2">{batsman.batName}</td>
                      <td className="border px-2 sm:px-4 py-2">{batsman.runs}</td>
                      <td className="border px-2 sm:px-4 py-2">{batsman.balls}</td>
                      <td className="border px-2 sm:px-4 py-2">{batsman.fours}</td>
                      <td className="border px-2 sm:px-4 py-2">{batsman.sixes}</td>
                      <td className="border px-2 sm:px-4 py-2">{batsman.strikeRate}</td>
                      <td className="border px-2 sm:px-4 py-2">{batsman.outDesc}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-green-700">
            {`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Inning`} -{" "}
            {inning.bowlTeamDetails.bowlTeamName} Bowling
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full bg-white shadow-md rounded-lg text-xs sm:text-base border border-green-100">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Bowler</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Overs</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Maidens</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Runs</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Wickets</th>
                  <th className="px-2 sm:px-4 py-2 text-green-700">Economy</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(inning.bowlTeamDetails.bowlersData || {}).map(
                  (bowler) => (
                    <tr key={bowler.bowlId} className="border-b">
                      <td className="border px-2 sm:px-4 py-2">{bowler.bowlName}</td>
                      <td className="border px-2 sm:px-4 py-2">{bowler.overs}</td>
                      <td className="border px-2 sm:px-4 py-2">{bowler.maidens}</td>
                      <td className="border px-2 sm:px-4 py-2">{bowler.runs}</td>
                      <td className="border px-2 sm:px-4 py-2">{bowler.wickets}</td>
                      <td className="border px-2 sm:px-4 py-2">{bowler.economy}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Scorecard;