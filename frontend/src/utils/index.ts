import { userRank } from "../constants";
import { Buffer } from "buffer";
export const getMockData = (perPage: number, page: number, inputData: any) => {
  const data = [];
  for (let i = 1; i <= perPage; i++) {
    if (inputData.length - 1 >= (page - 1) * perPage - 1 + i) {
      data.push(inputData[(page - 1) * perPage - 1 + i]);
    }
  }
  return data;
};
export const mapRank = (vipPoint: number) => {
  for (let i = 0; i < userRank.length; i++) {
    if (vipPoint <= userRank[i].pointMax) {
      return userRank[i];
    }
  }
};
export const imageProcessToBase64String = (file: any) => {
  const result = Buffer.from(file || []);
  // console.log("After buffer", result);
  // Uint8Array(507036) [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 72, 0, 72, 0, 0, 255, 225, 0, 76, 69, 120, 105, 102, 0, 0, 77, 77, 0, 42, 0, 0, 0, 8, 0, 2, 1, 18, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 135, 105, 0, 4, 0, 0, 0, 1, 0, 0, 0, 38, 0, 0, 0, 0, 0, 2, 160, 2, 0, 4, 0, 0, 0, 1, 0, 0, 10, 0, 160, 3, 0, 4, 0, 0, 0, 1, 0, 0, 7, 72, 0, 0, 0, 0, 255, 237, …]
  return result.toString("base64");
};
