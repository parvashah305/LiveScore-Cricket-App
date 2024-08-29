import React, { useEffect, useState } from 'react';
import Navbar from './src/Components/Navbar';
import { getUpcomingMatchdata } from './src/api/util';
import Card from './src/Components/Card';

function Upcoming() {
  const [upcomingmatch, setupcomingmatch] = useState([]);

  useEffect(() => {
    getUpcomingMatchdata()
      .then((data) => {      
        const typeMatches = data.typeMatches;

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
                    id: match.matchInfo.matchId,
                    startdate: match.matchInfo.startDate,
                    team1: match.matchInfo.team1.teamName,
                    team2: match.matchInfo.team2.teamName,
                  });
                }
              });
            }
          });
        });

        setupcomingmatch(extractedMatchInfo);
        console.log('Extracted Match Info:', extractedMatchInfo);
      })
      .catch((error) =>
        console.error('Error fetching upcoming matches:', error)
      );
  }, []); 

  return (
    <>
      <Navbar />
      {upcomingmatch.map((match) => (
        <Card
          id={match.id}
          startdate={match.startdate}
          team1={match.team1}
          team2={match.team2}
        />
      ))}
    </>
  );
}

export default Upcoming;