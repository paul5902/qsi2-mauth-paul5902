const omit = require("lodash.omit");
const { Group } = require("../model");

const createGroup = (userId, { title, description, metadatas }) =>
  Group.create({
    title,
    description,
    metadatas: metadatas || "",
    owner_id: userId
  }).then(group =>
    omit(
      group.get({
        plain: true
      }),
      Group.excludeAttributes
    )
  );

const isOwner = (userId, groupId) =>
  Group.findOne({
    where: {
      id: groupId
    }
  }).then(group => group.owner_id === userId);

const addMember = (userId, groupId) =>
  Group.findOne({
    where: {
      id: groupId
    }
  }).then(group => group.addUsers(userId));

const deleteMember = (userId, groupId) =>
  Group.findOne({
    where: {
      id: groupId
    }
  }).then(group => group.removeUsers(userId));

const getAllGroups = () => Group.findAll();

module.exports = {
  createGroup,
  addMember,
  isOwner,
  deleteMember,
  getAllGroups
};
