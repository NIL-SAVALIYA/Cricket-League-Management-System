import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TEAM_PLAYERS = {
  "Thunder Strikers": [
    ["Arjun", "Patel", "BATSMAN", "RIGHT_HAND", null],
    ["Rahul", "Mehta", "BATSMAN", "LEFT_HAND", null],
    ["Vivek", "Shah", "ALL_ROUNDER", "RIGHT_HAND", "RIGHT_ARM_MEDIUM"],
    ["Karan", "Joshi", "BATSMAN", "RIGHT_HAND", null],
    ["Harsh", "Desai", "ALL_ROUNDER", "LEFT_HAND", "LEFT_ARM_SPIN"],
    ["Yash", "Trivedi", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_FAST"],
    ["Dhruv", "Rana", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_MEDIUM"],
    ["Nikhil", "Solanki", "BOWLER", "LEFT_HAND", "LEFT_ARM_FAST"],
    ["Parth", "Modi", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_SPIN"],
    ["Rohan", "Chauhan", "WICKET_KEEPER", "RIGHT_HAND", null],
    ["Jay", "Bhatt", "BATSMAN", "RIGHT_HAND", null]
  ],

  "Phoenix Warriors": [
    ["Aman", "Singh", "BATSMAN", "RIGHT_HAND", null],
    ["Mohit", "Verma", "BATSMAN", "LEFT_HAND", null],
    ["Kishan", "Patel", "ALL_ROUNDER", "RIGHT_HAND", "RIGHT_ARM_MEDIUM"],
    ["Nirav", "Shah", "BATSMAN", "RIGHT_HAND", null],
    ["Sahil", "Joshi", "ALL_ROUNDER", "LEFT_HAND", "LEFT_ARM_SPIN"],
    ["Deep", "Patel", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_FAST"],
    ["Akash", "Prajapati", "BOWLER", "LEFT_HAND", "LEFT_ARM_FAST"],
    ["Meet", "Dave", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_SPIN"],
    ["Dev", "Raval", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_MEDIUM"],
    ["Manan", "Trivedi", "WICKET_KEEPER", "RIGHT_HAND", null],
    ["Prince", "Soni", "BATSMAN", "RIGHT_HAND", null]
  ],

  "Titan Blasters": [
    ["Vir", "Patel", "BATSMAN", "RIGHT_HAND", null],
    ["Aryan", "Shah", "BATSMAN", "LEFT_HAND", null],
    ["Krish", "Mehta", "ALL_ROUNDER", "RIGHT_HAND", "RIGHT_ARM_MEDIUM"],
    ["Om", "Joshi", "BATSMAN", "RIGHT_HAND", null],
    ["Darsh", "Patel", "ALL_ROUNDER", "LEFT_HAND", "LEFT_ARM_SPIN"],
    ["Kevin", "Modi", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_FAST"],
    ["Tushar", "Parmar", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_MEDIUM"],
    ["Rakesh", "Rana", "BOWLER", "LEFT_HAND", "LEFT_ARM_FAST"],
    ["Vatsal", "Pandya", "BOWLER", "RIGHT_HAND", "RIGHT_ARM_SPIN"],
    ["Smit", "Patel", "WICKET_KEEPER", "RIGHT_HAND", null],
    ["Jaydeep", "Desai", "BATSMAN", "RIGHT_HAND", null]
  ]
};

async function main() {
  for (const teamName of Object.keys(TEAM_PLAYERS)) {

    const team = await prisma.team.findFirst({
      where: { name: teamName }
    });

    if (!team) {
      console.log(`❌ Team not found: ${teamName}`);
      continue;
    }

    console.log(`\n🏏 Seeding ${teamName}`);

    let jersey = 1;

    for (const player of TEAM_PLAYERS[teamName]) {

      const exists = await prisma.player.findFirst({
        where: {
          teamId: team.id,
          jerseyNumber: jersey
        }
      });

      if (exists) {
        console.log(`⏩ Jersey ${jersey} already exists`);
        jersey++;
        continue;
      }

      await prisma.player.create({
        data: {
          firstName: player[0],
          lastName: player[1],
          jerseyNumber: jersey,
          playerType: player[2],
          battingStyle: player[3],
          bowlingStyle: player[4],
          isCaptain: jersey === 1,
          isViceCaptain: jersey === 2,
          teamId: team.id
        }
      });

      console.log(`✅ ${player[0]} ${player[1]}`);

      jersey++;
    }
  }

  console.log("\n🎉 All Players Seeded Successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });