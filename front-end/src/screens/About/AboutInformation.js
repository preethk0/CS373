import React from "react";
import MehulImage from "../../images/MehulImage.jpeg";
import ReactImage from "../../images/Tools/ReactImage.png";
import AWSImage from "../../images/Tools/AWSImage.jpeg";
import NameCheapImage from "../../images/Tools/NameCheapImage.jpeg";
import BootstrapImage from "../../images/Tools/BootstrapImage.png";
import GitLabImage from "../../images/Tools/GitLabImage.jpeg";
import PostmanImage from "../../images/Tools/PostmanImage.jpeg";

const membersInfo = {
  "Mehul Daruka": {
    name: "Mehul Daruka",
    photo: MehulImage,
    bio: "I'm a third-year Computer Science and Math student at UT Austin. I'm originally from New Delhi, India and lived in Singapore for most of my life before moving to Houston, Texas! I love playing tennis, ping-pong, watching Netflix and hanging out with friends.",
    responsibilities: "Full-Stack",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "dany-torres": {
    name: "Daniela Torres Martinez",
    photo: "",
    bio: "",
    responsibilities: "",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "Raphael Samuel": {
    name: "Raphael Samuel",
    photo: "",
    bio: "",
    responsibilities: "",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "Justin Lee": {
    name: "Justin Lee",
    photo: "",
    bio: "",
    responsibilities: "",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "Preeth Kanamangala": {
    name: "Preeth Kanamangala",
    photo: "",
    bio: "",
    responsibilities: "",
    commits: 0,
    issues: 0,
    tests: 0,
  },
};

export const toolsUsed = [
  {
    name: "React",
    photo: ReactImage,
    description: "JavaScript framework/library for front-end web development",
    link: "https://reactjs.org/",
  },
  {
    name: "AWS",
    photo: AWSImage,
    description: "Cloud computing & hosting platform",
    link: "https://aws.amazon.com/",
  },
  {
    name: "Bootstrap",
    photo: BootstrapImage,
    description:
      "Open-source CSS framework/toolkit with unique pre-built components",
    link: "https://getbootstrap.com/",
  },
  {
    name: "GitLab",
    photo: GitLabImage,
    description: "Repository manager with CI/CD pipeline",
    link: "https://gitlab.com/",
  },
  {
    name: "Postman",
    photo: PostmanImage,
    description: "API platform",
    link: "https://www.postman.com/",
  },
  {
    name: "NameCheap",
    photo: NameCheapImage,
    description: "Domain name registrar",
    link: "https://www.namecheap.com/",
  },
];

export default membersInfo;
