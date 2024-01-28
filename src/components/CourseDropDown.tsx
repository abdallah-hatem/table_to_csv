import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import DropDownComp from "./DropDownComp"
import { Spin } from "antd"

export default function CourseDropDown({ setSelCourse, selCourse }: any) {
  const fetchCourseData = async () => {
    const response = await fetch("https://jsonblob.com/api/1196583438827511808")
    const data = await response.json()
    return data
  }

  const { data, isLoading, refetch } = useQuery("courses", fetchCourseData, {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const coursesData: any[] = (data && data.all_courses) ?? null
  const selectedCourse: any = (coursesData && coursesData[0]) ?? null

  useEffect(() => {
    console.log(selCourse, "selCourse")
  }, [selCourse])

  useEffect(() => {
    console.log(coursesData, "coursesData")
  }, [coursesData])

  function preparData() {
    return coursesData
      ? coursesData.map((el) => {
          return { key: el.course_id, label: el.course_label }
        })
      : []
  }

  function getCurrentTitle() {
    return (
      coursesData &&
      selCourse &&
      coursesData.filter((el) => el.course_id === selCourse.key)[0]
        ?.course_label
    )
  }

  if (isLoading)
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Spin size="large" />
      </div>
    )

  return (
    <DropDownComp
      title={
        getCurrentTitle() ?? (coursesData && coursesData[0]?.course_label) ?? ""
      }
      items={preparData()}
      setSelCourse={setSelCourse}
      selCourse={selCourse}
    />
  )
}
