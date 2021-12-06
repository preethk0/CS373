## Group Members (GitLab ID, EID)

| Name                    | Gitlab ID   | EID     |
| ----------------------- | ----------- | ------- |
| Mehul Daruka            | mehuldar    | md43628 |
| Preeth Kanamangala      | preeth      | pk9297  |
| Justin Lee              | justinolee  | jol364  |
| Raphael Samuel          | RaphSamuel  | rms4647 |
| Daniela Torres Martinez | dany-torres | dmt2657 |

## Git SHA

| Phase   | Git SHA                                  |
| ------- | ---------------------------------------- |
| Phase 1 | d52abf5c98883a2be8086a49b70a2af0f1886d7b |
| Phase 2 | c3eb265d670e0210a4c6d7e883a4dbecd6dac7a4 |
| Phase 3 | c1abc1a797af80672dbd2eb4415e16023879432a |
| Phase 4 |                                          |

## Project Leader

| Phase   | Project Leader          |
| ------- | ----------------------- |
| Phase 1 | Daniela Torres Martinez |
| Phase 2 | Mehul Daruka            |
| Phase 3 | Justin Lee              |
| Phase 4 | Preeth Kanamangala      |

## GitLab Pipelines

https://gitlab.com/mehuldar/aroundtheworld/-/pipelines

## Website

https://www.around-the-world.me/

## Completion Times for Each Phase of the Project

#### Phase 1:

| Name    | Estimate | Actual |
| ------- | -------- | ------ |
| Mehul   | 15       | 18     |
| Preeth  | 15       | 15     |
| Justin  | 15       | 15     |
| Raphael | 15       | 15     |
| Daniela | 15       | 13     |

#### Phase 2:

| Name    | Estimate | Actual |
| ------- | -------- | ------ |
| Mehul   | 25       | 35     |
| Preeth  | 25       | 20     |
| Justin  | 25       | 20     |
| Raphael | 25       | 18     |
| Daniela | 25       | 30     |

#### Phase 3:

| Name    | Estimate | Actual |
| ------- | -------- | ------ |
| Mehul   | 15       | 20     |
| Preeth  | 15       | 15     |
| Justin  | 15       | 10     |
| Raphael | 15       | 10     |
| Daniela | 15       | 20     |

#### Phase 4:

| Name    | Estimate | Actual |
| ------- | -------- | ------ |
| Mehul   | 10       |        |
| Preeth  | 10       |        |
| Justin  | 10       |        |
| Raphael | 10       |        |
| Daniela | 10       |        |

## Comments

Phase 1: N/A

Phase 2: N/A

Phase 3: We noticed the comments from Phase 2 grading about formatting large values with commas, and we will implement this next phase so as to not interfere with our current implementation of searching and sorting. We also thought it would be better to keep data about countries for which instances may not exist (such as bordering countries, countries with similar populations etc.) since, for example, it would be misleading to say that a country has no bordering countries just because we don't have instances for those countries. We will also try to make the website cleaner on mobile in Phase 4.

Phase 4: We initially tried to use the "@weknow/react-bubble-chart-d3" library for our bubble chart visualizations, however, we came across errors from the library itself that prevented us from using it for its intended functionality. I came across a project from last semester - WhereArtThou - that faced a similar problem and adapted the library code with the desired changes, so we adapted the code from their project (in ReactBubbleChart.js). For the donut charts on the visualizations page, we also adapted a similar method to what's shown in https://dev.to/vineethtrv/react-d3-donut-chart-49cm while making our own changes wherever needed.
