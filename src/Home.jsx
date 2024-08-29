import React, { useEffect, useState } from "react";
import { getMatchdata,getMatchinfo } from "./api/util";
import Card from "./Components/Card";
import Navbar from "./Components/Navbar";
import matchinfo from "../public/matchinfo.json"


function Home() {

    const [matchBasicInfo, setMatchBasicInfo] = useState([]);
    const [matchDetails, setMatchDetails] = useState([]);
  
    useEffect(() => {
      getMatchdata()
        .then((typeMatches) => {
          const extractedMatchInfo = [];
  
          typeMatches.forEach((typeMatch) => {
            typeMatch.seriesMatches.forEach((seriesMatch) => {
              if (
                seriesMatch.seriesAdWrapper &&
                seriesMatch.seriesAdWrapper.matches
              ) {
                seriesMatch.seriesAdWrapper.matches.forEach((match) => {
                  if (match.matchInfo && match.matchInfo.matchId) {
                    extractedMatchInfo.push({
                      id:match.matchInfo.matchId,
                      startdate:match.matchInfo.startDate,
                      team1:match.matchInfo.team1.teamName,
                      team2:match.matchInfo.team2.teamName
                    })
                    
                  }
                });
              }
            });
          });
  
          setMatchBasicInfo(extractedMatchInfo);
          console.log("extractedMatchIds:", extractedMatchInfo);
    }, []);
  
    
    })
  

  return (
    <div>
      <Navbar />
      {matchBasicInfo.map((match) => (
        <Card
          id={match.id}
          startdate={match.startdate}
          team1={match.team1}
          team2={match.team2}
        />
      ))} 
    </div>
  );
}

export default Home;
