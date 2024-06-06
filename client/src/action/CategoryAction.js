import axios from "axios";
import {
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_SINGLES_CATEGORIES_SUCCESS,
  GET_SINGLES_CATEGORIES_REQUEST,
  GET_SINGLES_CATEGORIES_FAIL,
} from "../constance/CategoryConstance";

export const getAllCategoryVideoAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORY_REQUEST });
    const { data } = await axios.get("/api/categories/get/all");
    dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSinglesCategoriesVideoAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLES_CATEGORIES_REQUEST });
    const { data } = await axios.get(`/api/categories/get/single/categories/videos/${id}`);
    dispatch({ type: GET_SINGLES_CATEGORIES_SUCCESS, 
      payload: data.categories
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLES_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
