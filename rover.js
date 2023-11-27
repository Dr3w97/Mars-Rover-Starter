class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message){
      let response = {
         message : message.name,
         results: []
      }
      for (let i = 0; i < message.commands.length; i++){
       
         if (message.commands[i].commandType == 'STATUS_CHECK'){
            response.results.push({
               'completed': true,
               'roverStatus':{'position': this.position, 'mode': this.mode, 'generatorWatts': this.generatorWatts}
      })
      }else if (message.commands[i].commandType == 'MODE_CHANGE'){
         this.mode = 'LOW_POWER'
         response.results.push({
            'completed': true,
            // 'roverStatus':{'position': this.position, 'mode': this.mode, 'generatorWatts': this.generatorWatts}
         })
      }else if (this.mode == 'LOW_POWER' && message.commands[i].commandType == 'MOVE'){
         response.results.push({
            'completed': false
         })
      }else if(message.commands[i].commandType == 'MOVE'){
         this.position = message.commands[i].value
         response.results.push({
            'completed': true
         })
      }

       else {response.results.push(message.commands[i])}
   }
      return response;
   }
}

module.exports = Rover;