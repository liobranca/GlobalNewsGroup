const Answer = require("./Answer");
const Office = require("./Office");
const Survey = require("./Survey");
const Question = require("./Question");
const User = require("./User");
const Client = require("./Client");
const List = require("./List");
const SurveyCompleted = require("./SurveyCompleted");

Client.belongsToMany(Office, { through: "clientAndOffice" });
Office.belongsToMany(Client, { through: "clientAndOffice" });
Client.belongsToMany(List, { through: "listAndClient" });
List.belongsToMany(Client, { through: "listAndClient" });
User.belongsToMany(Office, { through: "userAndOffice" });
Office.belongsToMany(User, { through: "userAndOffice" });
SurveyCompleted.belongsTo(Survey);
Survey.hasMany(SurveyCompleted);
module.exports = {
  Answer,
  Office,
  Survey,
  SurveyCompleted,
  Question,
  User,
  List,
  Client,
};
