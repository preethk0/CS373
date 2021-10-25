import React from "react";
import MehulImage from "../../images/MehulImage.png";
import DanielaImage from "../../images/DanielaImage.png";
import PreethImage from "../../images/PreethImage.png";
import RaphaelImage from "../../images/RaphaelImage.png";
import JustinImage from "../../images/JustinImage.png";
import ReactImage from "../../images/Tools/ReactImage.png";
import AWSImage from "../../images/Tools/AWSImage.png";
import NameCheapImage from "../../images/Tools/NameCheapImage.png";
import BootstrapImage from "../../images/Tools/BootstrapImage.png";
import GitLabImage from "../../images/Tools/GitLabImage.png";
import PostmanImage from "../../images/Tools/PostmanImage.png";

const membersInfo = {
  "Mehul Daruka": {
    name: "Mehul Daruka",
    photo: MehulImage,
    bio: "I'm a third-year Computer Science and Math student at UT Austin. I'm originally from New Delhi, India and lived in Singapore for most of my life before moving to Houston, Texas! I love playing tennis, ping-pong, watching Netflix and hanging out with friends.",
    responsibilities: "Full-Stack",
    commits: 0,
    issues: 0,
    tests: 6,
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
    tests: 7,
  },
  "Justin O Lee": {
    name: "Justin Lee",
    photo: JustinImage,
    bio: "I'm a third year CS major at UT Austin. I'm from Plano, TX, and I'm an avid fan of Dallas sports teams. In my free time, I enjoy playing ultimate frisbee, bouldering, baking, and discovering new restaurants in Austin.",
    responsibilities: "Front-End",
    commits: 0,
    issues: 0,
    tests: 12,
  },
  "Preeth Kanamangala": {
    name: "Preeth Kanamangala",
    photo: PreethImage,
    bio: "I'm a third year CS major at UT Austin. I grew up in Plano, TX and love to spend my free time rock climbing, playing guitar, biking, and shooting some photos.",
    responsibilities: "Back-End",
    commits: 0,
    issues: 0,
    tests: 10,
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
  {
    name: "Flask",
    photo: "https://miro.medium.com/max/800/1*Q5EUk28Xc3iCDoMSkrd1_w.png",
    description: "Backend framework for API development",
    link: "https://flask.palletsprojects.com/en/2.0.x/",
  },
  {
    name: "PostgreSQL",
    photo: "https://miro.medium.com/max/2000/1*115cqXTggxGeZq5m-yFnrw.png",
    description: "Database management/storage",
    link: "https://www.postgresql.org/",
  },
  {
    name: "Black",
    photo:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--B6r1hvay--/c_imagga_scale,f_auto,fl_progressive,h_720,q_auto,w_1280/https://dev-to-uploads.s3.amazonaws.com/i/6g60ujce9711gwwdid9m.png",
    description: "Python code formatter",
    link: "https://github.com/psf/black",
  },
  {
    name: "Docker",
    photo:
      "https://www.cloudsavvyit.com/p/uploads/2021/04/075c8694.jpeg?width=1198&trim=1,1&bg-color=000&pad=1,1",
    description: "Open source containerization platform",
    link: "https://www.docker.com/",
  },
  {
    name: "Selenium",
    photo: "https://miro.medium.com/max/600/1*G_QFeh9HIrKGOdYOusc5UQ.jpeg",
    description: "Tool for webscraping and automating web browsers",
    link: "https://www.selenium.dev/",
  },
  {
    name: "Jest",
    photo: "https://miro.medium.com/max/300/1*veOyRtKTPeoqC_VlWNUc5Q.png",
    description: "JavaScript testing framework",
    link: "https://jestjs.io/",
  },
];

export const apisUsed = [
  {
    name: "CountryLayer",
    photo:
      "https://www.programmableweb.com/sites/default/files/countrylayer.jpg",
    description: "Used to get demographic information for countries",
    link: "http://countrylayer.com/",
  },
  {
    name: "Big Data Cloud",
    photo:
      "https://www.outsystems.com/Forge_BL/rest/ComponentThumbnail/GetURL_ComponentThumbnail?ProjectImageId=36534",
    description: "Retrieve more demographic information for countries",
    link: "https://www.bigdatacloud.com/",
  },
  {
    name: "CountriesNow",
    photo: "https://countriesnow.space/img/1.png",
    description:
      "Get information on cities, states, population and basic geography of countries",
    link: "https://countriesnow.space/",
  },
  {
    name: "Youtube Data API",
    photo:
      "https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg",
    description:
      "Used for retrieving videos for country demographics and tourism",
    link: "https://developers.google.com/youtube/v3",
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
