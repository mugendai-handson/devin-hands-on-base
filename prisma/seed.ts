import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  TicketPriority,
  TicketStatus,
  TicketType,
} from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const schema = new URL(connectionString).searchParams.get("schema") ?? "public";
const adapter = new PrismaPg({ connectionString }, { schema });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const [alex, priya, marcus, jamie] = await Promise.all(
    ["Alex Chen", "Priya Singh", "Marcus Lee", "Jamie Park"].map((name) =>
      prisma.user.create({ data: { name } }),
    ),
  );

  const [webApp, mobileApp, internalTools] = await Promise.all(
    ["Web App", "Mobile App", "Internal Tools"].map((name) =>
      prisma.project.create({ data: { name } }),
    ),
  );

  await prisma.ticket.createMany({
    data: [
      {
        title: "Login button does not respond",
        description: "The login button is unresponsive after entering valid credentials.",
        type: TicketType.BUG,
        priority: TicketPriority.HIGH,
        status: TicketStatus.OPEN,
        assigneeId: alex.id,
        projectId: webApp.id,
      },
      {
        title: "Add assignee filter",
        description: "Allow users to narrow the ticket list by assignee.",
        type: TicketType.FEATURE,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.IN_PROGRESS,
        assigneeId: priya.id,
        projectId: webApp.id,
      },
      {
        title: "Incorrect completed ticket count",
        description: "The dashboard sometimes shows an outdated Done count.",
        type: TicketType.BUG,
        priority: TicketPriority.HIGH,
        status: TicketStatus.DONE,
        assigneeId: marcus.id,
        projectId: internalTools.id,
      },
      {
        title: "Improve loading state UI",
        description: "Make loading feedback easier to understand.",
        type: TicketType.IMPROVEMENT,
        priority: TicketPriority.LOW,
        status: TicketStatus.OPEN,
        assigneeId: jamie.id,
        projectId: webApp.id,
      },
      {
        title: "Create project settings page",
        description: "Add a basic settings page for project metadata.",
        type: TicketType.FEATURE,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.OPEN,
        assigneeId: priya.id,
        projectId: internalTools.id,
      },
      {
        title: "Fix mobile sidebar collapse",
        description: "The sidebar remains open after navigation on small screens.",
        type: TicketType.BUG,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.IN_PROGRESS,
        assigneeId: alex.id,
        projectId: mobileApp.id,
      },
      {
        title: "Add ticket search by tag",
        description: "Prepare a future search experience for ticket tags.",
        type: TicketType.FEATURE,
        priority: TicketPriority.LOW,
        status: TicketStatus.OPEN,
        assigneeId: marcus.id,
        projectId: mobileApp.id,
      },
      {
        title: "Update error messages",
        description: "Use concise and actionable messages in ticket forms.",
        type: TicketType.IMPROVEMENT,
        priority: TicketPriority.LOW,
        status: TicketStatus.DONE,
        assigneeId: jamie.id,
        projectId: internalTools.id,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
