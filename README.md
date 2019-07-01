jump through hoops to get:
cookies for fuel
coins for treasure
various levels
always jumping (like mario bro's)
jump higher than normal
jump through hoops for more challenging rewards

# Cookie Run

Cookie Run is a game designed to be easy to pick up and quick-paced. Gameplay consists of using the spacebar to propel the player through hoops to move forward and collect various delicious cookies. 

## Background and Overview

Although it is simple and repetitive, the game will vary in pace to give players a sense of confidence at the start and gradually increase difficulty. This is based on the psychological concept of "Flow" (introduced by positive psychologist Mihaly Csíkszentmihályi) where the right balance of challenge and skill results in an optimal experience so captivating that an individual loses track of time. 

Cookie Run is inspired by Flappy Bird and Super Mario Bros. Graphics, storyline, and music are designed to be bright, fun, and simple to evoke simultaneous feelings of joy and calmness. 

## Functionality

   - Player can use the spacebar to move to various heights
   - Obstacles with passage hoops will be generated in the path of the player
   - The game ends if the player collides with an obstacle. 
   - Each hoop is tracked as a score
   - The score of each run is recorded and saved. A top scoring players list appears at the end of each game. 
   - The game has multiple levels of difficulty

## MVP Features

   - [ ] Basic visuals and interactive interface
   - [ ] Player can move to various heights through hoops
   - [ ] Obstacles generate in random patterns in the path of the player 
   - [ ] Obstacles cause "Game Over upon collision 
   - [ ] Window styling scoreboard modal
   
#### Bonus Features
   - [ ] Top scores list 
   - [ ] Multiple levels of difficulty

## Architecture and Technologies
  
  The game will consist of a single page with a play button and links to the Github repository and LinkedIn. Instructions to start the game by pressing the spacebar will be posted. 

  Once the game starts, the user tries to move through the first few hoops. If unsuccessful, a modal will allow the player to immediately play again by pressing the "r" key. The scoreboard will also be displayed here. 

  ##### Vanilla Javascript
  ##### HTML5 Canvas
  ##### Webpack

## Implementation Timeline

### Day 1 
  - MongoDB database setup - **all**
  - Setup project skeleton - **all**
  
### Day 2
  - Boards Feature
    - Creating Boards - **John-Michael**
      - Routes, backend fetches, actions, reducer, components, styling
      - Board Validations
    - Navbar - **John-Michael**
      - components
    - Updating Boards - **Jasmine John**
      - Routes, backend testing
    - Deleting Boards - **Jasmine John**    
      - Routes, backend testing
    - Viewing Boards - **Oliver Almalel**
      - Routes, backend fetches, actions, reducer, components
      - 'User' Get route, entities reducer, user [fetch, action, reducer]


### Day 3
  - Testing - **ALL**
  - Boards Feature
    - Modals - **John-Michael Riley**
      - actions, reducers, styling
    - Navbar - **John-Michael Riley**
      - components, styling, integration
    - Updating/Deleting Boards - **Jasmine John**
      - modal setup, actions, reducer 
      - ui reducer
    - Actions/Reducer optimizaiton - **Jasmine John**
    - Viewing Boards - **Oliver Almalel**
      - styling 
    - Heroku Setup - **Oliver Almalel**
  

### Day 4
  - Testing - **ALL**
  - AWS Setup - **John-Michael Riley**
    - Multer library integration
  - Boards Feature - **Jasmine John**
    - Finish Updating/Deleting boards
      - components, styling, integration
  - Pins Feature - **Oliver Almalel**
    - Routes, Pin Validations
### Day 5

### Day 6

### Day 7