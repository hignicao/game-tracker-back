import { PrismaClient } from "@prisma/client";
import { fromUnixTime } from "date-fns";

const prisma = new PrismaClient();

async function main() {
	await prisma.gameStatus.createMany({
		data: [{ name: "Wishlist" }, { name: "Playing" }, { name: "Finished" }, { name: "Dropped" }],
	});

	await prisma.platforms.createMany({
		data: [
			{
				id: 3,
				name: "Linux",
			},
			{
				id: 4,
				name: "Nintendo 64",
			},
			{
				id: 5,
				name: "Wii",
			},
			{
				id: 6,
				name: "PC (Microsoft Windows)",
			},
			{
				id: 7,
				name: "PlayStation",
			},
			{
				id: 8,
				name: "PlayStation 2",
			},
			{
				id: 9,
				name: "PlayStation 3",
			},
			{
				id: 11,
				name: "Xbox",
			},
			{
				id: 12,
				name: "Xbox 360",
			},
			{
				id: 13,
				name: "DOS",
			},
			{
				id: 14,
				name: "Mac",
			},
			{
				id: 15,
				name: "Commodore C64/128/MAX",
			},
			{
				id: 16,
				name: "Amiga",
			},
			{
				id: 18,
				name: "Nintendo Entertainment System",
			},
			{
				id: 19,
				name: "Super Nintendo Entertainment System",
			},
			{
				id: 20,
				name: "Nintendo DS",
			},
			{
				id: 21,
				name: "Nintendo GameCube",
			},
			{
				id: 22,
				name: "Game Boy Color",
			},
			{
				id: 23,
				name: "Dreamcast",
			},
			{
				id: 24,
				name: "Game Boy Advance",
			},
			{
				id: 25,
				name: "Amstrad CPC",
			},
			{
				id: 26,
				name: "ZX Spectrum",
			},
			{
				id: 27,
				name: "MSX",
			},
			{
				id: 29,
				name: "Sega Mega Drive/Genesis",
			},
			{
				id: 30,
				name: "Sega 32X",
			},
			{
				id: 32,
				name: "Sega Saturn",
			},
			{
				id: 33,
				name: "Game Boy",
			},
			{
				id: 34,
				name: "Android",
			},
			{
				id: 35,
				name: "Sega Game Gear",
			},
			{
				id: 37,
				name: "Nintendo 3DS",
			},
			{
				id: 38,
				name: "PlayStation Portable",
			},
			{
				id: 39,
				name: "iOS",
			},
			{
				id: 41,
				name: "Wii U",
			},
			{
				id: 42,
				name: "N-Gage",
			},
			{
				id: 44,
				name: "Tapwave Zodiac",
			},
			{
				id: 46,
				name: "PlayStation Vita",
			},
			{
				id: 47,
				name: "Virtual Console (Nintendo)",
			},
			{
				id: 48,
				name: "PlayStation 4",
			},
			{
				id: 49,
				name: "Xbox One",
			},
			{
				id: 50,
				name: "3DO Interactive Multiplayer",
			},
			{
				id: 51,
				name: "Family Computer Disk System",
			},
			{
				id: 52,
				name: "Arcade",
			},
			{
				id: 53,
				name: "MSX2",
			},
			{
				id: 55,
				name: "Legacy Mobile Device",
			},
			{
				id: 57,
				name: "WonderSwan",
			},
			{
				id: 58,
				name: "Super Famicom",
			},
			{
				id: 59,
				name: "Atari 2600",
			},
			{
				id: 60,
				name: "Atari 7800",
			},
			{
				id: 61,
				name: "Atari Lynx",
			},
			{
				id: 62,
				name: "Atari Jaguar",
			},
			{
				id: 63,
				name: "Atari ST/STE",
			},
			{
				id: 64,
				name: "Sega Master System/Mark III",
			},
			{
				id: 65,
				name: "Atari 8-bit",
			},
			{
				id: 66,
				name: "Atari 5200",
			},
			{
				id: 67,
				name: "Intellivision",
			},
			{
				id: 68,
				name: "ColecoVision",
			},
			{
				id: 69,
				name: "BBC Microcomputer System",
			},
			{
				id: 70,
				name: "Vectrex",
			},
			{
				id: 71,
				name: "Commodore VIC-20",
			},
			{
				id: 72,
				name: "Ouya",
			},
			{
				id: 73,
				name: "BlackBerry OS",
			},
			{
				id: 74,
				name: "Windows Phone",
			},
			{
				id: 75,
				name: "Apple II",
			},
			{
				id: 77,
				name: "Sharp X1",
			},
			{
				id: 78,
				name: "Sega CD",
			},
			{
				id: 79,
				name: "Neo Geo MVS",
			},
			{
				id: 80,
				name: "Neo Geo AES",
			},
			{
				id: 82,
				name: "Web browser",
			},
			{
				id: 84,
				name: "SG-1000",
			},
			{
				id: 85,
				name: "Donner Model 30",
			},
			{
				id: 86,
				name: "TurboGrafx-16/PC Engine",
			},
			{
				id: 87,
				name: "Virtual Boy",
			},
			{
				id: 88,
				name: "Odyssey",
			},
			{
				id: 89,
				name: "Microvision",
			},
			{
				id: 90,
				name: "Commodore PET",
			},
			{
				id: 91,
				name: "Bally Astrocade",
			},
			{
				id: 93,
				name: "Commodore 16",
			},
			{
				id: 94,
				name: "Commodore Plus/4",
			},
			{
				id: 95,
				name: "PDP-1",
			},
			{
				id: 96,
				name: "PDP-10",
			},
			{
				id: 97,
				name: "PDP-8",
			},
			{
				id: 98,
				name: "DEC GT40",
			},
			{
				id: 99,
				name: "Family Computer",
			},
			{
				id: 100,
				name: "Analogue electronics",
			},
			{
				id: 101,
				name: "Ferranti Nimrod Computer",
			},
			{
				id: 102,
				name: "EDSAC",
			},
			{
				id: 103,
				name: "PDP-7",
			},
			{
				id: 104,
				name: "HP 2100",
			},
			{
				id: 105,
				name: "HP 3000",
			},
			{
				id: 106,
				name: "SDS Sigma 7",
			},
			{
				id: 107,
				name: "Call-A-Computer time-shared mainframe computer system",
			},
			{
				id: 108,
				name: "PDP-11",
			},
			{
				id: 109,
				name: "CDC Cyber 70",
			},
			{
				id: 110,
				name: "PLATO",
			},
			{
				id: 111,
				name: "Imlac PDS-1",
			},
			{
				id: 112,
				name: "Microcomputer",
			},
			{
				id: 113,
				name: "OnLive Game System",
			},
			{
				id: 114,
				name: "Amiga CD32",
			},
			{
				id: 115,
				name: "Apple IIGS",
			},
			{
				id: 116,
				name: "Acorn Archimedes",
			},
			{
				id: 117,
				name: "Philips CD-i",
			},
			{
				id: 118,
				name: "FM Towns",
			},
			{
				id: 119,
				name: "Neo Geo Pocket",
			},
			{
				id: 120,
				name: "Neo Geo Pocket Color",
			},
			{
				id: 121,
				name: "Sharp X68000",
			},
			{
				id: 122,
				name: "Nuon",
			},
			{
				id: 123,
				name: "WonderSwan Color",
			},
			{
				id: 124,
				name: "SwanCrystal",
			},
			{
				id: 125,
				name: "PC-8801",
			},
			{
				id: 126,
				name: "TRS-80",
			},
			{
				id: 127,
				name: "Fairchild Channel F",
			},
			{
				id: 128,
				name: "PC Engine SuperGrafx",
			},
			{
				id: 129,
				name: "Texas Instruments TI-99",
			},
			{
				id: 130,
				name: "Nintendo Switch",
			},
			{
				id: 131,
				name: "Nintendo PlayStation",
			},
			{
				id: 132,
				name: "Amazon Fire TV",
			},
			{
				id: 133,
				name: "Odyssey 2 / Videopac G7000",
			},
			{
				id: 134,
				name: "Acorn Electron",
			},
			{
				id: 135,
				name: "Hyper Neo Geo 64",
			},
			{
				id: 136,
				name: "Neo Geo CD",
			},
			{
				id: 137,
				name: "New Nintendo 3DS",
			},
			{
				id: 138,
				name: "VC 4000",
			},
			{
				id: 139,
				name: "1292 Advanced Programmable Video System",
			},
			{
				id: 140,
				name: "AY-3-8500",
			},
			{
				id: 141,
				name: "AY-3-8610",
			},
			{
				id: 142,
				name: "PC-50X Family",
			},
			{
				id: 143,
				name: "AY-3-8760",
			},
			{
				id: 144,
				name: "AY-3-8710",
			},
			{
				id: 145,
				name: "AY-3-8603",
			},
			{
				id: 146,
				name: "AY-3-8605",
			},
			{
				id: 147,
				name: "AY-3-8606",
			},
			{
				id: 148,
				name: "AY-3-8607",
			},
			{
				id: 149,
				name: "PC-98",
			},
			{
				id: 150,
				name: "Turbografx-16/PC Engine CD",
			},
			{
				id: 151,
				name: "TRS-80 Color Computer",
			},
			{
				id: 152,
				name: "FM-7",
			},
			{
				id: 153,
				name: "Dragon 32/64",
			},
			{
				id: 154,
				name: "Amstrad PCW",
			},
			{
				id: 155,
				name: "Tatung Einstein",
			},
			{
				id: 156,
				name: "Thomson MO5",
			},
			{
				id: 157,
				name: "NEC PC-6000 Series",
			},
			{
				id: 158,
				name: "Commodore CDTV",
			},
			{
				id: 159,
				name: "Nintendo DSi",
			},
			{
				id: 161,
				name: "Windows Mixed Reality",
			},
			{
				id: 162,
				name: "Oculus VR",
			},
			{
				id: 163,
				name: "SteamVR",
			},
			{
				id: 164,
				name: "Daydream",
			},
			{
				id: 165,
				name: "PlayStation VR",
			},
			{
				id: 166,
				name: "Pokémon mini",
			},
			{
				id: 167,
				name: "PlayStation 5",
			},
			{
				id: 169,
				name: "Xbox Series X|S",
			},
			{
				id: 170,
				name: "Google Stadia",
			},
			{
				id: 203,
				name: "DUPLICATE Stadia",
			},
			{
				id: 236,
				name: "Exidy Sorcerer",
			},
			{
				id: 237,
				name: "Sol-20",
			},
			{
				id: 238,
				name: "DVD Player",
			},
			{
				id: 239,
				name: "Blu-ray Player",
			},
			{
				id: 240,
				name: "Zeebo",
			},
			{
				id: 274,
				name: "PC-FX",
			},
			{
				id: 306,
				name: "Satellaview",
			},
			{
				id: 307,
				name: "Game & Watch",
			},
			{
				id: 308,
				name: "Playdia",
			},
			{
				id: 309,
				name: "Evercade",
			},
			{
				id: 339,
				name: "Sega Pico",
			},
			{
				id: 372,
				name: "OOParts",
			},
			{
				id: 373,
				name: "Sinclair ZX81",
			},
			{
				id: 374,
				name: "Sharp MZ-2200",
			},
			{
				id: 375,
				name: "Epoch Cassette Vision",
			},
			{
				id: 376,
				name: "Epoch Super Cassette Vision",
			},
			{
				id: 377,
				name: "Plug & Play",
			},
			{
				id: 378,
				name: "Gamate",
			},
			{
				id: 379,
				name: "Game.com",
			},
			{
				id: 380,
				name: "Casio Loopy",
			},
			{
				id: 381,
				name: "Playdate",
			},
			{
				id: 382,
				name: "Intellivision Amico",
			},
			{
				id: 384,
				name: "Oculus Quest",
			},
			{
				id: 385,
				name: "Oculus Rift",
			},
			{
				id: 386,
				name: "Meta Quest 2",
			},
			{
				id: 387,
				name: "Oculus Go",
			},
			{
				id: 388,
				name: "Gear VR",
			},
			{
				id: 389,
				name: "AirConsole",
			},
			{
				id: 390,
				name: "PlayStation VR2",
			},
			{
				id: 405,
				name: "Windows Mobile",
			},
			{
				id: 406,
				name: "Sinclair QL",
			},
			{
				id: 407,
				name: "HyperScan",
			},
			{
				id: 408,
				name: "Mega Duck/Cougar Boy",
			},
			{
				id: 409,
				name: "Legacy Computer",
			},
			{
				id: 410,
				name: "Atari Jaguar CD",
			},
			{
				id: 411,
				name: "Handheld Electronic LCD",
			},
			{
				id: 412,
				name: "Leapster",
			},
			{
				id: 413,
				name: "Leapster Explorer/LeadPad Explorer",
			},
			{
				id: 414,
				name: "LeapTV",
			},
			{
				id: 415,
				name: "Watara/QuickShot Supervision",
			},
			{
				id: 416,
				name: "Nintendo 64DD",
			},
			{
				id: 417,
				name: "Palm OS",
			},
			{
				id: 438,
				name: "Arduboy",
			},
			{
				id: 439,
				name: "V.Smile",
			},
			{
				id: 440,
				name: "Visual Memory Unit / Visual Memory System",
			},
			{
				id: 441,
				name: "PocketStation",
			},
		],
	});

	await prisma.genres.createMany({
		data: [
			{
				id: 4,
				name: "Fighting",
			},
			{
				id: 5,
				name: "Shooter",
			},
			{
				id: 7,
				name: "Music",
			},
			{
				id: 8,
				name: "Platform",
			},
			{
				id: 9,
				name: "Puzzle",
			},
			{
				id: 10,
				name: "Racing",
			},
			{
				id: 11,
				name: "Real Time Strategy (RTS)",
			},
			{
				id: 12,
				name: "Role-playing (RPG)",
			},
			{
				id: 13,
				name: "Simulator",
			},
			{
				id: 14,
				name: "Sport",
			},
			{
				id: 15,
				name: "Strategy",
			},
			{
				id: 16,
				name: "Turn-based strategy (TBS)",
			},
			{
				id: 24,
				name: "Tactical",
			},
			{
				id: 26,
				name: "Quiz/Trivia",
			},
			{
				id: 25,
				name: "Hack and slash/Beat 'em up",
			},
			{
				id: 30,
				name: "Pinball",
			},
			{
				id: 31,
				name: "Adventure",
			},
			{
				id: 33,
				name: "Arcade",
			},
			{
				id: 34,
				name: "Visual Novel",
			},
			{
				id: 32,
				name: "Indie",
			},
			{
				id: 35,
				name: "Card & Board Game",
			},
			{
				id: 36,
				name: "MOBA",
			},
			{
				id: 2,
				name: "Point-and-click",
			},
		],
	});

	await prisma.games.createMany({
		data: [
			{
				id: 1020,
				rating: 88,
				cover: "co2lbd",
				releaseDate: fromUnixTime(1379376000),
				name: "Grand Theft Auto V",
				summary:
					"Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.",
			},
			{
				id: 1942,
				rating: 91,
				cover: "co1wyy",
				releaseDate: fromUnixTime(1431993600),
				name: "The Witcher 3: Wild Hunt",
				summary:
					"RPG and sequel to The Witcher 2 (2011), The Witcher 3 follows witcher Geralt of Rivia as he seeks out his former lover and his young subject while intermingling with the political workings of the wartorn Northern Kingdoms. Geralt has to fight monsters and deal with people of all sorts in order to solve complex problems and settle contentious disputes, each ranging from the personal to the world-changing.",
			},
			{
				id: 472,
				rating: 96,
				cover: "co1tnw",
				releaseDate: fromUnixTime(1320883200),
				name: "The Elder Scrolls V: Skyrim",
				summary:
					"Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose. Play any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls is realized like never before.",
			},
			{
				id: 1877,
				rating: 75,
				cover: "co4hk8",
				releaseDate: fromUnixTime(1607472000),
				name: "Cyberpunk 2077",
				summary:
					"Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
			},
			{
				id: 7346,
				rating: 97,
				cover: "co3p2d",
				releaseDate: fromUnixTime(1488499200),
				name: "The Legend of Zelda: Breath of the Wild",
				summary:
					"The Legend of Zelda: Breath of the Wild is the first 3D open-world game in the Zelda series. Link can travel anywhere and be equipped with weapons and armor found throughout the world to grant him various bonuses. Unlike many games in the series, Breath of the Wild does not impose a specific order in which quests or dungeons must be completed. While the game still has environmental obstacles such as weather effects, inhospitable lands, or powerful enemies, many of them can be overcome using the right method. A lot of critics ranked Breath of the Wild as one of the best video games of all time.",
			},
		],
	});

	await prisma.screenshots.createMany({
		data: [
			{
				gameId: 1020,
				screenshot: "o7q3ikzmkjxbftrd64ok",
			},
			{
				gameId: 1020,
				screenshot: "vfdeo6kgu0o4cyzd0sng",
			},
			{
				gameId: 1020,
				screenshot: "eepecmqsq6uqxiaukar1",
			},
			{
				gameId: 1020,
				screenshot: "hjnzngnrtwr82jzmmkef",
			},
			{
				gameId: 1020,
				screenshot: "glvmulyejlde31q8b70z",
			},
			{
				gameId: 1020,
				screenshot: "n3t2agwuxlqggp3kryf9",
			},
			{
				gameId: 1942,
				screenshot: "mnljdjtrh44x4snmierh",
			},
			{
				gameId: 1942,
				screenshot: "em1y2ugcwy2myuhvb9db",
			},
			{
				gameId: 1942,
				screenshot: "usxccsncekxg0wd1v6ee",
			},
			{
				gameId: 1942,
				screenshot: "z5t0yuhyiiui1ickwhgj",
			},
			{
				gameId: 1942,
				screenshot: "farvemmmxav0bgt6wx7t",
			},
			{
				gameId: 1942,
				screenshot: "sciabd",
			},
			{
				gameId: 1942,
				screenshot: "sciabe",
			},
			{
				gameId: 1942,
				screenshot: "sciabf",
			},
			{
				gameId: 1942,
				screenshot: "sciabg",
			},
			{
				gameId: 1942,
				screenshot: "sciabh",
			},
			{
				gameId: 472,
				screenshot: "muv70yw3rds1cw8ymr5v",
			},
			{
				gameId: 472,
				screenshot: "xzk2h41fiye7uwbhc6ub",
			},
			{
				gameId: 472,
				screenshot: "urqw7ltwmhr39gkidsih",
			},
			{
				gameId: 472,
				screenshot: "t0mus35qrgclafo1ql8k",
			},
			{
				gameId: 472,
				screenshot: "x5bbaqvgbpaz4hzlfeqb",
			},
			{
				gameId: 1877,
				screenshot: "quphnww1axg2mmsvxfux",
			},
			{
				gameId: 1877,
				screenshot: "jmi4y3q12o4uitdcaf7i",
			},
			{
				gameId: 1877,
				screenshot: "c6ruovzsugjlnlcmm8b0",
			},
			{
				gameId: 1877,
				screenshot: "ydyq0pixly7vt29fnzci",
			},
			{
				gameId: 1877,
				screenshot: "lelfskpwy4slftl3qdeb",
			},
			{
				gameId: 1877,
				screenshot: "c7usjg7gpo8rs0bfjkph",
			},
			{
				gameId: 1877,
				screenshot: "ybliaszwqkwui7djaou4",
			},
			{
				gameId: 1877,
				screenshot: "ts8wtae3t6aghttvtt2s",
			},
			{
				gameId: 1877,
				screenshot: "vnv5cd9kvonsjvazpotx",
			},
			{
				gameId: 1877,
				screenshot: "w4plqrhe04byymfksmux",
			},
			{
				gameId: 1877,
				screenshot: "ubbe5gewccx5ig3xy30t",
			},
			{
				gameId: 7346,
				screenshot: "sckj69",
			},
			{
				gameId: 7346,
				screenshot: "sckj6a",
			},
			{
				gameId: 7346,
				screenshot: "sckj6b",
			},
			{
				gameId: 7346,
				screenshot: "sckj6c",
			},
			{
				gameId: 7346,
				screenshot: "sckj6d",
			},
			{
				gameId: 7346,
				screenshot: "sckj6e",
			},
			{
				gameId: 7346,
				screenshot: "sckj6f",
			},
			{
				gameId: 7346,
				screenshot: "sckj6g",
			},
			{
				gameId: 7346,
				screenshot: "sckj6h",
			},
		],
	});

	await prisma.gameGenre.createMany({
		data: [
			{
				gameId: 1020,
				genreId: 5,
			},
			{
				gameId: 1020,
				genreId: 31,
			},
			{
				gameId: 1942,
				genreId: 12,
			},
			{
				gameId: 1942,
				genreId: 31,
			},
			{
				gameId: 472,
				genreId: 12,
			},
			{
				gameId: 472,
				genreId: 31,
			},
			{
				gameId: 1877,
				genreId: 5,
			},
			{
				gameId: 1877,
				genreId: 12,
			},
			{
				gameId: 1877,
				genreId: 31,
			},
			{
				gameId: 7346,
				genreId: 12,
			},
			{
				gameId: 7346,
				genreId: 31,
			},
		],
	});

	await prisma.gamePlatform.createMany({
		data: [
			{
				gameId: 1020,
				platformId: 6,
			},
			{
				gameId: 1020,
				platformId: 9,
			},
			{
				gameId: 1020,
				platformId: 12,
			},
			{
				gameId: 1020,
				platformId: 48,
			},
			{
				gameId: 1020,
				platformId: 49,
			},
			{
				gameId: 1942,
				platformId: 6,
			},
			{
				gameId: 1942,
				platformId: 48,
			},
			{
				gameId: 1942,
				platformId: 49,
			},
			{
				gameId: 1942,
				platformId: 130,
			},
			{
				gameId: 1942,
				platformId: 167,
			},
			{
				gameId: 1942,
				platformId: 169,
			},
			{
				gameId: 472,
				platformId: 6,
			},
			{
				gameId: 472,
				platformId: 9,
			},
			{
				gameId: 472,
				platformId: 12,
			},
			{
				gameId: 1877,
				platformId: 6,
			},
			{
				gameId: 1877,
				platformId: 48,
			},
			{
				gameId: 1877,
				platformId: 49,
			},
			{
				gameId: 1877,
				platformId: 167,
			},
			{
				gameId: 1877,
				platformId: 169,
			},
			{
				gameId: 1877,
				platformId: 170,
			},
			{
				gameId: 7346,
				platformId: 41,
			},
			{
				gameId: 7346,
				platformId: 130,
			},
		],
	});
}

main()
	.then(() => {
		console.log("Seeding completed");
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
