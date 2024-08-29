export function getMatchdata() {
  const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent";

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '828a96ecd8msh39def3a606076e1p12fbf4jsn07de1dec11ec',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  
  return fetch(url, options)
    .then((response) => {
      return response.json().then((data) => {
        return data.typeMatches;
      });
    })
    .catch((error) => console.log(error));
}

export function getMatchinfo(id) {
  const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '828a96ecd8msh39def3a606076e1p12fbf4jsn07de1dec11ec',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching match info:", error);
      return null;
    });
}

export function getMatchScorecard(id) {
  const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/scard`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '828a96ecd8msh39def3a606076e1p12fbf4jsn07de1dec11ec',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  
  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching match info:", error);
      return null;
    });
}

export function getUpcomingMatchdata() {
  const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming";
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '828a96ecd8msh39def3a606076e1p12fbf4jsn07de1dec11ec',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
}

export function getLiveMatchdata() {
  const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live";
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '828a96ecd8msh39def3a606076e1p12fbf4jsn07de1dec11ec',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  

  return fetch(url,options)
  .then((response)=>{
    return response.json()
  })
  .catch((error)=>console.log(error))
}
