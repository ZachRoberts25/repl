// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
var repl;
var TOKEN;
var lang = "ruby";
var myCodeMirror;
var startToken = function(lang){
  $.ajax({
    url: '/gen_token',
    success: function(data){
      TOKEN = {time_created: data.time_created, msg_mac: data.msg_mac};
      connectRepl(TOKEN, lang);
    }
  });
}

var connectRepl = function(token, lang){
  repl = new ReplitClient('api.repl.it', '80', lang, TOKEN);
  repl.connect().then(
    function() {
      document.querySelector('.status').innerHTML = 'connected';
      start(repl);
    },
    function() {
      document.querySelector('.status').innerHTML = 'failed';
    }
  );


}


function start(repl) {

  $( "#runcode" ).on('click', function() {
    $(".out").empty();
    // document.querySelector('.out').innerHTML = "";
    // document.querySelector('.out').innerHTML += spiner;

    text = myCodeMirror.getValue();
    repl.evaluateOnce(
      text,
      {
        stdout: function(str) {
          document.querySelector('.out').innerHTML += str;
        }
      }
    ).then(
      function(result) {
        // document.querySelector('.result').innerHTML += (result.error || result.data) + '\n';

      },
      function(err) {
        // console.error(err);
      }
    );
  });
}

$(document).on('ready', function(e){
  startToken("ruby");
  myCodeMirror = CodeMirror(document.querySelector('.in'), {
    value: rubyProgram,
    mode: "text/x-ruby",
    theme: "rubyblue",
    smartIndent: true,
    lineWrapping: true,
    lineNumbers: true,

  });
});
$("#java").on("click", function(e){
  e.preventDefault();
  startToken("java");
  myCodeMirror.setOption('value', javaProgram);
  myCodeMirror.setOption('mode', "text/x-java");
  console.log(myCodeMirror.getOption("mode"));
  });
$("#ruby").on("click", function(e){
  e.preventDefault();
  startToken("ruby");
  myCodeMirror.setOption('value', rubyProgram);
  myCodeMirror.setOption('mode', "text/x-ruby");

})
