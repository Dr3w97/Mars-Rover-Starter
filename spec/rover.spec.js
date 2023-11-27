const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  it('Constructor sets position and default values for mode and watts', function(){
    let rover = new Rover(1234);
    // console.log(rover)
    expect(rover.position).toEqual(1234);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  })
  it('receiveMessage returns name of message in response', function(){
    let rover = new Rover(1234);
    let message = new Message('ROVER', ['hello', 'can you see me']);
    // console.log(rover.receiveMessage(message));
    expect(rover.receiveMessage(message).message).toEqual('ROVER');  
  });

  it('response contains 2 results if 2 commands are entered', function(){
      let rover = new Rover(1234);
      let command = [new Command('MODE_CHANGE'), new Command('say hello')]
      let message = new Message('ROVER', command)
      // console.log(rover.receiveMessage(message))
      expect(rover.receiveMessage(message).results.length).toEqual(2)
  })

  it('STATUS_CHECK command returns the current state of the rover object', function(){
    let rover = new Rover(1234);
    let command = new Command('STATUS_CHECK');
    let message = new Message('ROVER', [command]);
    let expectedResult = {
      completed: true,
      'roverStatus': { position: 1234, mode: 'NORMAL', 'generatorWatts': 110 }
    }
    // console.log(rover.receiveMessage(message).results)
    expect(rover.receiveMessage(message).results[0]).toEqual(expectedResult)
  });

  it('rover responds correctly to the MODE_CHANGE command', function(){
    let rover = new Rover(1234);
    let command = new Command('MODE_CHANGE', 'LOW_POWER' );
    let message = new Message('ROVER', [command]);
    let result = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER')
    expect(result.results[0]).toEqual({
      completed: true
    })
  });

  it('rover is unable to move in LOW_POWER mode', function(){
    let rover = new Rover(1234);
    let command = [new Command ('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 3455)];
    let message = new Message('ROVER', command);
    let result = rover.receiveMessage(message);
    // console.log(rover.receiveMessage(message).results)
    expect(result.results[1]).toEqual({
      completed: false
    })
  });

  it('MOVE command updates the position of rover', function(){
    let rover = new Rover(1234);
    let command = new Command('MOVE', 5678);
    let message = new Message('ROVER', [command]);
    let result = rover.receiveMessage(message);
    console.log(rover)
    expect(rover.position).toEqual(5678)
  })
})