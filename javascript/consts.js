//File path consts
const assetPath = "assets";
const datasetPath = "datasets";

//Game consts
const minNumWords = 3
const maxNumWords = 5

//Helper functions
function RandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min)
}