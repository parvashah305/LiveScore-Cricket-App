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
    <div className="scorecard-container mx-8 my-12">
      <h2 className="text-center mb-6 font-bold text-2xl">
        {result.status}
      </h2>
      {playerMatch.map((player) => (
        <h2 className="text-center mb-6 font-bold text-2xl" key={player.fullName}>
          Player Of The Match: {player.fullName}
        </h2>
      ))}
      {playerSeries.length === 0
        ? null
        : playerSeries.map((player, index) => (
            <h2 className="text-center mb-12 font-bold text-2xl" key={index}>
              Player Of The Series: {player.fullName}
            </h2>
          ))}

      {scorecard.map((inning, index) => (
        <div key={index} className="inning-section mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Inning`} -{" "}
            {inning.batTeamDetails.batTeamName} Batting Score: {inning.scoreDetails.runs}/{inning.scoreDetails.wickets} ({inning.scoreDetails.overs})
          </h2>

          <table className="table-auto w-full bg-gray-100 shadow-lg rounded-lg mb-8">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Batsman</th>
                <th className="px-4 py-2">Runs</th>
                <th className="px-4 py-2">Balls</th>
                <th className="px-4 py-2">Fours</th>
                <th className="px-4 py-2">Sixes</th>
                <th className="px-4 py-2">Strike Rate</th>
                <th className="px-4 py-2">Dismissal</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(inning.batTeamDetails.batsmenData || {}).map(
                (batsman) => (
                  <tr key={batsman.batId} className="border-b">
                    <td className="border px-4 py-2">{batsman.batName}</td>
                    <td className="border px-4 py-2">{batsman.runs}</td>
                    <td className="border px-4 py-2">{batsman.balls}</td>
                    <td className="border px-4 py-2">{batsman.fours}</td>
                    <td className="border px-4 py-2">{batsman.sixes}</td>
                    <td className="border px-4 py-2">{batsman.strikeRate}</td>
                    <td className="border px-4 py-2">{batsman.outDesc}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <h2 className="text-2xl font-bold mb-4">
            {`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Inning`} -{" "}
            {inning.bowlTeamDetails.bowlTeamName} Bowling
          </h2>
          <table className="table-auto w-full bg-gray-100 shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Bowler</th>
                <th className="px-4 py-2">Overs</th>
                <th className="px-4 py-2">Maidens</th>
                <th className="px-4 py-2">Runs</th>
                <th className="px-4 py-2">Wickets</th>
                <th className="px-4 py-2">Economy</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(inning.bowlTeamDetails.bowlersData || {}).map(
                (bowler) => (
                  <tr key={bowler.bowlId} className="border-b">
                    <td className="border px-4 py-2">{bowler.bowlName}</td>
                    <td className="border px-4 py-2">{bowler.overs}</td>
                    <td className="border px-4 py-2">{bowler.maidens}</td>
                    <td className="border px-4 py-2">{bowler.runs}</td>
                    <td className="border px-4 py-2">{bowler.wickets}</td>
                    <td className="border px-4 py-2">{bowler.economy}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Scorecard;