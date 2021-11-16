import React from "react"
import { configure, shallow } from "enzyme";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "../App"
import About from "../screens/About/About"
import HomeSplash from "../screens/HomeSplash/HomeSplash"
import DemographicsAll from "../screens/Demographics/DemographicsAll";
import FoodAndTourismAll from "../screens/FoodAndTourism/FoodAndTourismAll";
import GeographyAll from "../screens/Geography/GeographyAll";
import BioCard from "../components/Cards/BioCard"
import ModelCard from "../components/Cards/ModelCard";
import StatsCard from "../components/Cards/StatsCard";
import ToolCard from "../components/Cards/ToolCard";
import CountryCard from "../components/Cards/CountryCard";
import NavBar from "../components/NavBar/NavBar"
import Search from "../screens/Search/Search";

configure({ adapter: new Adapter() });

describe("Render Pages", () => {

    test("App", () => {
        shallow(<App />)
    })

    test("About", () =>{
        const aboutTest = shallow(<About />)
        const description = aboutTest.find("p").text()
        expect(description).toContain("Around the World is a website that provides information about")
    })

    test("Home Splash", () =>{
        const homeSplashTest = shallow(<HomeSplash />)
        const subtitle = homeSplashTest.find("h3").text()
        expect(subtitle).toEqual("Explore the world from the comfort of your home!")
    })

    test("Home Splash search bar", () =>{
        const homeSplashTest = shallow(<HomeSplash />)
        const search = homeSplashTest.find("input").html()
        expect(search).toContain("Search our website")
    })

    // test("Demographics ViewAll", () =>{
    //     const demAllTest = shallow(<DemographicsAll />)
    //     const header = demAllTest.find("h2").text()
    //     const descriptionText = demAllTest.find("p").text()
    //     expect(header).toEqual("Demographics")
    //     expect(descriptionText).toContain("give you some basic information about it")
    // })

    // test("Food and Tourism ViewAll", () =>{
    //     const foodAllTest = shallow(
    //         <QueryParamProvider ReactRouterRoute={Route}>
    //             <FoodAndTourismAll />
    //         </QueryParamProvider>
    //     )
    //     const header = foodAllTest.find("h2").text()
    //     const descriptionText = foodAllTest.find("p").text()
    //     expect(header).toEqual("Food and Tourism")
    //     expect(descriptionText).toContain("show you the food and landmarks you'll come across")
    // })

    // test("Geography ViewAll", () =>{
    //     const geoAllTest = shallow(<GeographyAll />)
    //     const header = geoAllTest.find("h2").text()
    //     const descriptionText = geoAllTest.find("p").text()
    //     expect(header).toEqual("Geography")
    //     expect(descriptionText).toContain("show you some basic geographical information")
    // })

    // test("Search", () =>{
    //     const searchTest = shallow(<Search />)
    //     const header = searchTest.find("h2").text()
    //     const descriptionText = searchTest.find("p").text()
    //     expect(header).toEqual("Search")
    //     expect(descriptionText).toContain("Search for a country's information")
    // })
})

describe("Render Components", () => {

    test("Bio Card", () => {
        const mockBioProps = {
            name: "Mock Developer",
            photo: "https://www.petplace.com/static/34b93d6fa8ec8aa3cdfd706fa8585f98/c85e8/shutterstock_1555613531.png",
            bio: "I enjoy writing Jest tests in my free time",
            responsibilities: "Full Stack",
            commits: 101,
            issues: 202,
            tests: 303
        }
        const mockBio = shallow(<BioCard {...mockBioProps} />);
        expect(mockBio).toMatchSnapshot();
    });

    test("Model Card", () => {
        const mockModelProps = {
            name: "Mock Model",
            photo: "https://www.pngall.com/wp-content/uploads/4/German-Shepherd-Puppy-PNG-Picture.png",
            description: "Learn more about the world!",
            link: "https://www.around-the-world.me"
        }
        const mockModel = shallow(<ModelCard {...mockModelProps} />);
        expect(mockModel).toMatchSnapshot();
    });

    test("Stats Card", () => {
        const mockStatsProps = {
            title: "Tests",
            value: 10
        }
        const mockStats = shallow(<StatsCard {...mockStatsProps} />);
        expect(mockStats).toMatchSnapshot();
    });

    test("Tool Card", () => {
        const mockToolProps = {
            name: "Mock Tool",
            photo: "https://www.pngitem.com/pimgs/m/49-495842_cute-puppies-png-free-download-transparent-toy-poodle.png",
            description: "A useful dev tool for this project",
            link: "https://www.around-the-world.me/about"
        }
        const mockTool = shallow(<ToolCard {...mockToolProps} />);
        expect(mockTool).toMatchSnapshot();
    });

    test("Country Card", () => {
        const highlightText = (text) => {
            return text;
        };

        const mockCountryProps = {
            country: {
                "countries_with_similar_pop": "['Texas A&M', 'Oklahoma']", 
                "country_GDP": 30100000000, 
                "country_GDP_per_capita": 10824.00, 
                "country_calling_code": "1", 
                "country_capital": "Austin", 
                "country_cities": 1, 
                "country_currency": "USD", 
                "country_demographics_video_src": "https://www.youtube.com/embed/qtgyvfiu1cs", 
                "country_domain": ".ut", 
                "country_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/University_of_Texas_at_Austin_seal.svg/1200px-University_of_Texas_at_Austin_seal.svg.png", 
                "country_flag_emoji": "\ud83c\uddfa\ud83c\uddf8", 
                "country_id": "UT", 
                "country_income_level": "High income", 
                "country_languages": "['English']", 
                "country_name": "University of Texas", 
                "country_population": 40048, 
                "country_states": 12
            },
            highlightText: highlightText
        }
        const mockCountry = shallow(<CountryCard {...mockCountryProps} />);
        expect(mockCountry).toMatchSnapshot();
    });

    test("Nav Bar", () => {
        const navTest = shallow(<NavBar />);
        expect(navTest).toMatchSnapshot();
    });
})