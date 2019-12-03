/* eslint-disable no-undef */
const errorHandler = (error, title) => {
  if (error.response) {
    if (error.response.status == 401) {
      if (error.response.data.error) {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: "401 (Unauthorized access)"
        });
      } else {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: error.response.data
        });
      }
    } else if (error.response.status == 403) {
      if (error.response.data.error) {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: error.response.data.error.message
        });
      } else {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: error.response.data
        });
      }
    } else if (error.response.status == 404) {
      if (error.response.data.error) {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: "404 (Not found)"
        });
      } else {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: "404 (Not found)"
        });
      }
    } else if (error.response.status == 500) {
      if (error.response.data.error) {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: "500 (Server error)"
        });
      } else {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: "Make sure you're connected to the internet"
        });
      }
    } else {
      if (error.response.data.error) {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: error.response.data.error.message
        });
      } else {
        iziToast.error({
          title: title,
          position: "bottomLeft",
          timeout: 10000,
          message: error.response.data
        });
      }
    }
  } else if (error.request) {
    iziToast.error({
      title: title,
      position: "bottomLeft",
      timeout: 10000,
      message: "Make sure you're connected to the internet"
    });
  } else {
    iziToast.error({
      title: title,
      position: "bottomLeft",
      timeout: 10000,
      message: error.message
    });
  }
};

export default errorHandler;
