import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setPrepaid,
  setPostpaid,
  setDth,
  setFasttag,
  setElectricity,
  setWater,
  setLandline,
} from "../redux/operators/operatorSlice";

export const fetchOperators = async (dispatch) => {
  let operators = {
    prepaid: [],
    postpaid: [],
    dth: [],
    fastag: [],
    landline: [],
    electricity: [],
    water: [],
  };

  try {
    const response = await axios.get("/fixedDataRoute/rechargePage");

    response.data.data.forEach((operator) => {
      if (operator.rechargeType === "Prepaid") {
        operators.prepaid.push(operator);
      } else if (operator.rechargeType === "Postpaid") {
        operators.postpaid.push(operator);
      } else if (operator.rechargeType === "Dth") {
        operators.dth.push(operator);
      } else if (operator.rechargeType === "Fastag") {
        operators.fastag.push(operator);
      } else if (operator.rechargeType === "Landline") {
        operators.landline.push(operator);
      } else if (operator.rechargeType === "Electricity") {
        operators.electricity.push(operator);
      } else if (operator.rechargeType === "Water") {
        operators.water.push(operator);
      }
    });

    dispatch(setPrepaid(operators.prepaid));
    dispatch(setPostpaid(operators.postpaid));
    dispatch(setDth(operators.dth));
    dispatch(setFasttag(operators.fastag));
    dispatch(setLandline(operators.landline));
    dispatch(setElectricity(operators.electricity));
    dispatch(setWater(operators.water));
  } catch (error) {
    // console.error("Error fetching operators:", error);
    toast.error("Error fetching operators");
  }
};
