/*
 * This is the `guildMemberRemove` event.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const { Events } = require("discord.js");
const config = require("../../config.json");
const print = require("../helpers/print");

// Export the command data for loader
module.exports = {
  /*
   * Event        : guildMemberRemove
   * Usage        : On
   *
   * What it does : Listen for any legacy commands
   *                (with prefix defined in config)
   *                and execute command.
   */

  // Define data for loader
  name: Events.GuildMemberRemove,
  once: false,

  // Execute the event asynchronously
  async execute(member) {
    const formatDuration = (ms) => {
      // If milliseconds are negative, convert them to positive
      if (ms < 0) ms = -ms;
      // Define an object 'time' to store the duration components
      const time = {
        day: Math.floor(ms / 86400000), // Calculate number of days
        hour: Math.floor(ms / 3600000) % 24, // Calculate number of hours (mod 24 to get the remaining hours)
        minute: Math.floor(ms / 60000) % 60, // Calculate number of minutes (mod 60 to get the remaining minutes)
        second: Math.floor(ms / 1000) % 60, // Calculate number of seconds (mod 60 to get the remaining seconds)
        millisecond: Math.floor(ms) % 1000, // Calculate number of milliseconds (mod 1000 to get the remaining milliseconds)
      };
      // Convert the 'time' object to an array of key-value pairs, filter out components with a value of 0, and format each component
      return Object.entries(time)
        .filter((val) => val[1] !== 0) // Filter out components with a value of 0
        .map((val) => val[1] + " " + (val[1] !== 1 ? val[0] + "s" : val[0])) // Format each component
        .join(", "); // Join the formatted components with a comma and space
    };

    const channel = await member.client.channels.cache.get(
      "1074677495686770790"
    );
    channel.send(
      `**${
        member.displayName
      }** just left this server. They were here for **${formatDuration(
        Date.now() - member.joinedTimestamp
      )}**.`
    );
  },
};
