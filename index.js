#!/usr/bin/env node

const axios = require("axios");
const yargs = require("yargs");
const chalk = require("chalk");
require("dotenv").config();

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = process.env.TMDB_API_KEY;

const fetchMovies = async (type) => {
  const endpoints = {
    playing: "now_playing",
    popular: "popular",
    top: "top_rated",
    upcoming: "upcoming",
  };

  try {
    const response = await axios.get(
      `${API_URL}/${endpoints[type]}?api_key=${API_KEY}`
    );
    const movies = response.data.results;

    console.log(chalk.green.bold(`\n${type.toUpperCase()} MOVIES:`));
    movies.forEach((movie, index) => {
      console.log(chalk.blue(`${index + 1}. ${movie.title}`));
    });
  } catch (error) {
    console.error(chalk.red("Error fetching data!"), error.message);
  }
};

const argv = yargs
  .usage("Usage: tmdb-app --type <type>")
  .option("type", {
    alias: "t",
    describe: "Type of movies (playing, popular, top, upcoming)",
    type: "string",
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv;

fetchMovies(argv.type);
