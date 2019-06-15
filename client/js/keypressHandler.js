$('body').on('keydown', (event) => {
    var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
    if (arrowPress) {
      var direction = arrowPress[1];
      postSwimCommand(direction);
      // SwimTeam.move(direction.toLowerCase());
    }
  });

console.log('Client is running in the browser!');


const postSwimCommand = (direction) => {
  console.log('init');
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000',
    data: direction,
    error: () => {console.log('YOU ERRORED')},
    success: (data) => {
      // var actions = data.split(',');
      // for(var i = 0; i < actions.length; i++) {
      //   SwimTeam.move(actions[i]);
      // }
      console.log('data', data);
    }
  });
}
