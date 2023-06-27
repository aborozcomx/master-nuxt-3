import courseData from "~/server/courseData.js";
import { Lesson, Chapter, Course, LessonWithPath } from '~/types/course'
courseData as Course;

export default defineEventHandler((event): LessonWithPath => {

  const { chapterSlug, lessonSlug } = event.context.params;

  const chapter: Maybe<Chapter> = courseData.chapters.find(chapter => chapter.slug === chapterSlug)

  if (!chapter) {
    throw createError({
      statusCode: 404,
      message: 'Chapter bot found'
    })
  }

  const lesson: Maybe<Lesson> = chapter.lessons.find(lesson => lesson.slug === lessonSlug)

  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: 'Lesson bot found'
    })
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  }
})
