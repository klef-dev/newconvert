const API = "https://newconvert.lmu.edu.ng/server/public";
$(() => {
  var user_id = localStorage.getItem("user_id");
  if (user_id == null) {
    window.location.href = "https://newconvert.lmu.edu.ng/login";
  }
  const timeago = date => {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2)
      return Math.round(seconds / (60 * 60 * 24 * 365.25)) + " years ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1)
      return "1 year ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2)
      return Math.round(seconds / (60 * 60 * 24 * 30.4)) + " months ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1)
      return "1 month ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2)
      return Math.round(seconds / (60 * 60 * 24 * 7)) + " weeks ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "1 week ago";
    else if (Math.round(seconds / (60 * 60 * 24)) >= 2)
      return Math.round(seconds / (60 * 60 * 24)) + " days ago";
    else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "1 day ago";
    else if (Math.round(seconds / (60 * 60)) >= 2)
      return Math.round(seconds / (60 * 60)) + " hours ago";
    else if (Math.round(seconds / (60 * 60)) >= 1) return "1 hour ago";
    else if (Math.round(seconds / 60) >= 2)
      return Math.round(seconds / 60) + " minutes ago";
    else if (Math.round(seconds / 60) >= 1) return "1 minute ago";
    else if (seconds >= 2) return seconds + " seconds ago";
    else return seconds + "1 second ago";
  };
  const getMonth = get_month => {
    this.get_month = get_month;
    var dated = new Date(get_month).getMonth();
    dated = dated + 1;
    var month = "";
    switch (dated) {
      case 1:
        return (month = "January");
        break;
      case 2:
        return (month = "Febuary");
        break;
      case 3:
        return (month = "March");
        break;
      case 4:
        return (month = "April");
        break;
      case 5:
        return (month = "May");
        break;
      case 6:
        return (month = "June");
        break;
      case 7:
        return (month = "July");
        break;
      case 8:
        return (month = "August");
        break;
      case 9:
        return (month = "September");
        break;
      case 10:
        return (month = "October");
        break;
      case 11:
        return (month = "November");
        break;
      case 12:
        return (month = "December");
        break;
      default:
        break;
    }
    console.log(month);
  };
  var date = new Date().getMonth();
  date = date + 1;
  var month = "",
    semester = "";
  switch (date) {
    case 1:
      semester = "Omega";
      break;
    case 2:
      semester = "Omega";
      break;
    case 3:
      semester = "Omega";
      break;
    case 4:
      semester = "Omega";
      break;
    case 5:
      semester = "Omega";
      break;
    case 6:
      semester = "Others";
      break;
    case 7:
      semester = "Others";
      break;
    case 8:
      semester = "Alpha";
      break;
    case 9:
      semester = "Alpha";
      break;
    case 10:
      semester = "Alpha";
      break;
    case 11:
      semester = "Alpha";
      break;
    case 12:
      semester = "Alpha";
      break;
    default:
      break;
  }

  // THINGS ABOUT USER
  $("#profileContainer").html(
    `<span class="dashboard-spinner spinner-xs"></span>`
  );
  $.get(API + "/users/" + user_id, data => {
    var data = JSON.parse(data);
    if (data == false) window.location.href = "https://newconvert.lmu.edu.ng/login";
    else {
      var output = "",
        profileContainer = "";
      data.forEach(data => {
        var unit = data.unit,
          image = data.logo,
          webmail = data.webmail,
          head = data.head,
          assistant = data.assistant;
        output += `
            <a
            class="nav-link nav-user-img"
            href="#"
            id="navbarDropdownMenuLink2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><img
              src="${image}"
              alt=""
              class="user-avatar-md rounded-circle"
              style="width: auto;"
          /></a>
          <div
            class="dropdown-menu dropdown-menu-right nav-user-dropdown"
            aria-labelledby="navbarDropdownMenuLink2"
          >
            <div class="nav-user-info">
              <h5 class="mb-0 text-white nav-user-name">${unit}</h5>
            </div>
            <a class="dropdown-item" href="settings.html"
              ><i class="fas fa-cog mr-2"></i>Setting</a
            >
            <a class="dropdown-item" href="/logout" id="logout"
              ><i class="fas fa-power-off mr-2"></i>Logout</a
            >
          </div>
            `;
        profileContainer += `
            <div class="row">
              <div class="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
                <!-- PROFILE IMAGE MAIN -->
                <div class="text-center">
                  <img
                  src="${image}"
                  alt="User Avatar"
                  class="rounded-circle user-avatar-xxl"
                  style="width: 130%; height: auto;"
                  />
                </div>
                <!-- END OF PROFILE IMAGE MAIN -->
              </div>
                <div class="col-xl-10 col-lg-8 col-md-8 col-sm-8 col-12">
                  <div class="user-avatar-info">
                    <div class="m-b-20">
                      <div class="user-avatar-name">
                        <h2 class="mb-1">${unit} Unit</h2>
                      </div>
                      <div class="rating-star  d-inline-block"></div>
                    </div>
                    <div class="user-avatar-address">
                    <p class="border-bottom pb-3">
                      <span class="d-xl-inline-block d-block mb-2">
                        ${webmail}
                      </span>
                      <span class="mb-2 ml-xl-4 d-xl-inline-block d-block">Head: ${head}</span>
                      <span class=" mb-2 d-xl-inline-block d-block ml-xl-4">Assistant Head: ${assistant}</span>   
                    </p>
                  </div>
                  <span style="cursor:pointer" id="messageThem"><i class="fa fa-envelope"></i></span>
                </div>
              </div>
            </div>
            `;
        $(document).on("click", "#messageThem", () => {
          axios
            .get(`${API}/users/${user_id}`)
            .then(result => {
              unitdata = result.data;
              if (unitdata[0]) {
                var unit = unitdata[0].unit;
                switch (unit) {
                  case "Hospitality":
                    iziToast.info({
                      timeout: false,
                      overlay: true,
                      displayMode: "once",
                      id: "inputs",
                      zindex: 999,
                      title: `Send Feedback`,
                      message: `to everyone`,
                      position: "center",
                      drag: false,
                      inputs: [
                        [
                          '<input type="text" id="message">',
                          function(instance, toast, input, e) {
                            console.info(input.value);
                          },
                          true
                        ]
                      ],
                      buttons: [
                        [
                          "<button><b>Send</b></button>",
                          function(instance, toast) {
                            var message = $("#message").val();
                            if (message === "") {
                              iziToast.warning({
                                title: "Something happened",
                                message: `We will need your feedback`
                              });
                            } else if (message.length < 4) {
                              iziToast.warning({
                                title: "Something happened",
                                message: `We will need your feedback to be more`
                              });
                            } else {
                              axios
                                .post(`${API}/feedback`, {
                                  user_id: user_id,
                                  body: message
                                })
                                .then(result => {
                                  iziToast.success({
                                    title: "Sent",
                                    message: `${
                                      result.data.success.success_text
                                    }`
                                  });
                                  instance.hide(
                                    {
                                      transitionOut: "fadeOut"
                                    },
                                    toast,
                                    "button"
                                  );
                                })
                                .catch(err => {
                                  iziToast.error({
                                    title: "Something happened",
                                    message: `Couldn't connect to server, try again...`
                                  });
                                });
                            }
                          },
                          true
                        ]
                      ]
                    });

                    break;
                  case "Chaplaincy":
                    axios
                      .get(`${API}/feedbacks/Hospitality`)
                      .then(result => {
                        stdcomment = result.data;
                        if (stdcomment.length >= 0) {
                          stdcomment.map(comment => {
                            iziToast.success({
                              timeout: false,
                              title:
                                "Feedback from Hospitality",
                              message: `${
                                comment.body
                              } - ${new Date(
                                comment.time
                              ).toDateString()}`,
                              position: "center"
                            });
                          });
                        } else {
                          iziToast.warning({
                            message: `No feedback yet from Hospitality Unit`,
                            position: "center"
                          });
                        }
                      })
                      .catch(err => {
                        iziToast.error({
                          title: "Something happened",
                          message: `Couldn't connect to server`
                        });
                      });
                    break;
                  case "Followup":
                    axios
                      .get(`${API}/feedbacks/Hospitality`)
                      .then(result => {
                        stdcomment = result.data;
                        if (stdcomment.length >= 0) {
                          stdcomment.map(comment => {
                            iziToast.success({
                              timeout: false,
                              title: "Feedback from Hospitality",
                              message: `${comment.body} - <b>${new Date(
                                comment.time
                              ).toDateString()}</b>`,
                              position: "center"
                            });
                          });
                        } else {
                          iziToast.warning({
                            message: `No feedback yet from Hospitality Unit`,
                            position: "center"
                          });
                        }
                      })
                      .catch(err => {
                        iziToast.error({
                          title: "Something happened",
                          message: `Couldn't connect to server`
                        });
                      });
                    break;

                  default:
                    return;
                    break;
                }
              } else {
                iziToast.error({
                  title: "Something happened",
                  message: `Unauthorized access`
                });
              }
            })
            .catch(err => {
              iziToast.error({
                title: "Something happened",
                message: `Couldn't connect to server`
              });
            });
        });
        $("#unit").html(unit);
      });
      $("#nav-user").html(output);
      $("#profileContainer").html(profileContainer);
      $(document).on("click", "#logout", e => {
        e.preventDefault();
        localStorage.removeItem("user_id");
        location.href = "https://newconvert.lmu.edu.ng/login";
      });
      // END OF THINGS ABOUT USER

      // NEW CONVERT DETIALS
      $.get(API + "/totalconverts", function(data) {
        var data = JSON.parse(data),
          totalConvert = "",
          reP = "",
          neP = "";
        data.forEach(total => {
          totalConvert += `
                <div class="card">
                  <div class="card-body">
                    <div class="d-inline-block">
                      <h5 class="text-muted">Total Converts</h5>
                      <h2 class="mb-0">${total.totalConverts}</h2>
                    </div>
                    <div
                      class="float-right icon-circle-medium  icon-box-lg  bg-info-light mt-1"
                    >
                      <i class="fa fa-eye fa-fw fa-sm text-info"></i>
                    </div>
                  </div>
                </div>
              `;

          // GET PERCENTAGE OF STATUS (REDEDICATED AND NEWLY CONVERTED)
          var rededication = "Re-dedication";
          $("#re").html(`<span class="dashboard-spinner spinner-xs"></span>`);
          $.get(
            `${API}/status/${rededication}`,
            data => {
              var data = JSON.parse(data);
              var point = total.totalConverts;
              var pcent = 100;
              var re = "";
              data.forEach(totalCountPerStatus => {
                var totalCountPerStatus = totalCountPerStatus.Status;
                var final = (totalCountPerStatus / point) * pcent;
                final = final.toFixed();
                if (final == NaN) {
                  re += `
                    <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 0%;"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="${pcent}"
                  ><span style="color: #000;">0%</span></div>
                    `;
                } else {
                  re += `
                    <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: ${final}%;"
                    aria-valuenow="${final}"
                    aria-valuemin="0"
                    aria-valuemax="${pcent}"
                  ><span style="color: #000;">${final}%</span></div>
                    `;
                }

                reP += final;
              });
              $("#re").html(re);
            }
          );
          // END OF PERCENTAGE

          // GET PERCENTAGE OF STATUS (REDEDICATED AND NEWLY CONVERTED)
          var newConvert = "New Convert";
          $("#new").html(`<span class="dashboard-spinner spinner-xs"></span>`);
          $("#neP").html(`<span class="dashboard-spinner spinner-xs"></span>`);
          $.get(
            `${API}/status/${newConvert}`,
            data => {
              var data = JSON.parse(data);
              var point = total.totalConverts;
              var pcent = 100;
              var nConvert = "";
              data.forEach(totalCountPerStatus => {
                var totalCountPerStatus = totalCountPerStatus.Status;
                var final = (totalCountPerStatus / point) * pcent;
                final = final.toFixed();
                if (final == NaN) {
                  nConvert += `
                      <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 0%;"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="${pcent}"
                  ><span style="color: #000;">0%</span></div>
                    `;
                } else {
                  nConvert += `
                      <div
                      class="progress-bar bg-warning"
                      role="progressbar"
                      style="width: ${final}%;"
                      aria-valuenow="${final}"
                      aria-valuemin="0"
                      aria-valuemax="${pcent}"
                    ><span style="color: #000;">${final}%</span></div>
                      `;
                }
                neP += final;
              });
              Morris.Donut({
                element: "status_donut",
                data: [
                  { value: neP, label: "Newly Converted" },
                  { value: reP, label: "Re-dedicated" }
                ],

                labelColor: "#000",
                colors: ["#ef172c", "#ffc108"],

                formatter: function(x) {
                  return x + "%";
                }
              });
              $("#new").html(nConvert);
              $("#neP").html(neP);
            }
          );
          // END OF PERCENTAGE
        });
        $("#totals").html(totalConvert);
      });
      // END OF TOTAL NEW CONVERTS

      // TOTAL NUMBER OF NEW CONVERTS FOR THE YEAR
      $.get(API + "/year", data => {
        var data = JSON.parse(data),
          y = "";
        data.forEach(fullYears => {
          years = fullYears.year;
          y += `<option value="${years}">${years}</option>`;
        });
        $("#years").html(y);

        $(document).on("click", "#years", e => {
          var yrs = $("#years").val();
          $("#tcpy").html(`<span class="dashboard-spinner spinner-xs"></span>`);
          $.get(
            API + "/totalyears/" + yrs,
            data => {
              var data = JSON.parse(data),
                tcpy = "";
              data.forEach(totalCountPerYear => {
                var totalCountPerYear = totalCountPerYear.totalCountPerYear;
                tcpy += `
                <div class="card-body" style="margin-bottom:-17px">
                    <div class="d-inline-block">
                        <h5 class="text-muted">(Year)</h5>
                        
                        <h2 class="mb-0">${totalCountPerYear}</h2>
                      </div>
                      <div
                        class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                      >
                        <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                      </div>
                </div> 
                `;
              });
              $("#tcpy").html(tcpy);
            }
          );

          // AJAX REQUEST TO GET MONTH BASED ON YEAR
          $.get(API + "/year/" + yrs, data => {
            var data = JSON.parse(data),
              m = "";
            data.forEach(fullMonth => {
              var mon = fullMonth.month;
              m += `<option value="${mon}">${getMonth(mon)}</option>`;
            });
            $("#month").html(m);
            var mnt = $("#month").val();
            $("#tcpm").html(
              `<span class="dashboard-spinner spinner-xs"></span>`
            );
            $.get(
              API + "/totalmonth/" + mnt,
              data => {
                var data = JSON.parse(data),
                  tcpm = "";
                data.forEach(totalCountPerMonth => {
                  var totalCountPerMonth =
                    totalCountPerMonth.totalCountPerMonth;
                  tcpm += `
                  <div class="card-body" style="margin-bottom:-17px">
                      <div class="d-inline-block">
                          <h5 class="text-muted">(Month)</h5>
                          
                          <h2 class="mb-0">${totalCountPerMonth}</h2>
                        </div>
                        <div
                          class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                        >
                          <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                        </div>
                  </div> 
                  `;
                });
                $("#tcpm").html(tcpm);
              }
            );
            // END OF MONTH BASED ON YEAR
          });
          // AJAX REQUEST TO GET SEMESTER BASED ON YEAR
          $.get(API + "/yrs/" + yrs, data => {
            var data = JSON.parse(data),
              s = "";
            data.forEach(fullSemester => {
              semester = fullSemester.semester;
              s += `<option value="${semester}">${semester}</option>`;
            });
            $("#semester").html(s);
            var sem = $("#semester").val();
            $("#tcps").html(
              `<span class="dashboard-spinner spinner-xs"></span>`
            );
            $.get(
              API + "/totalsemester/" + sem,
              data => {
                var data = JSON.parse(data),
                  tcps = "";
                data.forEach(totalCountPerSemester => {
                  var totalCountPerSemester =
                    totalCountPerSemester.totalCountPerSemester;
                  tcps += `
                  <div class="card-body" style="margin-bottom:-17px">
                      <div class="d-inline-block">
                          <h5 class="text-muted">(Semester)</h5>
                          
                          <h2 class="mb-0">${totalCountPerSemester}</h2>
                        </div>
                        <div
                          class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                        >
                          <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                        </div>
                  </div> 
                  `;
                });
                $("#tcps").html(tcps);
              }
            );
            // END OF SEMESTER BASED ON YEAR
          });
        });
      });
      // END OF PER YEAR

      // TOTAL NUMBER OF NEW CONVERTS FOR THE MONTH
      $.get(API + "/month", data => {
        var data = JSON.parse(data),
          m = "";
        data.forEach(fullMonth => {
          month = fullMonth.month;
          m += `<option value="${month}">${getMonth(month)}</option>`;
        });
        $("#month").html(m);
        $(document).on("click", "#month", e => {
          var mnt = $("#month").val();
          $("#tcpm").html(`<span class="dashboard-spinner spinner-xs"></span>`);
          $.get(
            API + "/totalmonth/" + mnt,
            data => {
              var data = JSON.parse(data),
                tcpm = "";
              data.forEach(totalCountPerMonth => {
                var totalCountPerMonth = totalCountPerMonth.totalCountPerMonth;
                tcpm += `
              <div class="card-body" style="margin-bottom:-17px">
                  <div class="d-inline-block">
                      <h5 class="text-muted">(Month)</h5>
                      
                      <h2 class="mb-0">${totalCountPerMonth}</h2>
                    </div>
                    <div
                      class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                    >
                      <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                    </div>
              </div> 
              `;
              });
              $("#tcpm").html(tcpm);
            }
          );
        });
      });
      // END OF MONTH

      // TOTAL NUMBER OF NEW CONVERTS FOR THE SEMESTER
      $.get(API + "/semester", data => {
        var data = JSON.parse(data),
          s = "";
        data.forEach(fullSemester => {
          semester = fullSemester.semester;
          s += `<option value="${semester}">${semester}</option>`;
        });
        $("#semester").html(s);
        $(document).on("click", "#semester", e => {
          var sem = $("#semester").val();
          $("#tcps").html(`<span class="dashboard-spinner spinner-xs"></span>`);
          $.get(
            API + "/totalsemester/" + sem,
            data => {
              var data = JSON.parse(data),
                tcps = "";
              data.forEach(totalCountPerSemester => {
                var totalCountPerSemester =
                  totalCountPerSemester.totalCountPerSemester;
                tcps += `
                  <div class="card-body" style="margin-bottom:-17px">
                      <div class="d-inline-block">
                          <h5 class="text-muted">(Semester)</h5>
                          
                          <h2 class="mb-0">${totalCountPerSemester}</h2>
                        </div>
                        <div
                          class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                        >
                          <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                        </div>
                  </div> 
                  `;
              });
              $("#tcps").html(tcps);
            }
          );
        });
      });
      // END OF SEMESTER

      // DEFAULT PER YEAR
      $("#tcpy").html(`<span class="dashboard-spinner spinner-xs"></span>`);
      $.get(API + "/totalyears/" + new Date().getFullYear(), data => {
        var data = JSON.parse(data),
          tcpy = "";
        data.forEach(totalCountPerYear => {
          var totalCountPerYear = totalCountPerYear.totalCountPerYear;
          tcpy += `
              <div class="card-body" style="margin-bottom:-17px">
                  <div class="d-inline-block">
                      <h5 class="text-muted">(Year)</h5>
                      
                      <h2 class="mb-0">${totalCountPerYear}</h2>
                    </div>
                    <div
                      class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                    >
                      <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                    </div>
              </div> 
              `;
        });
        $("#tcpy").html(tcpy);
      });
      // END OF DEFAULT PER YEAR

      // DEFAULT PER MONTH
      $("#tcpm").html(`<span class="dashboard-spinner spinner-xs"></span>`);
      axios
        .get(API + "/recentmonth")
        .then(result => {
          recentmonth = result.data[0].month;
          $.get(
            API + "/totalmonth/" + recentmonth,
            data => {
              var data = JSON.parse(data),
                tcpm = "";
              data.forEach(totalCountPerMonth => {
                var totalCountPerMonth = totalCountPerMonth.totalCountPerMonth;
                tcpm += `
              <div class="card-body" style="margin-bottom:-17px">
                  <div class="d-inline-block">
                      <h5 class="text-muted">(Month)</h5>
                      
                      <h2 class="mb-0">${totalCountPerMonth}</h2>
                    </div>
                    <div
                      class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                    >
                      <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                    </div>
              </div> 
              `;
              });
              $("#tcpm").html(tcpm);
            }
          );
        })
        .catch(err => {
          console.error("Couldn't connect to server");
        });
      // END OF DEFAULT PER MONTH

      // DEFAULT PER SEMESTER
      $("#tcps").html(`<span class="dashboard-spinner spinner-xs"></span>`);
      $.get(
        API + "/totalsemester/" + semester,
        data => {
          var data = JSON.parse(data),
            tcps = "";
          data.forEach(totalCountPerSemester => {
            var totalCountPerSemester =
              totalCountPerSemester.totalCountPerSemester;
            tcps += `
                  <div class="card-body" style="margin-bottom:-17px">
                      <div class="d-inline-block">
                          <h5 class="text-muted">(Semester)</h5>
                          
                          <h2 class="mb-0">${totalCountPerSemester}</h2>
                        </div>
                        <div
                          class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
                        >
                          <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                        </div>
                  </div> 
                  `;
          });
          $("#tcps").html(tcps);
        }
      );
      // END OF DEFAULT SEMESTER

      // NEW CONVERT TABLE
      $("#newConvertTable").html(
        `<span class="dashboard-spinner spinner-xs"></span>`
      );
      $.ajax({
        url: API + "/converts",
        method: "GET",
        cache: false,
        success: data => {
          var data = JSON.parse(data),
            output = "";

          if (data !== false) {
            data.forEach((data, key) => {
              id = key + 1;
              output += `
                <tr data-toggle="tooltip" title="${new Date(
                  data.date
                ).toDateString()}" id="${id}" style="cursor:pointer">
                <td>${id}</td>
                <td>${data.name}</td>
                <td>${data.reg_no}</td>
                <td>${data.webmail}</td>
                <td>${data.dept}</td>
                <td>${data.hall}/${data.room_no}</td>
                <td>${data.spiritualStatus}</td>
                <td>${data.waterBaptism}</td>
                <td>${data.holyGhostFilled}</td>
                <td>${data.semester}</td>
                <td data-toggle="tooltip" title="${timeago(data.date)}">${
                data.date
              }</td>
              </tr>
                `;
              $(document).on("dblclick", `#${id}`, e => {
                e.preventDefault();
                axios
                  .get(`${API}/users/${user_id}`)
                  .then(result => {
                    unitdata = result.data;
                    if (unitdata[0]) {
                      var unit = unitdata[0].unit;
                      switch (unit) {
                        case "Hospitality":
                          axios
                            .get(`${API}/comments/${data.reg_no}`)
                            .then(result => {
                              stdcomment = result.data;
                              if (stdcomment.length >= 0) {
                                stdcomment.map(comment => {
                                  iziToast.success({
                                    title: "Comment",
                                    message: `${comment.body}`,
                                    position: "center"
                                  });
                                });
                              } else {
                                iziToast.warning({
                                  message: `No comment for ${data.name} yet`,
                                  position: "center"
                                });
                              }
                            })
                            .catch(err => {
                              iziToast.error({
                                title: "Something happened",
                                message: `Couldn't connect to server`
                              });
                            });

                          break;
                        case "Chaplaincy":
                          axios
                            .get(`${API}/comments/${data.reg_no}`)
                            .then(result => {
                              stdcomment = result.data;
                              if (stdcomment.length >= 0) {
                                stdcomment.map(comment => {
                                  iziToast.success({
                                    title: "Comment",
                                    message: `${comment.body}`,
                                    position: "center"
                                  });
                                });
                              } else {
                                iziToast.warning({
                                  message: `No comment for ${data.name} yet`,
                                  position: "center"
                                });
                              }
                            })
                            .catch(err => {
                              iziToast.error({
                                title: "Something happened",
                                message: `Couldn't connect to server`
                              });
                            });
                          break;
                        case "Followup":
                          iziToast.info({
                            timeout: false,
                            overlay: true,
                            displayMode: "once",
                            id: "inputs",
                            zindex: 999,
                            title: `Comment on`,
                            message: `${data.name}`,
                            position: "center",
                            drag: false,
                            inputs: [
                              [
                                '<input type="text" id="message">',
                                "keyup",
                                function(instance, toast, input, e) {
                                  console.info(input.value);
                                },
                                true
                              ]
                            ],
                            buttons: [
                              [
                                "<button><b>Comment</b></button>",
                                function(instance, toast) {
                                  var message = $("#message").val();
                                  if (message === "") {
                                    iziToast.warning({
                                      title: "Something happened",
                                      message: `We will need your comment for ${
                                        data.name
                                      }`
                                    });
                                  } else if (message.length < 4) {
                                    iziToast.warning({
                                      title: "Something happened",
                                      message: `We will need your comment to be more`
                                    });
                                  } else {
                                    axios
                                      .post(`${API}/comment`, {
                                        user_id: user_id,
                                        body: message,
                                        reg_no: data.reg_no
                                      })
                                      .then(result => {
                                        iziToast.success({
                                          title: "Sent",
                                          message: `${
                                            result.data.success.success_text
                                          } ${data.name}`
                                        });
                                        instance.hide(
                                          {
                                            transitionOut: "fadeOut"
                                          },
                                          toast,
                                          "button"
                                        );
                                      })
                                      .catch(err => {
                                        iziToast.error({
                                          title: "Something happened",
                                          message: `Couldn't connect to server, try again...`
                                        });
                                      });
                                  }
                                },
                                true
                              ]
                            ]
                          });
                          break;

                        default:
                          return;
                          break;
                      }
                    } else {
                      iziToast.error({
                        title: "Something happened",
                        message: `Unauthorized access`
                      });
                    }
                  })
                  .catch(err => {
                    iziToast.error({
                      title: "Something happened",
                      message: `Couldn't connect to server`
                    });
                  });
              });
            });
            $("#newConvertTable").html(output);
            setTimeout(() => {
              $("#data-table-basic").DataTable();
            }, 1000);
            setInterval(() => {
              $(function() {
                $('[data-toggle="tooltip"]').tooltip();
              });
            }, 1000);
          } else {
            $("#newConvertTable").html(`No data found`);
          }
        },
        error: () => {
          $("#newConvertTable").html(`Couldn't Connect`);
        }
      });
    }
  });
});
