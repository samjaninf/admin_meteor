var pageSession = new ReactiveDict ();

pageSession.set ( "errorMessage", "" );

Template.Login.rendered = function () {

  $ ( "input[autofocus]" ).focus ();
};

Template.Login.created = function () {
  pageSession.set ( "errorMessage", "" );
};

Template.Login.events ( {
  "submit #login_form" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var submit_button = $ ( t.find ( ":submit" ) );

    var login_email    = t.find ( '#login_email' ).value.trim ();
    var login_password = t.find ( '#login_password' ).value;

    // check email
    if ( !isValidEmail ( login_email ) ) {
      pageSession.set ( "errorMessage", "Please enter your e-mail address." );
      t.find ( '#login_email' ).focus ();
      return false;
    }

    // check password
    if ( login_password == "" ) {
      pageSession.set ( "errorMessage", "Please enter your password." );
      t.find ( '#login_email' ).focus ();
      return false;
    }

    var url = "login";
    HTTP.call ( 'POST', Meteor.settings.public.erpnext_url + url, {
        params : {
          usr : login_email,
          pwd : login_password
        },
        data   : {}
      },
      function ( err, res ) {
        if ( err ) {
          pageSession.set ( "errorMessage", "Login Invalid. Please speak with your system Administrator to retrieve your correct login information." );
          console.log ( "Error: " + err );
          return false;
        }
        else {
          console.log ( "Success: " + JSON.stringify ( res ) );
          //console.log ( JSON.stringify ( res.data.full_name ) );
          submit_button.button ( "loading" );
          Meteor.call ( 'checkUser', login_email, function ( err, res ) {
              if ( err ) {
                Meteor.loginWithPassword ( login_email, login_password, function ( err ) {
                  submit_button.button ( "reset" );
                  if ( err ) {
                    pageSession.set ( "errorMessage", err.message );
                    console.log ( err );
                    return false;
                  }
                } );
              }
              else {
                Accounts.createUser ( {
                  email    : login_email,
                  password : login_password,
                  profile  : { name : (res.data ? res.data.full_name : "" ) }
                }, function ( err ) {
                  submit_button.button ( "reset" );
                  if ( err ) {
                    console.log ( err );
                    if ( err.error === 499 ) {
                      pageSession.set ( "verificationEmailSent", true );
                    }
                    else {
                      pageSession.set ( "errorMessage", err.message );
                      return false;
                    }
                  }
                  else {
                    pageSession.set ( "errorMessage", "" );
                    pageSession.set ( "verificationEmailSent", true );
                  }
                } );
              }
            }
          )
        }
      }
    );

    return false;
  },

  "click #login-with-google" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var button = $ ( e.currentTarget );
    button.button ( "loading" );

    Meteor.loginWithGoogle (
      {
        requestPermissions : [ "email" ]
      },
      function ( err ) {
        button.button ( "reset" );
        if ( err ) {
          pageSession.set ( "errorMessage", err.message );
          return false;
        }
      }
    );

    return false;
  },

  "click #login-with-github" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var button = $ ( e.currentTarget );
    button.button ( "loading" );

    Meteor.loginWithGithub (
      {
        requestPermissions : [ "public_repo", "user:email" ]
      },
      function ( err ) {
        button.button ( "reset" );
        if ( err ) {
          pageSession.set ( "errorMessage", err.message );
          return false;
        }
      }
    );

    return false;
  },

  "click #login-with-linkedin" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var button = $ ( e.currentTarget );
    button.button ( "loading" );

    Meteor.loginWithLinkedin (
      {
        requestPermissions : [ "r_emailaddress" ]
      },
      function ( err ) {
        button.button ( "reset" );
        if ( err ) {
          pageSession.set ( "errorMessage", err.message );
          return false;
        }
      }
    );

    return false;
  },

  "click #login-with-facebook" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var button = $ ( e.currentTarget );
    button.button ( "loading" );

    Meteor.loginWithFacebook (
      {
        requestPermissions : [ "email" ]
      },
      function ( err ) {
        button.button ( "reset" );
        if ( err ) {
          pageSession.set ( "errorMessage", err.message );
          return false;
        }
      }
    );

    return false;
  },

  "click #login-with-twitter" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var button = $ ( e.currentTarget );
    button.button ( "loading" );

    Meteor.loginWithTwitter (
      {
        requestPermissions : [ "email" ]
      },
      function ( err ) {
        button.button ( "reset" );
        if ( err ) {
          pageSession.set ( "errorMessage", err.message );
          return false;
        }
      }
    );

    return false;
  },

  "click #login-with-meteor" : function ( e, t ) {
    e.preventDefault ();
    pageSession.set ( "errorMessage", "" );

    var button = $ ( e.currentTarget );
    button.button ( "loading" );

    Meteor.loginWithMeteorDeveloperAccount (
      {
        requestPermissions : [ "email" ]
      },
      function ( err ) {
        button.button ( "reset" );
        if ( err ) {
          pageSession.set ( "errorMessage", err.message );
          return false;
        }
      }
    );

    return false;
  }

} );

Template.Login.helpers ( {
  errorMessage : function () {
    return pageSession.get ( "errorMessage" );
  }

} );
