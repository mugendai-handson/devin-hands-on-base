import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { _count: { select: { tickets: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Workspace</p>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {project._count.tickets} tickets
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
