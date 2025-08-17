# Loople
Web based recreation of *Loople*, a game created for the **GMTK Game Jam 2025** that achieved a ranking of **#275 in creativity out of nearly 10,000 participants** (view the original [here](https://github.com/sudthebud/Loople-GMTK_Game_Jam_2025)).

Mainly used this project as an opportunity to learn web development and JavaScript.

## Known Issues
- Controls
    - Spamming the shortcuts for word history can cause the turn number to appear even if the turn history itself is gone
    - Spamming the mouse to click a letter as the loop is being submitted can cause it to get stuck *(unsure if fixed)*
    - Spamming the arrow keys to move between letters as the loop is being submitted can cause the submission process to mess up *(unsure if fixed)*
- Visuals
    - Loop is too large for vertical screen sizes
    - Dialog boxes expand or shrink when screen size zooms in or out, respectively
- Animation
    - If an invalid word is submitted, the currently selected letter will sometimes stop hovering
    - Turn number pill for word history selector has janky animations when opening the menu
- Miscellaneous
    - CSS does not yet support Mozilla and Webkit based browsers
    - The URL does not work unless the case matches (this is intended behavior by webservers, but would like to find a way to fix this)

## Credits
- Inspired by *Wordle* by Josh Wardle
- Datasets
    - Electronic Frontier Foundation
        - English Long Word List
        - English General Short Word List
        - English Short Word List
    - Florida State University
        - Basic English 2000 (word list)
- Assets
    - The GitHub logo is the property of GitHub, Inc.