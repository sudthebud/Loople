# Loople
Web based recreation of *Loople*, a game created for the **GMTK Game Jam 2025** that achieved a ranking of **#275 in creativity out of nearly 10,000 participants** (view the original [here](https://github.com/sudthebud/Loople-GMTK_Game_Jam_2025)).

Mainly used this project as an opportunity to learn web development and JavaScript.

## Features
- Word loop consisting of 5 words (3-7 characters each) where the **end of each word is the beginning of another**
- Interact with the word loop using **keyboard controls or the mouse**
- Submit for **colored hints** based on guesses
- Word loop history to **track and view previous submissions**
- Playful **visuals and animations**
- **Dialog boxes** to give info about Loople and its mechanics

## Technical Highlights
- **Backtracking algorithm** to retrieve words that form word loop
- **Submission algorithm** with order of submission check
    - Check if spaces are black
    - Check if loop is exactly the same as the previous submission
    - Check if any word does not exist in word bank
    - Check if any letters are correct
    - Check if any letters exist in the same word
    - Check if any letters exist in any other word
    - Mark the rest as nonexisting
- **Saved word loop history** for easy access to previous submissions, and position/rotation that match current loop's
- **Event listener library** to store, track, enable, and disable control events
- Stylized CSS visuals and animations using **class and selector hierarchy**, many done with _only_ CSS
- Python scripts to **generate, filter through, and track** word bank of nearly 10k words

## How to Play
Just click the link to the GitHub Pages website in the _"About"_ section of this repository!

Alternatively, clone the repository and host the website on your local machine.

## Credits and Resources
- Inspired by *Wordle* by Josh Wardle
- Datasets
    - Electronic Frontier Foundation
        - English Long Word List
        - English General Short Word List
        - English Short Word List
    - Florida State University
        - Basic English 2000 (word list)
    - @orgtre on GitHub & Google, Inc.
        - google-books-ngram-frequency (Google Books N-grams word list)
- Assets
    - The GitHub logo is the property of GitHub, Inc.