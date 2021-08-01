import qs from "qs";
import gsap from "gsap";

export const getChipsSum = (chips: string[]): number => {
  let sum: number = 0;
  chips.forEach((item: string) => (sum += +item.split("_")[1]));
  return +sum.toFixed(2);
};

export const sortChips = (chips: string[] | number): { sum: number; sortedChips: { name: string; value: number }[] } => {
  let sum = null;
  if (typeof chips !== "number") {
    sum = getChipsSum(chips);
  } else {
    sum = chips;
  }

  const rangeChips = window.state.chipValues.filter((item: { name: string; value: number }) => item.value <= sum).reverse();
  const sortedChips: { name: string; value: number }[] = [];

  function getSortedChips(sum: number, rangeChips: { name: string; value: number }[]) {
    for (let i = 0; i < rangeChips.length; i++) {
      if (rangeChips[i].value <= sum) {
        sum = +(sum - rangeChips[i].value).toFixed(2);
        sortedChips.push(rangeChips[i]);
        break;
      }
    }
    if (sum <= 0) return;
    getSortedChips(sum, rangeChips);
  }

  getSortedChips(sum, rangeChips);
  return { sum, sortedChips };
};

//
export const convertValue = (value: string | number): string => {
  return (+value).toFixed(2);
};

export const getUrlParams = (params: string[]): { params: string; parsedParams } => {
  const parsedParams = qs.parse(location.search.slice(1));

  let url = "";
  Object.keys(parsedParams).forEach((item) => {
    if (params.find((param) => param === item)) {
      url += `${[item]}=${parsedParams[item]}&`;
    }
  });

  return { params: url.slice(0, -1), parsedParams };
};

export const gsapTimer = (time: {fast: number, normal: number}, callback: () => void): void => {
  const timeSetting = window.state.settings.fastPlay ? time.fast : time.normal;

  gsap.to({ x: 0 }, timeSetting, { x: 1 }).eventCallback("onComplete", () => callback());
};

export const getPlace = (place: string): string => {
  switch (place) {
    case "place1": return "TIE";
    case "place2": return "BANKER";
    case "place3": return "PLAYER";
  }
}

export const getCardsValue = (array: number[]): number => {
  let count: number = 0;
  array.map((item) => {
    count += (item - 1) % 13 >= 9 ? 0 : ((item - 1) % 13) + 1;
    if (count >= 10) {
      count -= 10;
    }
  });

  return count;
};