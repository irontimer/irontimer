// import type { Redis } from "ioredis";
import { Queue /*, QueueScheduler*/ } from "bullmq";

// const QUEUE_NAME = "bot-tasks";

type BotTaskArgument = string | number;

interface BotTask {
  name: string;
  args: BotTaskArgument[];
}

function buildBotTask(task: string, taskArgs: BotTaskArgument[]): BotTask {
  return {
    name: task,
    args: taskArgs
  };
}

let jobQueue: Queue;
// let _queueScheduler: QueueScheduler;

// export function initJobQueue(redisConnection: Redis | undefined): void {
//   if (jobQueue || !redisConnection) {
//     return;
//   }

//   jobQueue = new Queue(QUEUE_NAME, {
//     connection: redisConnection,
//     defaultJobOptions: {
//       removeOnComplete: true,
//       removeOnFail: true,
//       attempts: 3,
//       backoff: {
//         type: "exponential",
//         delay: 2000
//       }
//     }
//   });

//   // _queueScheduler = new QueueScheduler(QUEUE_NAME, {
//   //   connection: redisConnection
//   // });
// }

async function addToQueue(taskName: string, task: BotTask): Promise<void> {
  if (!jobQueue) {
    return;
  }

  await jobQueue.add(taskName, task);
}

// async function addToQueueBulk(
//   tasks: { name: string; data: BotTask }[]
// ): Promise<void> {
//   if (!jobQueue) {
//     return;
//   }

//   await jobQueue.addBulk(tasks);
// }

export async function updateDiscordRole(
  discordUserID: string,
  time: number
): Promise<void> {
  const task = "updateRole";
  const updateDiscordRoleTask = buildBotTask(task, [discordUserID, time]);
  await addToQueue(task, updateDiscordRoleTask);
}

export async function linkDiscord(
  discordUserID: string,
  userID: string
): Promise<void> {
  const task = "linkDiscord";
  const linkDiscordTask = buildBotTask(task, [discordUserID, userID]);
  await addToQueue(task, linkDiscordTask);
}

export async function unlinkDiscord(
  discordUserID: string,
  userID: string
): Promise<void> {
  const task = "unlinkDiscord";
  const unlinkDiscordTask = buildBotTask(task, [discordUserID, userID]);
  await addToQueue(task, unlinkDiscordTask);
}

export async function awardChallenge(
  discordUserID: string,
  challengeName: string
): Promise<void> {
  const task = "awardChallenge";
  const awardChallengeTask = buildBotTask(task, [discordUserID, challengeName]);
  await addToQueue(task, awardChallengeTask);
}
