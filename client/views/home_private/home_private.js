//Template.HomePrivate.rendered = function () {
//
//};

Template.HomePrivate.onRendered ( function () {
  // Find the users serialized gridster dashboard
  //if(Meteor.user().dashboard) {
  //
  //}
  //var user = Meteor.user().dashboard;
  //else {
  //
  //}
  var self = this;

  this.autorun ( function () {
    $ ( ".gridster ul" ).gridster ( {
      widget_margins          : [ 10, 10 ],
      widget_base_dimensions  : [ 140, 140 ],
      max_cols                : 6,
      autogenerate_stylesheet : true
    } );
  } )
} );

Template.HomePrivate.events({});

Template.HomePrivate.helpers({});
