# Webloom website request bot

The `/website-request` command opens a short intake form. When submitted, the bot posts the brief and the requester’s Discord name into the existing private Webloom channel LexS provided, then confirms delivery to the requester privately. It does not create a channel per request.

## Run it

1. Rotate the bot token that was pasted into chat in the Discord Developer Portal. Put the replacement in `bot/.env`; never commit or share that file.
2. Copy `.env.example` to `.env`. `REQUEST_CHANNEL_ID` is already set to the private channel LexS provided. `DISCORD_CLIENT_ID` is optional; if omitted the bot uses its own ID. `DISCORD_GUILD_ID` is optional; when set, the command registers only in that server and appears sooner.
3. Invite the bot to the server with the `bot` and `applications.commands` OAuth scopes. Grant it View Channel, Send Messages, and Embed Links in the configured request channel. Keep the channel private to the intended Webloom staff.
4. Install and run from this folder with `npm ci` and `npm start`. Run it on a Node.js host that stays online.

The bot only needs the non-privileged Guilds gateway intent. It logs startup state and setup errors, not tokens or the contents of project requests.
