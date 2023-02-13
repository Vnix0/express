const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const hours = currentDate.getHours();
  if (day >= 1 && day <= 5 && hours >= 9 && hours <= 17) {
    next();
  } else {
    res
      .status(503)
      .send(
        "Our web application is only available during working hours (Monday to Friday, from 9 to 17)."
      );
  }
};

app.use(workingHoursMiddleware);

app.listen(3000, () => {
  console.log("Web application listening on port 3000!");
});
