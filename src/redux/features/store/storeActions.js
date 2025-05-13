import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getBookingUrl = import.meta.env.VITE_API_GET_BOOKINGS;
const getChangeRoomStatusUrl = import.meta.env.VITE_API_CHANGE_ROOM_STATUS;
const postHotelUrl = import.meta.env.VITE_API_POST_HOTEL;
const GET_hotelURL = import.meta.env.VITE_API_GET_HOTEL;
const PUT_ConfirmBookingURL = import.meta.env.VITE_API_PUT_ACCEPT_BOOKING;
const POST_RoomUrl = import.meta.env.VITE_API_POST_ROOM;
const GET_RoomUrl = import.meta.env.VITE_API_GET_ROOM;
const PATCH_RoomStatusUrl = import.meta.env.VITE_API_PATCH_ROOM_STATUS;
const PATCH_RoomSummarizeUrl = import.meta.env.VITE_API_GET_ROOM_SUMMARIZES;
const GET_CharsetAsDailyUrl = import.meta.env.VITE_API_GET_CHAR_SET_AS_DAILY;

/* Action */
/* Edit-save */
export const draftEditorSave = createAsyncThunk(
  "products/draftEditorSave",
  async ({ pId, values }, { rejectWithValue }) => {
    if (!pId) {
      return rejectWithValue("Product ID not found!");
    }
    if (!values) {
      return rejectWithValue("Invalid data!");
    }
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing.");
    }
    const userId = sessionStorage.getItem("userId");
    formData.append("userId", userId);
    formData.append("productName", values.productName);
    formData.append("productTitle", values.title);
    formData.append("productCategory", values.category);
    formData.append("productBrand", values.productBrand);
    formData.append("productPrice", values.price);
    formData.append("productSalePrice", values.discountPrice);
    formData.append("productDiscountPercent", values.discount);
    formData.append("productQuantity", values.stockQty);
    formData.append("productDescription", values.productDescriptions);
    formData.append("productSkinType", values.skinType);
    formData.append("productIngredients", values.keyIngredients);
    formData.append("productBenefits", values.benefit);
    formData.append("productUsageInstructions", values.usageInstruction);
    formData.append("productSizeVolume", values.sizeVolume);
    formData.append("productPublishedDate", values.expireDate[0]);
    formData.append("productExpireDate", values.expireDate[1]);
    formData.append("productTag", values.tags);
    formData.append("productCertificateTitle", values.certiciateLabel);
    formData.append("fieldOldThumbnailValue", values.fieldOldThumbnailValue);
    formData.append("productUpdateDeletedThumbnail", values.newUpdateThumbnail);

    /* Update Image in db */
    formData.append("productUpdateDeletedImage", values.newUpdateProductImage);
    formData.append(
      "productUpdateDeletedCertificateImage",
      values.newUpdateCertificateImage
    );
    values.productImage.forEach((item) => {
      formData.append("productImage", item);
    });
    values.uploadCertificate.forEach((item) => {
      formData.append("productCertificateImage", item);
    });
    values.uploadThumbnail.forEach((item) => {
      formData.append("productThumbnail", item);
    });

    const url = `http://localhost:3000/api/admin/product-draft/${pId}`;
    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Delete Product */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ pId }, { rejectWithValue }) => {
    console.log(pId);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        navigate("/auth/signin");
        return;
      }
      const url = `http://localhost:3000/api/admin/product-draft/${pId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Post(Draft-Fullfiled) Product */
export const postProduct = createAsyncThunk(
  "products/postProduct",
  async ({ values, actionBtn }, { rejectWithValue }) => {
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    formData.append("userId", userId);
    formData.append("productName", values.productName);
    formData.append("productTitle", values.title);
    formData.append("productCategory", values.category);
    formData.append("productBrand", values.productBrand);
    formData.append("productPrice", values.price);
    formData.append("productSalePrice", values.discountPrice);
    formData.append("productDiscountPercent", values.discount);
    formData.append("productQuantity", values.stockQty);
    formData.append("productDescription", values.productDescriptions);
    formData.append("productSkinType", values.skinType);
    formData.append("productIngredients", values.keyIngredients);
    formData.append("productBenefits", values.benefit);
    formData.append("productUsageInstructions", values.usageInstruction);
    formData.append("productSizeVolume", values.sizeVolume);
    formData.append("productPublishedDate", values.expireDate[0]);
    formData.append("productExpireDate", values.expireDate[1]);
    formData.append("productTag", values.tags);
    formData.append("productCertificateTitle", values.certiciateLabel);
    values.productImage.forEach((item) => {
      formData.append("productImage", item);
    });
    values.uploadCertificate.forEach((item) => {
      formData.append("productCertificateImage", item);
    });
    values.uploadThumbnail.forEach((item) => {
      formData.append("productThumbnail", item);
    });
    const endPoint = actionBtn ? "/product" : "/product-draft";

    const url = `http://localhost:3000/api/admin${endPoint}`; // Adjust as needed
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveProduct = createAsyncThunk(
  "products/approveProduct",
  async (_, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      return rejectWithValue("Access token is missing.");
    }
    try {
      const url = "http://localhost:3000/api/admin/product-draft";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something wrong with request");
    }
  }
);
//fetch product by ID
export const getProductDraftById = createAsyncThunk(
  "products/getProductDraftById",
  async ({ productId }, { rejectWithValue }) => {
    if (!productId) {
      return rejectWithValue("Product-Draft Id not found!");
    }
    const url = `http://localhost:3000/api/admin/product-draft/${productId}`;
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something wrong with request");
    }
  }
);
/* Post-Category */
export const postCategory = createAsyncThunk(
  "products/postCategory",
  async ({ values }, { rejectWithValue }) => {
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    formData.append("categoryName", values.categoryName);
    formData.append("Slug", values.Slug);
    formData.append("Description", values.Description);
    values.CategoryThumbnail.forEach((item) => {
      formData.append("CategoryThumbnail", item);
    });

    const url = `http://localhost:3000/api/admin/category`; // Adjust as needed
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/*fetch all categories*/
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (_, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const url = "http://localhost:3000/api/admin/category/DESC";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something wrong with request");
    }
  }
);
/* Disabled Category */
export const disabledCategory = createAsyncThunk(
  "products/disabledCategory",
  async ({ cateId }, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const url = `http://localhost:3000/api/admin/category/${cateId}`;
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Make a changed is draft status */
export const makeAChangeDraftProductAction = createAsyncThunk(
  "products/makeAChangeDraftProductAction",
  async ({ pId }, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const url = `http://localhost:3000/api/admin/product-draft/${pId}`;
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Change is Active status */
export const changeStatusProduct = createAsyncThunk(
  "products/changeStatusProduct",
  async ({ pId }, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `http://localhost:3000/api/admin/product/${pId}`;
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status !== 200) {
        throw new Error("Update status product incomplete!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* @GET_booking Summary */
export const bookingSummary = createAsyncThunk(
  "products/bookingSummary",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }

      const url = `http://localhost:3000/api/admin/booking-summary`;
      console.log("Sending request to:", url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @GET_room_sumarize */
export const GET_Room_Summary = createAsyncThunk(
  "products/GET_Room_Summary",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url = PATCH_RoomSummarizeUrl;
      console.log("Sending request to:", url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @GET- All Booking */
export const GET_bookings = createAsyncThunk(
  "booking/GET_bookings",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url = getBookingUrl;
      console.log("booking url", getBookingUrl);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("GET_bookings", response.data);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
export const ActivateRoom = createAsyncThunk(
  "booking/activateRoom",
  async ({ roomId }, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("access token", accessToken);

      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url = getChangeRoomStatusUrl + roomId;

      console.log("booking url", url);

      const response = await axios.patch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response-data", response.data);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @PUT-Confirm Booking */
export const PUT_CheckOutUser = createAsyncThunk(
  "booking/PUT_CheckOutUser",
  async ({ bookingId, bookingStatus }, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url = PUT_ConfirmBookingURL;
      const response = await axios.put(
        url,
        {
          bookingId,
          bookingStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error);
    }
  }
);
export const ConfirmBooking = createAsyncThunk(
  "booking/ConfirmBooking",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("access token", accessToken);

      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url =
        PUT_ConfirmBookingURL +
        "?bookingId=" +
        bookingId +
        "&roomStatus=" +
        status;

      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response-data-new", response.data);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
); /*done */

export const PATCH_changeRoomStatus = createAsyncThunk(
  "booking/PATCH_changeRoomStatus",
  async ({ roomId }, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("access token", accessToken);

      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url = getChangeRoomStatusUrl + roomId;

      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response-data-new", response.data);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @POST- HOTEL */
export const POST_hotel = createAsyncThunk(
  "hotel/POST_hotel",
  async ({ values }, { rejectWithValue }) => {
    console.log(values);

    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("starRating", values.starRating);
    formData.append("description", values.description);
    values.hotelImage.forEach((item) => {
      formData.append("hotelImage", item);
    });
    values.hotelThumbnail.forEach((item) => {
      formData.append("hotelThumbnail", item);
    });
    values.amenties.forEach((item) => {
      formData.append("amenties", item);
    });
    const url = postHotelUrl; // Adjust as needed
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* @GET- All Booking */
export const GET_hotels = createAsyncThunk(
  "hotel/GET_hotels",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }

      const url = GET_hotelURL;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response-data", response.data);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @POST- ROOM */
export const POST_room = createAsyncThunk(
  "room/POST_room",
  async ({ values }, { rejectWithValue, getState }) => {
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");

    const store = getState();
    const { roomSelect } = store.store;
    const roomType = roomSelect.filter((item) => item.value == values.roomType);
    formData.append("hotelId", values.hotelId);
    formData.append("capacity", values.capacity);
    formData.append("roomType", roomType[0].label);
    formData.append("pricePerNight", values.pricePerNight);
    formData.append("description", values.description);
    values.roomThumbnail.forEach((item) => {
      formData.append("roomThumbnail", item);
    });
    values.roomImage.forEach((item) => {
      formData.append("roomImage", item);
    });

    const url = POST_RoomUrl;
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Room-Response after posting", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* @GET- All Booking */
export const GET_room = createAsyncThunk(
  "room/GET_room",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }

      const url = GET_RoomUrl;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response-data", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @PATCH- Room Status */
export const PATCH_room_status = createAsyncThunk(
  "room/PATCH_room_status",
  async ({ roomId, status }, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }
      const url =
        PATCH_RoomStatusUrl + "?roomId=" + roomId + "&roomStatus=" + status;

      console.log("room status update url", url);
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response-data", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
/* @GET_Char-set */
export const GET_CharsetAsDaily = createAsyncThunk(
  "charSet/GET_CharsetAsDaily",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        return rejectWithValue("Access token is missing.");
      }

      const url = GET_CharsetAsDailyUrl;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response-data", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  }
);
//bookingSlice
const bookingSlice = createSlice({
  name: "products",
  initialState: {
    /* Globale Use */
    productToSearch: [],
    searchResult: [],
    /* Draft */
    items: [],
    allProduct: [],
    draftItem: [],
    draftAfterUpdate: [],
    isLoading: false,
    idle: "",
    error: null,

    // pagination
    currentPage: 1,
    itemsPerPage: 6,
    fulfilledProduct: [],
    unfulfilledProduct: [],
    allProduct: [],
    /* Category */
    categories: [],
    allCategories: [],
    activeCategories: [],
    inactiveCategories: [],
    /* Non-Draft */
    productList: [],
    /* Sort revers (a-z and z-a) */
    sort: false, //defaul a-zុំ
    /*​ @Summary-Qty of Hotel */
    totalBooking: 0,
    success: 0,
    pending: 0,
    cancelled: 0,
    /*​ @Total amount of booking */
    allBooking: [],
    successBooking: 0,
    pendingBooking: 0,
    cancelledBooking: 0,
    /*​ @Total amount of room */
    countTotalRoom: 0,
    countAvailableRoom: 0,
    countOccupied: 0,
    countMaintenance: 0,
    countClosed: 0,
    countBooked: 0,
    countPending: 0,
    countChecked_in: 0,
    countChecked_out: 0,
    countNo_show: 0,
    /* @Hotel Data */

    allHotel: [],

    /* @Room Select Data */
    allRoom: [],
    roomSelect: [
      { label: "Single Room", value: 1 },
      { label: "Double Room", value: 2 },
      { label: "Suite", value: 3 },
      { label: "Deluxe", value: 4 },
    ],
    hotelRateSelect: [
      { label: "⭐ 1 Star (Basic)", value: 1 },
      { label: "⭐⭐ 2 Stars (Budget)", value: 2 },
      { label: "⭐⭐⭐ 3 Stars (Mid-range)", value: 3 },
      { label: "⭐⭐⭐⭐ 4 Stars (Upscale)", value: 4 },
      { label: "⭐⭐⭐⭐⭐ 5 Stars (Luxury)", value: 5 },
    ],
    /* @Char-set Data */
    dailyData: {},
  },
  reducers: {
    postDraft(state, action) {
      state.allProduct.push(action.payload);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setFulfilled: (state, action) => {
      state.fulfilledProduct = action.payload;
    },
    setUnfulfilled: (state, action) => {
      state.unfulfilledProduct = action.payload;
    },
    setAll: (state, action) => {
      state.allProduct = action.payload;
    },
    setByNameSort: (state, action) => {
      // 0. By a-z 1. By z-a 2. By latest 3. By oldest
      state.productList.sort((a, b) => {
        if (action.payload == 1) {
          // Sort descending (z-a)
          return b.name.localeCompare(a.name);
        } else if (action.payload == 2) {
          // Sort ascending (latest)
          return b.id - a.id;
        } else if (action.payload == 3) {
          // Sort ascending (oldest)
          return a.id - b.id;
        } else {
          // Sort ascending (a-z)
          return a.name.localeCompare(b.name);
        }
      });
    },
    setSearch: (state, action) => {
      state.productToSearch = action.payload.searchIn;
      const searchField = action.payload.searchField;
      state.searchResult = state.productToSearch.filter((item) =>
        item.name.startsWith(searchField)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      /* Post Product-draft */
      .addCase(postProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const newProduct = action.payload.data;

        if (newProduct.isIncomplete) {
          state.unfulfilledProduct.push(newProduct);
        } else {
          state.fulfilledProduct.push(newProduct);
        }
        state.allProduct.push(newProduct);

        state.fulfilledProduct.sort((a, b) => b.id - a.id);
        state.allProduct.sort((a, b) => b.id - a.id);
        state.unfulfilledProduct.sort((a, b) => b.id - a.id);
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.isLoading = false;
        action.error = action.payload;
      })
      /* Fetch-all Product-draft */
      .addCase(approveProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fulfilledProduct = action.payload.data.filter(
          (item) => !item.isIncomplete && item.isDraft
        );
        state.unfulfilledProduct = action.payload.data.filter(
          (item) => item.isIncomplete && item.isDraft
        );
        state.allProduct = action.payload.data.filter((item) => item.isDraft);
        state.productList = action.payload.data.filter(
          (item) => !item.isIncomplete && !item.isDraft
        );
      })
      .addCase(approveProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* posting category  */
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.unshift(action.payload.data);
        state.allCategories.unshift(action.payload.data);
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* fetching category  */
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.category;
        state.allCategories = action.payload.category;
        state.activeCategories = action.payload.category.filter(
          (item) => item.isActive == 1
        );
        state.inactiveCategories = action.payload.category.filter(
          (item) => item.isActive != 1
        );
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Disabled Category */
      .addCase(disabledCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(disabledCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        /* Checking it in allCategory arrray does it exist or not */
        const newIdUpdated = action.payload.data.id;

        const getIndex = state.allCategories.findIndex(
          (item) => item.id == newIdUpdated
        );
        state.allCategories[getIndex] = action.payload.data;
        state.allCategories.sort((a, b) => b.id - a.id);

        if (action.payload.data.isActive) {
          /* Checking it in inActive arrray does it exist or not */
          const checkingInactive = state.inactiveCategories.filter(
            (item) => item.id !== action.payload.data.id
          );
          state.inactiveCategories = checkingInactive;
          const getIndex = state.activeCategories.findIndex(
            (item) => item.id == newIdUpdated
          );
          if (getIndex === -1) {
            state.activeCategories.unshift(action.payload.data);
          } else {
            state.activeCategories[getIndex] = action.payload.data;
          }
          state.activeCategories.sort((a, b) => b.id - a.id);
        } else {
          /* Checking it in active arrray does it exist or not */

          const checkingActive = state.activeCategories.filter(
            (item) => item.id !== action.payload.data.id
          );
          state.activeCategories = checkingActive;
          const getIndex = state.inactiveCategories.findIndex(
            (item) => item.id == newIdUpdated
          );
          if (getIndex === -1) {
            state.inactiveCategories.unshift(action.payload.data);
          } else {
            state.inactiveCategories[getIndex] = action.payload.data;
          }
          state.inactiveCategories.sort((a, b) => b.id - a.id);
        }
      })
      .addCase(disabledCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* Get-Product by Id */
      .addCase(getProductDraftById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductDraftById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.draftItem.push(action.payload);
      })
      .addCase(getProductDraftById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Save-edit action
      .addCase(draftEditorSave.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(draftEditorSave.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload.product;

        if (updatedProduct.isIncomplete) {
          const filterFulFilled = state.fulfilledProduct.filter(
            (item) => item.id != updatedProduct.id
          );
          state.fulfilledProduct = filterFulFilled;
          const findIndexUnfulfilled = state.unfulfilledProduct.findIndex(
            (item) => item.id == updatedProduct.id
          );
          if (findIndexUnfulfilled !== 1) {
            state.unfulfilledProduct[findIndexUnfulfilled] = updatedProduct;
          } else {
            state.unfulfilledProduct.push(updatedProduct);
          }
          state.unfulfilledProduct.sort((a, b) => b.id - a.id);
        } else {
          const filterUnfulfilled = state.unfulfilledProduct.filter(
            (item) => item.id !== updatedProduct.id
          );
          state.unfulfilledProduct = filterUnfulfilled;
          const findIndexFulfilled = state.fulfilledProduct.findIndex(
            (item) => item.id == updatedProduct.id
          );
          if (findIndexFulfilled !== -1) {
            state.fulfilledProduct[findIndexFulfilled] = updatedProduct;
          } else {
            state.fulfilledProduct.push(updatedProduct);
          }
          state.fulfilledProduct.sort((a, b) => b.id - a.id);
        }
        const searchAll = state.allProduct.findIndex(
          (product) => product.id === updatedProduct.id
        );
        state.allProduct[searchAll] = updatedProduct;
        state.allProduct.sort((a, b) => b.id - a.id);
      })
      .addCase(draftEditorSave.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Delete product */
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const deleteProductId = action.payload.idDeleted;
        state.allProduct = state.allProduct.filter(
          (item) => item.id != deleteProductId
        );
        state.productList = state.productList.filter(
          (item) => item.id != deleteProductId
        );
        state.fulfilledProduct = state.fulfilledProduct.filter(
          (item) => item.id != deleteProductId
        );
        state.unfulfilledProduct = state.unfulfilledProduct.filter(
          (item) => item.id != deleteProductId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Make change to Product Draft/non-Draft */
      .addCase(makeAChangeDraftProductAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeAChangeDraftProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const newChangeProduct = action.payload.data;

        if (newChangeProduct.isDraft) {
          state.productList = state.productList.filter(
            (item) => item.id !== newChangeProduct.id
          );
          state.allProduct.push(newChangeProduct);
          state.fulfilledProduct.push(newChangeProduct);

          /* sort */
          state.allProduct.sort((a, b) => b.id - a.id);
          state.fulfilledProduct.sort((a, b) => b.id - a.id);
        } else {
          state.productList.push(newChangeProduct);
          state.productList.sort((a, b) => b.id - a.id);
          state.allProduct = state.allProduct.filter(
            (item) => item.id != newChangeProduct.id
          );
          state.fulfilledProduct = state.fulfilledProduct.filter(
            (item) => item.id != newChangeProduct.id
          );
          state.unfulfilledProduct = state.unfulfilledProduct.filter(
            (item) => item.id != newChangeProduct.id
          );
        }
      })
      .addCase(makeAChangeDraftProductAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Make change to Product's Status */
      .addCase(changeStatusProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeStatusProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const newChangeProduct = action.payload.data;
        const findExistProductIndex = state.productList.findIndex(
          (item) => item.id === newChangeProduct.id
        );
        if (findExistProductIndex !== -1) {
          state.productList[findExistProductIndex] = newChangeProduct;
        } else {
          state.productList.push(newChangeProduct);
        }
        state.productList.sort((a, b) => b.id - a.id);
      })
      .addCase(changeStatusProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /*@Get Booking Summary*/
      .addCase(bookingSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bookingSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalBooking = action.payload.data.totalBooking;
        state.success = action.payload.data.totalBookingSuccess;
        state.pending = action.payload.data.totalBookingPending;
        state.cancelled = action.payload.data.totalBookingCancelled;
      })
      .addCase(bookingSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /*@Get Booking*/
      .addCase(GET_bookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GET_bookings.fulfilled, (state, action) => {
        console.log("Booking Data", action.payload.data);
        state.isLoading = false;
        state.allBooking = action.payload.data;
      })
      .addCase(GET_bookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /*@PUT-accept booking*/
      .addCase(PUT_CheckOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PUT_CheckOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("booking-updte-adcase", action.payload.data);
        state.allBooking = action.payload.data;
      })
      .addCase(PUT_CheckOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /*@Confirm Booking Event*/
      .addCase(ConfirmBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ConfirmBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allBooking = action.payload.data.data;
      })
      .addCase(ConfirmBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* POST_Hotel Data */
      .addCase(POST_hotel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(POST_hotel.fulfilled, (state, action) => {
        state.isLoading = false;
        const NewHotel = action.payload.data;
        state.allHotel.push(NewHotel);
        state.allHotel.sort((a, b) => b.id - a.id);
        console.log("data of posting hotel", action.payload.data);
      })
      .addCase(POST_hotel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* GET_Hotel Data */
      .addCase(GET_hotels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GET_hotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allHotel = action.payload.data;
        console.log("Hotel Data", action.payload.data);
      })
      .addCase(GET_hotels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* @GET - room */
      .addCase(GET_room.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GET_room.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoom = action.payload.data;
      })
      .addCase(GET_room.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* @POST - room */
      .addCase(POST_room.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(POST_room.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoom = action.payload.data;
      })
      .addCase(POST_room.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* @PATCH - room */
      .addCase(PATCH_room_status.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PATCH_room_status.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allBooking = action.payload.booking.data;
        state.allRoom = action.payload.data;
      })
      .addCase(PATCH_room_status.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* @GET - room Summarize */
      .addCase(GET_Room_Summary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GET_Room_Summary.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data;
        state.countTotalRoom = data.countTotal;
        state.countAvailableRoom = data.countAvailable;
        state.countBooked = data.countBooked;
        state.countPending = data.countPending;
        state.countChecked_in = data.countChecked_in;
        state.countChecked_out = data.countChecked_out;
        state.countClosed = data.countClosed;
        state.countMaintenance = data.countMaintenance;
        state.countOccupied = data.countOccupied;
        state.countNo_show = data.countNo_show;
      })
      .addCase(GET_Room_Summary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* @GET-CHarset Ad Daily */
      .addCase(GET_CharsetAsDaily.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GET_CharsetAsDaily.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyData = action.payload.data;
      })
      .addCase(GET_CharsetAsDaily.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});
export const {
  setPage,
  setItemPerPage,
  setFulfilled,
  setUnfulfilled,
  setAll,
  setByNameSort,
} = bookingSlice.actions;
export default bookingSlice.reducer;
