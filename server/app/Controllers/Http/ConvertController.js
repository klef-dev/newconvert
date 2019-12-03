"use strict";

const Convert = use("App/Models/Convert");
const Database = use("Database");
const Mail = use("Mail");

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

class ConvertController {
  async index() {
    const converts = await Database.from("converts")
      .orderBy("id", "asc")
      .limit(1000);
    let newConverts = [];
    converts.forEach(convert => {
      newConverts.unshift({
        name: convert.name,
        reg_no: convert.reg_no,
        webmail: convert.webmail,
        programme: convert.programme,
        hall: convert.hall,
        room: convert.room,
        spiritual: convert.spiritual,
        holy: convert.holy,
        water: convert.water,
        semester: convert.semester,
        timeago: timeago(convert.created_at),
        created_at: new Date(convert.created_at).toLocaleString(),
        date: new Date(convert.created_at).toDateString()
      });
    });
    return newConverts;
  }

  async create({ request, response, auth }) {
    const user = await auth.getUser();
    if (user.unit !== "Hospitality") {
      return response.status(401).json({
        msg: "Unauthorized access, can not perform this action",
        error: true
      });
    }
    const {
      name,
      reg_no,
      webmail,
      programme,
      hall,
      room,
      spiritual,
      holy,
      water
    } = request.all();

    if (
      name == undefined ||
      reg_no == undefined ||
      webmail == undefined ||
      programme == undefined ||
      hall == undefined ||
      room == undefined ||
      spiritual == undefined ||
      holy == undefined ||
      water == undefined
    ) {
      return response.json({
        msg: "All fields required",
        error: true
      });
    }
    let month = new Date().getMonth(),
      year = new Date().getFullYear();
    month = month + 1;
    // GET SESSION
    let semester = "",
      session = new Date().getMonth();
    session = session + 1;
    switch (session) {
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

    const convert = await Convert.create({
      user_id: user.id,
      name,
      reg_no,
      webmail,
      programme,
      hall,
      room,
      spiritual,
      holy,
      water,
      year,
      month,
      semester
    });

    try {
      await Mail.send("emails.index", convert.toJSON(), message => {
        message
          .from("nconvert@klefcodes.net", "Hospitality Unit")
          .to(convert.webmail, convert.name)
          .replyTo("me@klefcodes.net", "Abraham Ugbeshe")
          .subject("WELCOME TO THE FAMILY OF CHRIST");
      });
    } catch (error) {
      return response.json({
        error: true,
        msg: "Couldn't send mail to " + webmail
      });
    }

    await user.converts().save(convert);
    return {
      name: convert.name,
      reg_no: convert.reg_no,
      webmail: convert.webmail,
      programme: convert.programme,
      hall: convert.hall,
      room: convert.room,
      spiritual: convert.spiritual,
      holy: convert.holy,
      water: convert.water,
      semester: convert.semester,
      timeago: timeago(convert.created_at),
      created_at: new Date(convert.created_at).toLocaleString(),
      date: new Date(convert.created_at).toDateString()
    };
  }

  async totalConverts({ response }) {
    const count = await Convert.getCount("id");
    return response.json({ totalConverts: count });
  }

  async year() {
    const year = await Database.from("converts").distinct("year");
    return year;
  }

  async getTotalYearly({ params, response }) {
    const tcpy = await Database.from("converts")
      .where("year", params.year)
      .getCount("year");
    return response.json({ tcpy });
  }

  async month() {
    const month = await Database.from("converts").distinct("month");
    return month;
  }

  async getTotalMonthly({ params, response }) {
    const tcpm = await Database.from("converts")
      .where("month", params.month)
      .getCount("month");
    return response.json({ tcpm });
  }

  async semester() {
    const semester = await Database.from("converts").distinct("semester");
    return semester;
  }

  async getTotalSemesterly({ params, response }) {
    const tcps = await Database.from("converts")
      .where("semester", params.semester)
      .getCount("semester");
    return response.json({ tcps });
  }

  async Rededicated({ params, response }) {
    const rededicated = await Database.from("converts")
      .where("spiritual", "Re-dedication")
      .getCount("spiritual");
    return response.json({ rededicated });
  }

  async newlyConverted({ params, response }) {
    const newlyConverted = await Database.from("converts")
      .where("spiritual", "New Convert")
      .getCount("spiritual");
    return response.json({ newlyConverted });
  }
}

module.exports = ConvertController;
