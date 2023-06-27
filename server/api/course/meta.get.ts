import courseData from "~/server/courseData.js";
import { Chapter, Course, CourseMeta, OutlineChapter, OutlineLesson } from '~/types/course'
courseData as Course;

export default defineEventHandler((event): CourseMeta => {
    const outline: OutlineChapter[] = courseData.chapters.reduce((prev: OutlineChapter[], next: Chapter) => {
        const lessons: OutlineLesson[] = next.lessons.map(lesson => ({
            title: lesson.title,
            slug: lesson.slug,
            number: lesson.number,
            path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`
        }))

        const chapter: OutlineChapter = {
            title: next.title,
            slug: next.slug,
            number: next.number,
            lessons
        }

        return [...prev, chapter]
    }, [])

    return {
        title: courseData.title,
        chapters: outline
    }
})