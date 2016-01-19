Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code is executed on the client only

  Meteor.subscribe("tasks");

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    return Tasks.find();
  });
}

Meteor.methods({
  addTask(text) {
    Tasks.insert({
      text: text,
      createdAt: new Date()
    });
  },

  removeTask(taskId) {
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});