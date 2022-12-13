import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from "@mui/icons-material/Filter7";
import Filter8Icon from "@mui/icons-material/Filter8";
import { ReactComponent as Bronze } from "../assets/icons/bronze.svg";
import { ReactComponent as Gold } from "../assets/icons/gold.svg";
import { ReactComponent as Silver } from "../assets/icons/silver.svg";
import { ReactComponent as Platinum } from "../assets/icons/platinum.svg";
import { ReactComponent as Diamond } from "../assets/icons/diamond.svg";
export const IeltsInformation = [
  {
    title: "IELTS",
    description:
      "IELTS (The International English Language Testing System) is the world's leading language test.The test evaluates ability in four language skills: listening, reading, writing and speaking.",
    image: (
      <Filter1Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "IELTS Reading",
    description:
      "The IELTS Reading test comprises of 3 paragraphs, for which you will get a total of 60 minutes to complete. This section has 40 questions with each question carrying 1 point, and no negative marking for wrong answers.",
    image: (
      <Filter2Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "IELTS Reading Score",
    description:
      "As IELTS General Training Reading section is easier than the IELTS Academic Reading section, the scores vary accordingly too. More questions need to be answered correctly on a General Training section to receive the same grade as an Academic Reading section.",
    image: (
      <Filter3Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "IELTS READING QUESTIONS",
    description:
      "Questions will improve your skills the intelligent way. There are different kinds of questions for each of the passages that appear in the IELTS reading examination.",
    image: (
      <Filter4Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
];
export const IeltsSteps = [
  {
    title: "1 - Skim The Passage",
    description:
      "Skim the passage to know what the general idea behind the passage is.",
    image: (
      <Filter1Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "2 - Read And Identify The Type Of Question",
    description:
      "Each question falls under a question type (this is elaborated further down the page). Read the question and identify which question type it belongs to.",
    image: (
      <Filter2Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "3 - Remember The Technique Behind The Question Type",
    description:
      "Each question type follows a strategy which helps us find the answers easily (also explained further down). Recall the technique and find the answerr according to it.",
    image: (
      <Filter3Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "4 - Find The Keyword",
    description:
      "Each question would have a keyword that can be found somewhere in the passage. Discover this keyword and locate the keyword in the passage.",
    image: (
      <Filter4Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "5 - Read Around The Keyword",
    description:
      "Once you've located the keyword, read around the keyword (i.e) read a few sentences before and after the keyword to find the answer.",
    image: (
      <Filter5Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "6 - Learn To Guess The Meaning",
    description:
      "Know how to guess the meaning from the context given in the passage.",
    image: (
      <Filter6Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "7 - Write The Answer",
    description: "Find the anwser and write it down.",
    image: (
      <Filter7Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
  {
    title: "8 - REPEAT",
    description:
      "Move on to the next question quickly, as we don't have much time.",
    image: (
      <Filter8Icon
        sx={{
          width: "50px",
          height: "auto",
          color: "var(--main-content-text-color)",
        }}
      />
    ),
  },
];
export const MAX_SIZE_UPLOAD = 5 * 1024 * 1024;
export const SUPPORTED_IMAGES = ["image/png", "image/jpg", "image/jpeg"];
export const MESSAGE_ERRORS = {
  CREATE_COLLECTION: "Something went wrong, please try again later!",
};
export const API_URL = process.env.REACT_APP_API_URL;

// export const authorizationHeaders = {
//   contentType: "application/json",
//   accept: "application/json",
//   authorization: `Bearer ${localStorage.getItem("access_token")}`,
// };
export const formDataHeaders = {
  contentType: "multipart/form-data",
  accept: "application/json",
};
export const headers = {
  contentType: "application/json",
  accept: "application/json",
};
export const userRank = [
  {
    type: "New",
    frame: undefined,
    pointMin: 0,
    pointMax: 9,
  },
  {
    type: "Bronze",
    frame: Bronze,
    pointMin: 10,
    pointMax: 99,
  },
  {
    type: "Silver",
    frame: Silver,
    pointMin: 100,
    pointMax: 999,
  },
  {
    type: "Gold",
    frame: Gold,
    pointMin: 1000,
    pointMax: 9999,
  },
  {
    type: "Platinum",
    frame: Platinum,
    pointMin: 10000,
    pointMax: 99999,
  },
  {
    type: "Diamond",
    frame: Diamond,
    pointMin: 100000,
    pointMax: 999999,
  },
];
