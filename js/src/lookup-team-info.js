function lookupTeamInfo(team, field) {
  let teams = [
    { "team": "Cardinals", "abbrv": "ARZ", "sdi": "Arizona", team_color: "#B10339", team_text_color: "black", },
    { "team": "Falcons", "abbrv": "ATL", "sdi": "Atlanta", team_color: "#231F20", team_text_color: "black" },
    { "team": "Ravens", "abbrv": "BAL", "sdi": "Baltimore", team_color: "#2B025B", team_text_color: "black" },
    { "team": "Bills", "abbrv": "BUF", "sdi": "Buffalo", team_color: "#C60C30", team_text_color: "black" },
    { "team": "Panthers", "abbrv": "CAR", "sdi": "Carolina", team_color: "#0088CE", team_text_color: "black" },
    { "team": "Bears", "abbrv": "CHI", "sdi": "Chicago",team_color: "#12182d", team_text_color: "white" },
    { "team": "Bengals", "abbrv": "CIN", "sdi": "Cincinnati", team_color: "#FB4F14", team_text_color: "black" },
    { "team": "Browns", "abbrv": "CLE", "sdi": "Cleveland", team_color: "#ed7e11", team_text_color: "black" },
    { "team": "Cowboys", "abbrv": "DAL", "sdi": "Dallas", team_color: "#D0D2D4", team_text_color: "black" },
    { "team": "Broncos", "abbrv": "DEN", "sdi": "Denver", team_color: "#FB4F14", team_text_color: "black" },
    { "team": "Lions", "abbrv": "DET", "sdi": "Detroit",  team_color: "#006EA1", team_text_color: "black" },
    { "team": "Packers", "abbrv": "GB", "sdi": "Green Bay", team_color: "#FFCC00", team_text_color: "white" },
    { "team": "Texans", "abbrv": "HOU", "sdi": "Houston", team_color: "#B31B34", team_text_color: "white" },
    { "team": "Colts", "abbrv": "IND", "sdi": "Indianapolis",team_color: "#00417E", team_text_color: "black" },
    { "team": "Jaguars", "abbrv": "JAX", "sdi": "Jacksonville", team_color: "#00839C", team_text_color: "black" },
    { "team": "Chiefs", "abbrv": "KC", "sdi": "Kansas City", team_color: "#C60024", team_text_color: "black" },
    { "team": "Dolphins", "abbrv": "MIA", "sdi": "Miami", team_color: "#008D97", team_text_color: "white"},
    { "team": "Vikings", "abbrv": "MIN", "sdi": "Minnesota", team_color: "#240A67", team_text_color: "black" },
    { "team": "Patriots", "abbrv": "NWE", "sdi": "New England", team_color: "#00295B", team_text_color: "black" },
    { "team": "Saints", "abbrv": "NO", "sdi": "New Orleans", team_color: "#C6A876", team_text_color: "black" },
    { "team": "Jets", "abbrv": "NYJ", "sdi": "N.Y. Jets", team_color: "#2A433A", team_text_color: "black" },
    { "team": "Giants", "abbrv": "NYG", "sdi": "N.Y. Giants",team_color: "#00839C", team_text_color: "black" },
    { "team": "Raiders", "abbrv": "OAK", "sdi": "Oakland", team_color: "#000000", team_text_color: "black" },
    { "team": "Eagles", "abbrv": "PHI", "sdi": "Philadelphia", team_color: "#C0C0C0", team_text_color: "white" },
    { "team": "Steelers", "abbrv": "PIT", "sdi": "Pittsburgh", team_color: "#000000", team_text_color: "black" },
    { "team": "Chargers", "abbrv": "SD", "sdi": "San Diego", team_color: "#05173C", team_text_color: "black" },
    { "team": "49ers", "abbrv": "SF", "sdi": "San Francisco", team_color: "#940029", team_text_color: "black" },
    { "team": "Seahawks", "abbrv": "SEA", "sdi": "Seattle", team_color: "#030F1F", team_text_color: "black" },
    { "team": "Rams", "abbrv": "LA", "sdi": "Los Angeles", team_color: "#00295B", team_text_color: "black" },
    { "team": "Buccaneers", "abbrv": "TB", "sdi": "Tampa Bay", team_color: "#D60A0B", team_text_color: "black" },
    { "team": "Titans", "abbrv": "TEN", "sdi": "Tennessee", team_color: "#002C4B", team_text_color: "black" }, 
    { "team": "Redskins", "abbrv": "WAS", "sdi": "Washington", team_color: "#8C001A", team_text_color: "black" }
  ]
  for(var i = 0; i < teams.length; i++) {
    if(team == teams[i].team || team == teams[i].sdi || team == teams[i].abbrv) {
      return teams[i][field];
    }
  }

  return undefined;

}

module.exports = lookupTeamInfo;