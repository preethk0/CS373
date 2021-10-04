import React from "react";
import MehulImage from "../../images/MehulImage.jpeg";
import DanielaImage from "../../images/DanielaImage.jpeg";
import PreethImage from "../../images/PreethImage.png";
import RaphaelImage from "../../images/RaphaelImage.jpeg";
import JustinImage from "../../images/JustinImage.jpeg";
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
    photo: DanielaImage,
    bio: "I’m a fourth year CS major at UT Austin. I was born and raised in Monterrey, Mexico. I love spending time outdoors, reading, hanging out with friends, and exploring the world.",
    responsibilities: "Back-End",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "Raphael Samuel": {
    name: "Raphael M. Samuel",
    photo: RaphaelImage,
    bio: "I'm a 4th year CS major at UT Austin. I'm from Houston, Texas. In my free time I enjoy going to the gym, exploring new cooking recipes, reading, and rowing as a part of Texas Crew!",
    responsibilities: "Front-End",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "Justin O Lee": {
    name: "Justin Lee",
    photo: JustinImage,
    bio: "I'm a third year CS major at UT Austin. I'm from Plano, TX, and I'm an avid fan of Dallas sports teams. In my free time, I enjoy playing ultimate frisbee, bouldering, baking, and discovering new restaurants in Austin.",
    responsibilities: "Front-End",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  "Preeth Kanamangala": {
    name: "Preeth Kanamangala",
    photo: PreethImage,
    bio: "I'm a third year CS major at UT Austin. I grew up in Plano, TX and love to spend my free time rock climbing, playing guitar, biking, and shooting some photos.",
    responsibilities: "Back-End",
    commits: 0,
    issues: 0,
    tests: 0,
  },
};

export const gitLabSpecialCases = {
  preethk0: "Preeth Kanamangala",
  "Justin Lee": "Justin O Lee",
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

export const ourTools = [
  {
    name: "GitLab Repository",
    photo: GitLabImage,
    description: "Our GitLab repository",
    link: "https://gitlab.com/mehuldar/aroundtheworld",
  },
  {
    name: "Postman API",
    photo: PostmanImage,
    description: "API documentation",
    link: "https://documenter.getpostman.com/view/17755632/UUy396JB",
  },
];

export default membersInfo;
