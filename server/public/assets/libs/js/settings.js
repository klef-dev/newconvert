const API = "https://newconvert.lmu.edu.ng/server/public";
$(() => {
  var user_id = localStorage.getItem("user_id");
  if (user_id == null) {
    window.location.href = "https://newconvert.lmu.edu.ng/login/";
  }
  // THINGS ABOUT USER
  $("#profileContainer").html(
    `<span class="dashboard-spinner spinner-xs"></span>`
  );
  $.get(API+"/users/" + user_id, data => {
    var data = JSON.parse(data);
    if (data == false) {
      window.location.href = "https://newconvert.lmu.edu.ng/login/";
    } else {
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
              <span class="status"></span
              ><span class="ml-2">Available</span>
            </div>
            <a class="dropdown-item" href="#"
              ><i class="fas fa-user mr-2"></i>Account</a
            >
            <a class="dropdown-item" href="#"
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
                        <i class="fa fa-map-marker-alt mr-2 text-primary "></i>${webmail}
                      </span>
                      <span class="mb-2 ml-xl-4 d-xl-inline-block d-block">Head: ${head}</span>
                      <span class=" mb-2 d-xl-inline-block d-block ml-xl-4">Assistant Head: ${assistant}</span>   
                    </p>
                  </div>
                </div>
              </div>
            </div>
            `;
        $("#unit").html(unit);

        // CHANGING OF HEAD OF UNIT
        var fullNameHead = head;
        var firstName = fullNameHead
          .split(" ")
          .slice(0, -1)
          .join(" ");
        var lastName = fullNameHead
          .split(" ")
          .slice(-1)
          .join(" ");

        $("#formHead").html(
          `
            <form class="headValidation" novalidate>
            <div class="row">
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="firstNameHead">First name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstNameHead"
                  placeholder="First name"
                  value="${firstName}"
                  required
                />
                <div class="invalid-feedback">Please provide First name</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="lastNameHead">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastNameHead"
                  placeholder="Last name"
                  value="${lastName}"
                  required
                />
                <div class="invalid-feedback">Please provide your last name</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
              >
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="checkHead"
                      required
                    />
                    <label class="form-check-label" for="checkHead">
                      Confirm the changes
                    </label>
                    <div class="invalid-feedback">
                      You must confirm before submitting.
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <button class="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </div>
          </form>
            `
        );

        var forms = document.getElementsByClassName("headValidation");
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "submit",
            function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              } else {
                event.preventDefault();
                var firstNameHead = $("#firstNameHead").val(),
                  lastNameHead = $("#lastNameHead").val();
                let newHead = `${firstNameHead}  ${lastNameHead}`;
                $("input, button").attr("disabled", true);
                axios
                  .put(
                    `${API}/head/${user_id}`,
                    { head: newHead }
                  )
                  .then(res => {
                    iziToast.info({
                      title: "Updated",
                      message: `${unit} unit head's name has been changed`,
                      position: "topLeft"
                    });
                    $("input, button").attr("disabled", false);
                  })
                  .catch(err => {
                    $("input, button").attr("disabled", false);
                    iziToast.error({
                      title: "Something wrong happened",
                      message: `Couldn't connect server`
                    });
                  });
              }
              form.classList.add("was-validated");
            },
            false
          );
        });

        // END OF HEAD OF UNIT

        // CHANGING OF ASSISTANT HEAD OF UNIT
        var fullNameAssistant = assistant;
        var firstNameAssistant = fullNameAssistant
          .split(" ")
          .slice(0, -1)
          .join(" ");
        var lastNameAssistant = fullNameAssistant
          .split(" ")
          .slice(-1)
          .join(" ");

        $("#formAssistant").html(
          `
            <form class="assistantValidation" novalidate>
            <div class="row">
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="firstNameAssistant">First name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstNameAssistant"
                  placeholder="First name"
                  value="${firstNameAssistant}"
                  required
                />
                <div class="invalid-feedback">Please provide First name</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="lastNameAssistant">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastNameAssistant"
                  placeholder="Last name"
                  value="${lastNameAssistant}"
                  required
                />
                <div class="invalid-feedback">Please provide your last name</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
              >
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck lastNameAssistantCheck"
                      required
                    />
                    <label class="form-check-label" for="invalidCheck">
                      Confirm the changes
                    </label>
                    <div class="invalid-feedback">
                      You must confirm before submitting.
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <button class="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </div>
          </form>
            `
        );

        var forms = document.getElementsByClassName("assistantValidation");
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "submit",
            function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              } else {
                event.preventDefault();
                var firstNameAssistant = $("#firstNameAssistant").val(),
                  lastNameAssistant = $("#lastNameAssistant").val();
                let newAssistant = `${firstNameAssistant}  ${lastNameAssistant}`;
                $("input, button").attr("disabled", true);
                axios
                  .put(
                    `${API}/assistant/${user_id}`,
                    { assistant: newAssistant }
                  )
                  .then(res => {
                    iziToast.info({
                      title: "Updated",
                      message: `${unit} unit assistant head's name has been changed`,
                      position: "topLeft"
                    });
                    $("input, button").attr("disabled", false);
                  })
                  .catch(err => {
                    $("input, button").attr("disabled", false);
                    iziToast.error({
                      title: "Something wrong happened",
                      message: `Couldn't connect server`
                    });
                  });
              }
              form.classList.add("was-validated");
            },
            false
          );
        });

        // END OF Assistant HEAD OF UNIT

        $.ajax({
          url: `${API}/users/${user_id}`,
          cache: false,
          success: res => {
            var result = JSON.parse(res);
            if (result.error) {
              iziToast.error({
                title: "Error",
                message: `${result.error.err_text}`,
                position: "topRight"
              });
            } else {
              var unit = result[0].unit;
              switch (unit) {
                case "Hospitality":
                  // CHANGING OF MAIL FORMAT
                  $.ajax({
                    url:
                      API+"/mailing/" +
                      user_id,
                    method: "GET",
                    cache: false,
                    success: response => {
                      var result = JSON.parse(response);
                      if (result.error) {
                        $("#formMail").html(
                          `
            <form class="mailValidation" novalidate>
            <div class="row">
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="subject">Subject</label>
                <textarea 
                  class="form-control"
                  id="subject"
                  placeholder="Subject here"
                  required></textarea>
                <div class="invalid-feedback">Please provide Subject</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="title">Title of the Body</label>
                <textarea
                  class="form-control"
                  id="title"
                  placeholder="Title here"
                  required></textarea>
                <div class="invalid-feedback">Please provide a body title</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="body">Body</label>
                <textarea
                  class="form-control"
                  id="body"
                  placeholder="Body here"
                  required></textarea>
                <div class="invalid-feedback">Please provide body</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
              >
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck mailCheck"
                      required
                    />
                    <label class="form-check-label" for="invalidCheck">
                      Confirm the changes
                    </label>
                    <div class="invalid-feedback">
                      You must confirm before submitting.
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <button class="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </div>
          </form>
            `
                        );
                      } else {
                        result.map(format => {
                          $("#formMail").html(
                            `
            <form class="mailValidation" novalidate>
            <div class="row">
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="subject">Subject</label>
                <textarea 
                  class="form-control"
                  id="subject"
                  placeholder="${format.subject}"
                  required>${format.subject}</textarea>
                <div class="invalid-feedback">Please provide Subject</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="title">Title of the Body</label>
                <textarea
                  class="form-control"
                  id="title"
                  placeholder="${format.title}"
                  required>${format.title}</textarea>
                <div class="invalid-feedback">Please provide a body title</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <label for="body">Body</label>
                <textarea
                  class="form-control"
                  id="body"
                  placeholder="${format.body}"
                  required>${format.body}</textarea>
                <div class="invalid-feedback">Please provide body</div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
              >
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck mailCheck"
                      required
                    />
                    <label class="form-check-label" for="invalidCheck">
                      Confirm the changes
                    </label>
                    <div class="invalid-feedback">
                      You must confirm before submitting.
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
              >
                <button class="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </div>
          </form>
            `
                          );
                        });
                      }
                      var forms = document.getElementsByClassName(
                        "mailValidation"
                      );
                      // Loop over them and prevent submission
                      Array.prototype.filter.call(forms, function(
                        form
                      ) {
                        form.addEventListener(
                          "submit",
                          function(event) {
                            if (form.checkValidity() === false) {
                              event.preventDefault();
                              event.stopPropagation();
                            } else {
                              event.preventDefault();
                              var subject = $("#subject").val(),
                                title = $("#title").val();
                              body = $("#body").val();
                              let newFormat = {
                                subject: subject,
                                title: title,
                                body: body
                              };
                              $("input, button").attr(
                                "disabled",
                                true
                              );
                              axios
                                .put(
                                  `${API}/mailing/${user_id}`,
                                  { ...newFormat }
                                )
                                .then(res => {
                                  var data = res.data;
                                  iziToast.info({
                                    title: "Updated",
                                    message: `${
                                      data.success.success_text
                                    }`,
                                    position: "topLeft"
                                  });
                                  $("input, button").attr(
                                    "disabled",
                                    false
                                  );
                                })
                                .catch(err => {
                                  $("input, button").attr(
                                    "disabled",
                                    false
                                  );
                                  iziToast.error({
                                    title:
                                      "Something wrong happened",
                                    message: `Couldn't connect server`
                                  });
                                });
                            }
                            form.classList.add("was-validated");
                          },
                          false
                        );
                      });
                    }
                  });

                  // END OF MAIL FORMAT
                  break;
                default:
                  return;
                  break;
              }
            }
          },
          error: () => {
            iziToast.error({
              title: "Error",
              message: `Couldn't connect to server`,
              position: "center"
            });
          }
        });
        
      });
      $("#nav-user").html(output);
      $("#profileContainer").html(profileContainer);
      // END OF THINGS ABOUT USER
    }
  });

  // LOGOUT BUTTON
  $(document).on("click", "#logout", e => {
    e.preventDefault();
    localStorage.removeItem("user_id");
    location.href = "https://newconvert.lmu.edu.ng/login/";
  });
});
