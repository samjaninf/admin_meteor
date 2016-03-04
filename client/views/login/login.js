var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Login.rendered = function () {

  $("input[autofocus]").focus();
};

Template.Login.created = function () {
  pageSession.set("errorMessage", "");
};

Template.Login.events({
  "submit #login_form": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var submit_button = $(t.find(":submit"));

    var login_email = t.find('#login_email').value.trim();
    var login_password = t.find('#login_password').value;

    // check email
    if (!isValidEmail(login_email)) {
      pageSession.set("errorMessage", "Please enter your e-mail address.");
      t.find('#login_email').focus();
      return false;
    }

    // check password
    if (login_password == "") {
      pageSession.set("errorMessage", "Please enter your password.");
      t.find('#login_email').focus();
      return false;
    }

    //if (Meteor.settings && Meteor.settings.public && _.isObject(Meteor.settings.public)) {
    //  console.log(Meteor.settings.public.erpnext_url);
    //}
    //return false;
    //var url = "login";
    var url = "frappe.auth.get_logged_user";
    //HTTP.post(Meteor.settings.public.erpnext_url + url, {
    HTTP.get(Meteor.settings.public.erpnext_url + url, //{
        //params: {
        //  "usr": login_email,
        //  "pwd":  login_password
        //}
        //},
        function (err, res) {
          if (err)
            console.log(err);
          else
            console.log(res);
        });
    return false;
    submit_button.button("loading");
    //Meteor.loginWithPassword(login_email, login_password, function (err) {
    //  submit_button.button("reset");
    //  if (err) {
    //    pageSession.set("errorMessage", err.message);
    //    return false;
    //  }
    //});

    Accounts.createUser({
      email: login_email,
      password: login_password,
      profile: {name: register_name}
    }, function (err) {
      submit_button.button("reset");
      if (err) {
        if (err.error === 499) {
          pageSession.set("verificationEmailSent", true);
        } else {
          pageSession.set("errorMessage", err.message);
        }
      }
      else {
        pageSession.set("errorMessage", "");
        pageSession.set("verificationEmailSent", true);
      }
    });
    return false;
  },

  "click #login-with-google": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var button = $(e.currentTarget);
    button.button("loading");

    Meteor.loginWithGoogle(
        {
          requestPermissions: ["email"]
        },
        function (err) {
          button.button("reset");
          if (err) {
            pageSession.set("errorMessage", err.message);
            return false;
          }
        }
    );

    return false;
  },

  "click #login-with-github": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var button = $(e.currentTarget);
    button.button("loading");

    Meteor.loginWithGithub(
        {
          requestPermissions: ["public_repo", "user:email"]
        },
        function (err) {
          button.button("reset");
          if (err) {
            pageSession.set("errorMessage", err.message);
            return false;
          }
        }
    );

    return false;
  },

  "click #login-with-linkedin": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var button = $(e.currentTarget);
    button.button("loading");

    Meteor.loginWithLinkedin(
        {
          requestPermissions: ["r_emailaddress"]
        },
        function (err) {
          button.button("reset");
          if (err) {
            pageSession.set("errorMessage", err.message);
            return false;
          }
        }
    );

    return false;
  },

  "click #login-with-facebook": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var button = $(e.currentTarget);
    button.button("loading");

    Meteor.loginWithFacebook(
        {
          requestPermissions: ["email"]
        },
        function (err) {
          button.button("reset");
          if (err) {
            pageSession.set("errorMessage", err.message);
            return false;
          }
        }
    );

    return false;
  },

  "click #login-with-twitter": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var button = $(e.currentTarget);
    button.button("loading");

    Meteor.loginWithTwitter(
        {
          requestPermissions: ["email"]
        },
        function (err) {
          button.button("reset");
          if (err) {
            pageSession.set("errorMessage", err.message);
            return false;
          }
        }
    );

    return false;
  },

  "click #login-with-meteor": function (e, t) {
    e.preventDefault();
    pageSession.set("errorMessage", "");

    var button = $(e.currentTarget);
    button.button("loading");

    Meteor.loginWithMeteorDeveloperAccount(
        {
          requestPermissions: ["email"]
        },
        function (err) {
          button.button("reset");
          if (err) {
            pageSession.set("errorMessage", err.message);
            return false;
          }
        }
    );

    return false;
  }

});

Template.Login.helpers({
  errorMessage: function () {
    return pageSession.get("errorMessage");
  }

});
