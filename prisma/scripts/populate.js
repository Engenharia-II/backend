import { PrismaClient } from '@prisma/client';
import subjectsData from './mocks/subjects.json' assert { type: 'json' };
import topicsData from './mocks/topics.json' assert { type: 'json' };
import contentsData from './mocks/contents.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function createSubjects() {
  await prisma.subject.createMany({
    data: subjectsData,
    skipDuplicates: true
  });
  // eslint-disable-next-line no-console
  console.log('✅ Disciplinas criadas/atualizadas com sucesso!');
}

async function createTopics() {
  for (const subjectWithTopics of topicsData) {
    const { subjectName, topics } = subjectWithTopics;

    const subject = await prisma.subject.findFirst({
      where: { name: subjectName }
    });

    if (!subject) {
      // eslint-disable-next-line no-console
      console.warn(`⚠️  Disciplina não encontrada: ${subjectName}`);
      continue;
    }

    for (const topic of topics) {
      await prisma.topic.upsert({
        where: {
          name_subjectId: {
            name: topic.name,
            subjectId: subject.id
          }
        },
        update: {},
        create: {
          ...topic,
          subjectId: subject.id
        }
      });
    }

    // eslint-disable-next-line no-console
    console.log(`✅ Tópicos criados para a disciplina: ${subjectName}`);
  }
}

async function createContents() {
  for (const topicsWithContents of contentsData) {
    const { topicName, contents } = topicsWithContents;

    const topic = await prisma.topic.findFirst({
      where: { name: topicName }
    });

    if (!topic) {
      // eslint-disable-next-line no-console
      console.warn(`⚠️  Tópico não encontrado: ${topicName}`);
      continue;
    }

    for (const content of contents) {
      await prisma.content.upsert({
        where: {
          name_topicId: {
            name: content.name,
            topicId: topic.id
          }
        },
        update: {},
        create: {
          ...content,
          topicId: topic.id
        }
      });
    }

    // eslint-disable-next-line no-console
    console.log(`✅ Conteúdos criados para o tópico: ${topicName}`);
  }
}

async function main() {
  await createSubjects();
  await createTopics();
  await createContents();
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('❌ Erro ao popular dados:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
