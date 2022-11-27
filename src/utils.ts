import { APIRes, PostByUser } from "./types";

const formatData = (apiRes: APIRes[]): PostByUser => {
  return groupByProp("userId", apiRes);
};

export { formatData };

const groupByProp = (propName: keyof APIRes, arrObj: APIRes[]): PostByUser => {
  let res: PostByUser = {};

  for (const item of arrObj) {
    const index = String(item[propName]);

    if (res.hasOwnProperty(index)) {
      res[index].push(item);
    } else {
      res[index] = [item];
    }
  }

  return res;
};
