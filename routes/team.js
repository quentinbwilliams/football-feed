const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const Team = require("../models/team");
const router = express.Router();

// TEAM ROUTES:
/*
 * GET POSITION FOR TEAM LEAGUES
 * GET ALL MATCHES
 * GET LIVE MATCHES
 * GET UPCOMING MATCHES
 * GET GOALSCORERS
 * GET ASSISTS
 * GET RED CARDS
 * GET YELLOW CARDS
*/