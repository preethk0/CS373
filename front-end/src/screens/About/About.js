import React, { useEffect, useState } from "react";
import membersInfo, {
  toolsUsed,
  ourTools,
  gitLabSpecialCases,
} from "./AboutInformation";
import "./About.css";
import BioCard from "../../components/Cards/BioCard";
import StatsCard from "../../components/Cards/StatsCard";
import ToolCard from "../../components/Cards/ToolCard";
import { Spinner } from "react-bootstrap";

const getGitLabStatistics = async () => {
  const commitsResponse = fetch(
    "https://gitlab.com/api/v4/projects/29853995/repository/contributors"
  ).then((data) => data.json());

  const issuesResponse = fetch(
    "https://gitlab.com/api/v4/projects/29853995/issues"
  ).then((data) => data.json());

  const commitsData = await commitsResponse;
  const issuesData = await issuesResponse;

  let totalCommits = 0;
  let totalTests = 0;
  let totalIssues = issuesData.length;
  let membersData = membersInfo;

  commitsData.forEach((contributor) => {
    totalTests += membersData[contributor.name]?.tests ?? 0;

    if (contributor.name in gitLabSpecialCases) {
      membersData[gitLabSpecialCases[contributor.name]].commits =
        contributor.commits;
    } else if (contributor.name in membersData) {
      membersData[contributor.name].commits = contributor.commits;
    }

    totalCommits += contributor.commits;
  });

  issuesData.forEach((issue, idx) => {
    if (Boolean(issue.assignees)) {
      issue.assignees.forEach((assignee) => {
        if (assignee.name in membersData) {
          membersData[assignee.name].issues += 1;
        }
      });
    }
  });

  return {
    totalCommits,
    totalIssues,
    totalTests,
    membersData,
  };
};

const About = ({}) => {
  const [loaded, setLoaded] = useState(false);
  const [teamInfo, setTeamInfo] = useState({});
  const [totalCommits, setTotalCommits] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalTests, setTotalTests] = useState(0);

  useEffect(async () => {
    const teamData = await getGitLabStatistics();
    setTeamInfo(teamData.membersData);
    setTotalCommits(teamData.totalCommits);
    setTotalIssues(teamData.totalIssues);
    setTotalTests(teamData.totalTests);
    setLoaded(true);
  });

  return (
    <div className="mainPage">
      <h1 className="header">About Us</h1>
      <p className="descriptionText">
        Around the World is a website that provides information about different
        countries around the world, such as basic facts and demographics,
        geography, major landmarks, tourism and traditional food dishes of each
        country. We hope to be able to provide the knowledge needed for people
        to be more mindful and accepting of different cultures, as well as
        understand different perspectives and ways of life.
      </p>
      <h1 className="header">Our Team</h1>
      {loaded ? (
        <div className="cardsGrid">
          {Object.values(teamInfo).map((member) => (
            <BioCard {...member} />
          ))}
        </div>
      ) : (
        <Spinner animation="border" role="status" />
      )}
      <h1 className="header">GitLab Repository Statistics</h1>
      {loaded ? (
        <div className="cardsGrid">
          <StatsCard title="Commits" value={totalCommits} />
          <StatsCard title="Issues" value={totalIssues} />
          <StatsCard title="Unit Tests" value={totalTests} />
        </div>
      ) : (
        <Spinner animation="border" role="status" />
      )}
      <h1 className="header">Tools Used</h1>
      <div className="cardsGrid">
        {toolsUsed.map((tool) => (
          <ToolCard {...tool} />
        ))}
      </div>
      <h1 className="header">APIs</h1>
      <text style={{ fontSize: 25 }}>None as of right now!</text>
      <h1 className="header">Our Tools & Data</h1>
      <div className="cardsGrid">
        {ourTools.map((tool) => (
          <ToolCard {...tool} />
        ))}
      </div>
    </div>
  );
};

export default About;
